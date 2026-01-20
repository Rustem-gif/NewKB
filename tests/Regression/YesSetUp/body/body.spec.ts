import test, {expect} from "@playwright/test";
import KingBilly from "../../../../src/PageManager/KingBilly";
import {LINKS} from "../../../../src/Data/Links/Links";
import {SLIDER_CATEGORIES, SLIDER_CATEGORIES_AU} from "../../../../src/Data/Categories/Categories";
import {CATEGORY_DROPDOWN_PARAMS} from "../../../../src/Data/Constants/CategoryDropdownsLocators";
import SupportMessanger from "../../../../src/Components/SupportButton";

test.describe('Body', async () => {
    let kingBilly: KingBilly

    test.beforeEach(async ({page}) =>{
        kingBilly = new KingBilly(page)

        await test.step('Navigate to the main page', async () => {
            await kingBilly.mainPage.navTo(LINKS.Main)
            await kingBilly.mainPage.clickAcceptCookies()
            await kingBilly.mainPage.closeModal()
        })
        
        // Storage state should already have us logged in, just verify
        await test.step('Verify user is logged in (using storage state)', async () => {
            await kingBilly.mainPage.header.waitForSelector(kingBilly.mainPage.header.getDepositButton)
            await expect(kingBilly.mainPage.header.getDepositButton).toBeVisible()
        })
    })


    test('Check if games are clickable in the "Top winners" section', async () => {
        let numberOfGames: number = 0

        await test.step('Scroll to the top winners section', async () => {
            await kingBilly.mainPage.scrollTo(kingBilly.mainPage.getTopWinnersSection)
        })

        await test.step('Get number of games in the top winners section', async () => {
            numberOfGames = await kingBilly.mainPage.getNumberOfTopWinnerGames()
        })

        for (let index = 0; index <= 3; index++) {
            await test.step(`Navigate back to the main page. Index ${index}`, async () => {
                await kingBilly.mainPage.navTo(LINKS.Main)
                await kingBilly.mainPage.scrollTo(kingBilly.mainPage.getTopWinnersSection)
            })

            await test.step(`Click on each game to open the game page. Index ${index}`, async () => {
                await kingBilly.mainPage.sleep(2000)
                await kingBilly.mainPage.clickOnTopWinnersGame(index)
            })

            await test.step(`Check if a game has been opened ${index}`, async () => {
                await kingBilly.mainPage.sleep(4000)
                await expect.soft(kingBilly.gamePage.getSideBarPanel).toBeVisible()
            })
        }
    })


    test('Check categories in the slider', async () => {
        let actualCategories: Array<string>
        await test.step('Get categories from the slider', async () => {
            const categories = await kingBilly.mainPage.getCategorySlider.innerText()
            const categoriesSet = new Set(categories.split('\n').map(word => word.trim()));
            actualCategories = Array.from(categoriesSet);
        })

        await test.step('Check if the categories match the expected ones', async () => {
            if ((test.info().project.use.baseURL || '').includes('kingbillywin26')) {
                expect(actualCategories).toEqual(SLIDER_CATEGORIES_AU)
            } else {
                expect(actualCategories).toEqual(SLIDER_CATEGORIES)
            }
        })
    })

    for (const [categoryName, params] of Object.entries(CATEGORY_DROPDOWN_PARAMS) as [string, {
        locator: string,
        expectedResult: Array<string>
    }][]) {
        test(`Check subcategories of ${categoryName}`, async () => {

            await test.step(`Open ${categoryName} dropdown`, async () => {
                await kingBilly.mainPage.clickOnCategoryDropdown(params.locator)

                await kingBilly.mainPage.sleep(1000)
                const dropdownText = await kingBilly.mainPage.getSubCategoryDropdown.innerText()
                const categoriesArray = dropdownText.split('\n').map(string => string.trim())

                expect(categoriesArray).toEqual(params.expectedResult)
            })
        })
    }


    test('Check "Support" button', async () => {
        let intercomWindow: SupportMessanger
        await test.step('Open support window', async () => {
            intercomWindow = await kingBilly.mainPage.clickOnSupportButton()
        })

        await test.step('Check that intercom window opened', async () => {
            await expect(intercomWindow.getIntercomWindow).toBeVisible()
        })
    })
})

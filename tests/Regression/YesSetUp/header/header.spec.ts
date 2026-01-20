import test, {expect} from '@playwright/test'
import KingBilly from "../../../../src/PageManager/KingBilly";
import {DepModal} from "../../../../src/Components/DepModal";
import {LINKS} from "../../../../src/Data/Links/Links";
import {SEARCH_GAME} from "../../../../src/Data/ParametrizedData/games/games";
import {LOCALES} from "../../../../src/Data/Locales/Locales";



test.describe('Header', () => {
    let kingBilly: KingBilly
    let depModal: DepModal

    test.beforeEach(async ({page}) => {
        kingBilly = new KingBilly(page)

        await test.step('Navigate to main page', async () => {
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


    test('Check the "deposit" button', async () => {

        await test.step('', async () => {
            depModal = await kingBilly.mainPage.header.clickDepositButton()
        })

        await kingBilly.mainPage.page.reload()

        await test.step('Check if deposit modal is opened', async () => {
            await expect(depModal.getDepModal).toBeVisible()
        })
    })

    test('Check "Search your game" input', async () => {

        await test.step('Enter the game name in the search input', async () => {
            await kingBilly.mainPage.header.searchFor(SEARCH_GAME)
        })

        await test.step('Click on the game', async () => {
            await kingBilly.mainPage.header.clickOnGameItem()
        })

        await test.step('Check if game is opened', async () => {
            await expect(kingBilly.gamePage.getGameFrame).toBeVisible()
        })
    })

    test('Check language change dropdown', async () => {
        let listOfLocales: Array<string>

         test.skip((test.info().project.use.baseURL || '').includes('kingbillywin26'), 'These tests are skipped on kingbillywin26 domain');
         
        await test.step('Open lang dropdown', async () => {
            await kingBilly.mainPage.header.openLangDropdown()
        })

        await test.step('Get text of the lang button and dropdown', async () => {
            listOfLocales = await kingBilly.mainPage.header.getLangDropdownLocales()
        })

        await test.step('Compare received list to the expected result', async () => {
            expect(listOfLocales).toEqual(LOCALES)
        })
    })
})
import test, {expect, Locator} from "@playwright/test";

import {LINKS} from "../../../src/Data/Links/Links";
import {MAIN_USER} from "../../../src/Data/Users/mainUser";
import MainPage from "../../../../src/PO/MainPage/MainPage";
test.describe('Main page', () => {
        test.describe('Promo Section', () => {
            let mainPage: MainPage;

            test.beforeEach(async ({page}) => {
            mainPage = new MainPage(page)

            await test.step('Navigate to main page', async () => {
                await mainPage.navTo(LINKS.Main)
                await mainPage.clickAcceptCookies()
                await mainPage.closeModal()
            })
            
        
            await test.step('Verify user is logged in (using storage state)', async () => {
                await mainPage.header.waitForSelector(mainPage.header.getDepositButton)
                await expect(mainPage.header.getDepositButton).toBeVisible()
            })
        })

        test('Check Number of promo banners', async () => {
            let promoCards: Array<Locator> = []
            await test.step('Get promo cards', async () => {
                promoCards = await mainPage.promoSection.getPromoCards()
                expect(promoCards.length).toBeGreaterThanOrEqual(2)
            })
        })

        test('Check "Next" arrow-shaped button in the promo section',async () => {
            await test.step('Click on "Next" arrow-shaped button', async () => {
                await mainPage.promoSection.clickOnSliderButtonTwo()
                console.log(await mainPage.promoSection.getSliderButton.getAttribute('currentslide'))
            })

            await test.step('Check current slide number', async () => {
                const currentSlide = await mainPage.promoSection.getSliderButton.getAttribute('currentslide')

                expect(currentSlide).toBe('1')
            })
        })
    })
})

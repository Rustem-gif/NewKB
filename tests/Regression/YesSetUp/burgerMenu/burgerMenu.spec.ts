import test, {expect} from '@playwright/test'
import KingBilly from "../../../../src/PageManager/KingBilly";
import {LINKS} from "../../../../src/Data/Links/Links";
import SidebarMenu from "../../../../src/Components/SidebarMenu";
import {MAIN_USER} from "../../../../src/Data/Users/mainUser";




test.describe('Burger menu', () => {
    let kingBilly: KingBilly
    let burgerMenu: SidebarMenu


    test.beforeEach(async ({page}) => {

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

        await test.step('Open burger menu', async () => {
            burgerMenu = await kingBilly.mainPage.clickOnSidebarButton()
        })
    })

    test('Burger menu', async () => {
        await test.step('Check sidebar is open', async () => {
            await expect(burgerMenu.getSidebarMenu).toBeVisible()
        })
    })

    test('Check "Promotions" button', async ({baseURL}) => {

        await test.step('Click on the promotions button', async () => {
            await burgerMenu.openPromotionsTab()
        })

        await test.step('Check link of the page', async () =>{
            const actualUrl = await kingBilly.promoPage.getPageUrl()

            expect(actualUrl).toBe(`${baseURL}${LINKS.Promo}`)
        })

        await test.step('Check number of promos to be bigger than 1', async () => {
            await kingBilly.promoPage.page.waitForLoadState('domcontentloaded')
            await kingBilly.promoPage.page.waitForTimeout(4000)
            const allPromoCards = await kingBilly.promoPage.getPromoCard.all()
            console.log(allPromoCards)
            await kingBilly.promoPage.page.waitForTimeout(4000)
            await expect(allPromoCards.length).toBeGreaterThan(1)
        })
    })

    test('Check "Tournaments" button', async ({baseURL}) => {
        await test.step('Click on the "tournaments" button', async () => {
            await burgerMenu.openTournamentsTab()
        })

        await test.step('Check link of the page', async () => {
            const actualUrl = await kingBilly.tournamentPage.getPageUrl()

            expect(actualUrl).toBe(`${baseURL}${LINKS.Tournaments}`)
        })

        await test.step('Check tournament card to be visible', async () => {
            await expect(kingBilly.tournamentPage.getTournamentItem).toBeVisible()
        })

    })

    test('Check "VIP" button', async ({baseURL}) => {
        await test.step('Click on the "VIP" button', async () => {
            await burgerMenu.openVipTab()
            await kingBilly.vipPage.getVipPageLogo.waitFor({state: "visible"})
        })

        await test.step('Check link of the page', async () => {
            const actualUrl = await kingBilly.promoPage.getPageUrl()

            expect(actualUrl).toBe(`${baseURL}${LINKS.Vip}`)
        })

        await test.step('Check VIP card to be visible', async () => {
            await expect(kingBilly.vipPage.getCurrentStatusImage).toBeVisible()
        })
    })

    test('Check "Legend" button', async ({baseURL}) => {
        await test.step('Click on the "Legend" button', async () => {
            await burgerMenu.openLegendTab()
        })

        await test.step('Check link of the page', async () => {
            const actualUrl = await kingBilly.promoPage.getPageUrl()

            expect(actualUrl).toBe(`${baseURL}${LINKS.Legend}`)
        })

        await test.step('Check title of the page', async () => {
            await expect(kingBilly.legendPage.getLegendTitle).toBeVisible()
        })
    })

    test('Check Check "Mobile app" button', async ({baseURL}) => {
        await test.step('Click on the "Mobile app" button', async () => {
            await burgerMenu.clickOnMobileAppButton()
        })
        await test.step('Check link of the page', async () => {
            const actualUrl = await kingBilly.mobileAppPage.getPageUrl()

            expect(actualUrl).toBe(`${baseURL}${LINKS.mobileApp}`)
        })

        await test.step('Check if download button is visible', async () => {
            await expect(kingBilly.mobileAppPage.getDownloadAppButton).toBeVisible()
        })
    })

    test('Account Panel', async () => {

        await test.step('Scrap user info and compare the result', async ()=> {
            const userInfo = await burgerMenu.getUserInfo()
            const expectedUser = () => {
                return {
                    username: MAIN_USER.username,
                    currentStatus: MAIN_USER.status,
                    nextStatus: MAIN_USER.nextStatus,
                    statusPoints: MAIN_USER.statusPoints,
                    statusBar: MAIN_USER.progressBarState
                }
            }

            expect(userInfo).toEqual(expectedUser())
        })
    })

    test('Dropdown Functionality in account block', async () => {

        await test.step('Click on chevrone button', async () => {
            await burgerMenu.unwrapPlayerPanel()
        })

        await test.step('Check class of the user menu block', async () => {
            await expect(burgerMenu.getuserMenu).toHaveClass(burgerMenu.getOpenMenuStatusClass)
        })
    })

    test('Redirects to profile info', async ({baseURL}) => {
        const profileTitleText = 'Profile'
        await test.step('Click on chevrone button', async () => {
            await burgerMenu.unwrapPlayerPanel()
        })

        await test.step('Click on Profile info', async () => {
            await burgerMenu.clickOnUserMenuButton('Profile Info')
            await kingBilly.profilePage.page.waitForLoadState()
        })

        await test.step('Check the page that opened', async () => {
            const actualUrl = await kingBilly.profilePage.getPageUrl()

            expect(actualUrl).toEqual(`${baseURL}${LINKS.Profile}`)
            expect(await kingBilly.profilePage.getProfileTitle.innerText()).toEqual(profileTitleText)
        })
    })

    test('Redirects to Bonuses', async ({baseURL}) => {
         const bonusesTitleText = 'Bonuses'
         await test.step('Click on chevrone button', async () => {
            await burgerMenu.unwrapPlayerPanel()
        })

        await test.step('Click on Bonuses', async () => {
            await burgerMenu.clickOnUserMenuButton('Bonuses')
            await kingBilly.profilePage.page.waitForLoadState()
        })

        await test.step('Check the page that opened', async () => {
            const actualUrl = await kingBilly.profilePage.getPageUrl()

            expect(actualUrl).toEqual(`${baseURL}${LINKS.Bonuses}`)
            expect(await kingBilly.profilePage.getProfileTitle.innerText()).toEqual(bonusesTitleText)
        })
    })

    test('Redirects to Bets', async ({baseURL}) => {
         const betsTitleText = 'Game History'
         await test.step('Click on chevrone button', async () => {
            await burgerMenu.unwrapPlayerPanel()
        })

        await test.step('Click on Bets', async () => {
            await burgerMenu.clickOnUserMenuButton('Bets')
            await kingBilly.profilePage.page.waitForLoadState()
        })

        await test.step('Check the page that opened', async () => {
            const actualUrl = await kingBilly.profilePage.getPageUrl()

            expect(actualUrl).toEqual(`${baseURL}${LINKS.Bets}`)
            expect(await kingBilly.profilePage.getProfileTitle.innerText()).toEqual(betsTitleText)
        })
    })

    test('Redirects to Wallet', async ({baseURL}) => {
         const walletTitleText = 'Wallet'
         await test.step('Click on chevrone button', async () => {
            await burgerMenu.unwrapPlayerPanel()
        })

        await test.step('Click on Wallet', async () => {
            await burgerMenu.clickOnUserMenuButton('Wallets')
            await kingBilly.profilePage.page.waitForLoadState()
        })

        await test.step('Check the page that opened', async () => {
            const actualUrl = await kingBilly.profilePage.getPageUrl()

            expect(actualUrl).toEqual(`${baseURL}${LINKS.Wallet}`)
            expect(await kingBilly.profilePage.getProfileTitle.innerText()).toEqual(walletTitleText)
        })
    })

    test('Check "Exit" button in the burger menu', async () => {
        await test.step('Click on Exit', async () => {
            await kingBilly.mainPage.clickOnSidebarButton()
        })

        await test.step('Check if burger menu is visible', async () => {
            await expect(burgerMenu.getSidebarMenu).not.toBeVisible()
        })
    })
})
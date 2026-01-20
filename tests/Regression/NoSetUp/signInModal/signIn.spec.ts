import test, {expect} from '@playwright/test'
import KingBilly from "../../../../src/PageManager/KingBilly";
import {LINKS} from "../../../../src/Data/Links/Links";
import SignInModal from "../../../../src/PO/MainPage/Component/SignInModal";
import {MAIN_USER} from "../../../../src/Data/Users/mainUser";


test.describe('Log In', () => {
    let kingBilly: KingBilly;
    let signInModal: SignInModal

    test.beforeEach(async ({ page }) => {
        kingBilly = new KingBilly(page);

        await test.step('Navigate to main page', async () => {
            await kingBilly.mainPage.navTo(LINKS.Main);
            await kingBilly.mainPage.clickAcceptCookies();
        })

        await test.step('Open Sign In modal', async () => {
            signInModal = await kingBilly.mainPage.header.clickSignIn()
        })
    })


    test('Check "Sign in" button availability\n', async () => {

        await test.step('Click on "Sign in" button', async () => {
            await expect(signInModal.getSignInModalForm).toBeVisible()
        })
    })

    test('Check "Don\'t have an account" button', async () => {

        await test.step('Click on "Don\'t have an account" button', async () => {
            const signUpModal = await signInModal.clickCreateAccount()
            await expect(signUpModal.getSignUpModal).toBeVisible()
        })
    })

    test('Enter existing email into "Email" input', async () => {

        await test.step('Enter existing email into "Email" input', async () => {
            await signInModal.fillEmail(MAIN_USER.email)
            await signInModal.getEmailInput.blur()
        })

        await test.step('Check if email is entered correctly', async () => {
            await expect(signInModal.getEmailInput).toHaveValue(MAIN_USER.email)
        })
    })

    test('Enter valid password into the "Password" input', async () => {

        await test.step('Enter valid password into the password input', async () => {
            await signInModal.fillPassword(MAIN_USER.password)
            await signInModal.getPasswordInput.blur()
        })

        await test.step('Check if email is entered correctly', async () => {
            await expect(signInModal.getPasswordInput).toHaveValue(MAIN_USER.password)
        })
    })

    test('Check "Show/hide" password button', async () => {

        await test.step('Enter password in the password field', async () => {
            await signInModal.fillPassword(MAIN_USER.password)
        })

        await test.step('Check original visibility state', async () => {
            await expect(signInModal.getPasswordInput).toHaveAttribute('type', 'password')
        })

        await test.step('Press hide/show password button', async () => {
            await signInModal.clickOnPasswordVisibilityButton()
        })

        await test.step('Check visibility state', async () => {
            await expect(signInModal.getPasswordInput).toHaveAttribute('type', 'text')
        })

        await test.step('Press hide/show password button', async () => {
            await signInModal.clickOnPasswordVisibilityButton()
        })

        await test.step('Check visibility state', async () => {
            await expect(signInModal.getPasswordInput).toHaveAttribute('type', 'password')
        })
    })

    test('Check "Forgot your password" button', async () => {

        await test.step('Click on the "Forgot your password" button', async () => {
            await signInModal.clickForgotPassword()
        })

        await test.step('Check page URL', async () => {
            expect(await kingBilly.passwordRecovery.getPageUrl()).toEqual(`${test.info().project.use.baseURL}${LINKS.PasswordRecovery}`)
        })

        await test.step('Check if at least one UI element is visible', async () => {
            await expect(kingBilly.passwordRecovery.getDidntRecieveInstructionsLink).toBeVisible()
        })
    })

    test('Check "Sign in" functionality', async () => {
        await test.step('Sign in', async () => {
            await signInModal.fillEmail(MAIN_USER.email)
            await signInModal.fillPassword(MAIN_USER.password)
            await signInModal.clickSignIn()
            await expect(kingBilly.mainPage.header.getDepositButton).toBeVisible()
        })
    })
})
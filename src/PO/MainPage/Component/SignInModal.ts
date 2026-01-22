import {Locator, Page} from "@playwright/test";
import BaseComponent from "../../../Components/BaseComponent";
import SignUpModal from "./SignUpModal";
import { test } from "@playwright/test";
import Header from "../../../Components/Header";

export default class SignInModal extends BaseComponent {
    private header: Header = new Header(this.page)
    private emailInput: Locator = this.page.locator('#login_modal_email_input')
    private passwordInput: Locator = this.page.locator('#login_password_input')
    private signInButton: Locator = this.page.locator('#submit_login')
    private forgetPasswordLink: Locator = this.page.locator('#forgot_pass_btn')
    private loginWithGoogleButton: Locator = this.page.locator('.login-form__social .auth-providers__icon').filter({hasText: 'Continue with Google'})
    private createAccountButton: Locator = this.page.locator('#login_modal_reg_btn')
    private signInModalForm: Locator = this.page.locator('.sign-in-page')
    private hideShowPasswordButton: Locator = this.page.locator('.login-form__form-element .password-input__visibility-icon')
    private emailInputError: Locator = this.page.locator('.sign-in-page__body .login-form__input.input + .collapse .form-element__error')
    private passwordInputError: Locator = this.page.locator('.sign-in-page__body .password-input + .collapse .form-element__error')
    private invalidCredsError: Locator = this.page.locator('.errors__error')

    async fillEmail(email: string): Promise<void> {
        await this.emailInput.fill(email)
    }

    async fillPassword(password: string): Promise<void> {
        await this.passwordInput.fill(password)
    }

    async clickSignIn(): Promise<void> {
        await this.signInButton.click()
        await this.header.getDepositButton.waitFor({state: 'visible', timeout: 10000})
    }

    async clickSignInNegative(): Promise<void> {
        await this.signInButton.click()
    }

    async clickForgotPassword(): Promise<void> {
        await this.forgetPasswordLink.click()
    }

    async clickLoginWithGoogle(): Promise<void> {
        await this.loginWithGoogleButton.click()
    }

    async clickCreateAccount(): Promise<SignUpModal> {
        await this.createAccountButton.click()
        return new SignUpModal(this.page)
    }

    async clickOnPasswordVisibilityButton(): Promise<void> {
        await this.hideShowPasswordButton.click()
    }

    get getSignInModalForm(): Locator {
        return this.signInModalForm;
    }

    get getEmailInput(): Locator {
        return this.emailInput;
    }

    get getPasswordInput(): Locator {
        return this.passwordInput;
    }

    get getEmailInputError(): Locator {
        return this.emailInputError;
    }

    get getpasswordInputError(): Locator {
        return this.passwordInputError
    }

    get getInvalidCredsError(): Locator {
        return this.invalidCredsError;
    }
}
import BasePage from "../BasePage/BasePage";
import {Locator, Page} from "@playwright/test";

export default class PasswordRecovery extends BasePage {
    public notificationText: string = 'If your email is within our database, an email with instructions on how to recover your password will be sent in a few minutes'
    public confirmationNotificationText: string = 'confirmation instructions were sent to your email'

    private didntRecieveInstructionsLink: Locator = this.page.locator('.auth-form__instruction-link:nth-of-type(1)')
    private resendReset: Locator = this.page.locator('.btn--danger')
    private passwordRecoveryNotification: Locator = this.page.locator('.notification__title')
    private resendConfirmationInstructionsButton: Locator = this.page.locator('.auth-form__instruction-link:nth-of-type(2)')
    private resendConfirmationNotification: Locator = this.page.locator('.notification__title')
    private emailInput: Locator = this.page.locator('.input__native')
    private inputError: Locator = this.page.locator('.form-element__error')

    
    async clickDidntRecieveInstructions(): Promise<void> {
        await this.didntRecieveInstructionsLink.click()
    }

    async clickResendReset(): Promise<void> {
        await this.resendReset.click()
    }

    async clickResendConfirmationInstructions(): Promise<void> {
        await this.resendConfirmationInstructionsButton.click()
    }

    async fillEmail(email: string): Promise<void> {
        await this.emailInput.fill(email)
    }


    get getEmailInput(): Locator {
        return this.emailInput
    }

    get getResendConfirmationInstructionsButton(): Locator {
        return this.resendConfirmationInstructionsButton
    }

    get getDidntRecieveInstructionsLink(): Locator {
        return this.didntRecieveInstructionsLink
    }

    get getResetPasswordButton(): Locator {
        return this.resendReset
    }

    get getPasswordRecoveryNotification(): Locator {
        return this.passwordRecoveryNotification
    }

    get getResendConfirmationNotification(): Locator {
        return this.resendConfirmationNotification
    }

    get getNotificationText(): string {
        return this.notificationText
    }

    get getConfirmationNotificationText(): string {
        return this.confirmationNotificationText
    }

    get getInputError(): Locator {
        return this.inputError
    }
}


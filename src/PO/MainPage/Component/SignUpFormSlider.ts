import BaseComponent from "../../../Components/BaseComponent";
import {Locator, Page} from "@playwright/test";
import SignInModal from "./SignInModal";
import PromoPage from "../../PromoPage/PromoPage";


export default class SignUpFormSlider extends BaseComponent{
    private emailInput: Locator = this.page.locator('#main_email_input')
    private passwordInput: Locator = this.page.locator('#main_password_input')
    private countryDropdown: Locator = this.page.locator('#main_country_dropdown')
    private countryDropdownItem = (country: string) => this.page.locator('#reg_modal_country_dropdown-menu .select__option').filter({hasText: country})
    private currencyDropdown: Locator = this.page.locator('#main_currency_dropdown')
    private currencyDropdownItem = (currency: string) => this.page.locator('#main_currency_dropdown .select__option').filter({hasText: currency})
    private promoCheckbox: Locator = this.page.locator('[for=\'promos_checkbox\'] > .checkbox__point')
    private ageCheckbox: Locator = this.page.locator('[for=\'age_checkbox\'] > .checkbox__point')
    private crossSaleCheckbox: Locator = this.page.locator('[for=\'cross_sale_checkbox\'] .checkbox__point')
    private creacteAccountButton: Locator = this.page.locator('#main_create_acc_btn')
    private signInLink: Locator = this.page.locator('.registration-form-nomodal__link')
    private passwordStateBar: Locator = this.page.locator('.password-input__strength-progress')
    private stateText: Locator = this.page.locator('.password-input__strength-description')
    private passwordTip: Locator = this.page.locator('.form-element__error')
    private termsAndConditionsLink: Locator = this.page.locator('a.terms-acceptance__terms-link')
    private emailInputError: Locator = this.page.locator('.form-element__error')
    private discoverMoreButton: Locator = this.page.locator('.registration-form-nomodal__col--promo #discover_more_btn')

    async fillEmail(email: string): Promise<void> {
        await this.emailInput.fill(email)
    }

    async fillPassword(password: string): Promise<void> {
        await this.passwordInput.fill(password)
    }

    async selectCountry(country: string): Promise<void> {
        await this.countryDropdown.click()
        await this.countryDropdownItem(country).click()
    }

    async selectCurrency(currency: string): Promise<void> {
        await this.currencyDropdown.click()
        await this.currencyDropdownItem(currency).click()
    }

    async checkPromoCheckbox(): Promise<void> {
        await this.promoCheckbox.click()
    }

    async checkAgeCheckbox(): Promise<void> {
        await this.ageCheckbox.click()
    }

    async checkCrossSaleCheckbox(): Promise<void> {
        await this.crossSaleCheckbox.click()
    }

    async clickCreateAccountButton(): Promise<void> {
        await this.creacteAccountButton.click()
    }

    async clickSignInLink(): Promise<SignInModal> {
        await this.signInLink.click()
        return new SignInModal(this.page)
    }

    async createAccount({email, password}: {email: string, password: string}): Promise<void> {
        await this.fillEmail(email)
        await this.fillPassword(password)
        await this.checkAgeCheckbox()
        await this.clickCreateAccountButton()
    }


    async clickOnTermsAndConditionsLink(): Promise<void> {
        await this.termsAndConditionsLink.click()
    }

    async getCurrenciesFromDropdown(): Promise<Array<string>> {
        await this.currencyDropdown.click()

        return await this.page.evaluate(() => {
        const selectList = document.querySelector('.select__list');
        if (!selectList) {
            throw new Error('Select list not found');
        }

        const children = selectList.children;
        const arrayChildren = Array.from(children);

        const array: string[] = [];
        for (const child of arrayChildren) {
            const text = (child as HTMLElement).innerText;
            array.push(text);
        }

        return array;
        })
    }

    async getCountriesFromDropdown(): Promise<Array<string>> {
        await this.countryDropdown.click()

        return await this.page.evaluate(() => {
        const selectList = document.querySelector('.select__list');
        if (!selectList) {
            throw new Error('Select list not found');
        }

        const children = selectList.children;
        const arrayChildren = Array.from(children);

        const array: string[] = [];
        for (const child of arrayChildren) {
            const text = (child as HTMLElement).innerText;
            array.push(text);
        }

        return array;
        })
    }

    async getPassowrdStateText(): Promise<string> {
        const isVisible = await this.passwordTip.isVisible()

        let text1: string | null = ''
        let text2: string | null = ''
        if (isVisible){
             text1 = await this.stateText.textContent()
             text2 = await this.passwordTip.textContent()
        } else {
             text1 = await this.stateText.textContent()
        }


        return `${text1} ${text2}`
    }

    async clickOnDiscoverMore(): Promise<PromoPage> {
        await this.discoverMoreButton.click()
        return new PromoPage(this.page)
    }

    get getEmailInput() {
        return this.emailInput;
    }

    get getPasswordInput() {
        return this.passwordInput;
    }

    get getPasswordStateBar() {
        return this.passwordStateBar;
    }

    get getPromoCheckbox() {
        return this.promoCheckbox;
    }

    get getAgeCheckbox() {
        return this.ageCheckbox;
    }

    get getCrossSaleCheckbox() {
        return this.crossSaleCheckbox
    }

    get getStateText() {
        return this.stateText;
    }

    get getPasswordTip() {
        return this.passwordTip
    }

    get getEmailInputError() {
        return this.emailInputError
    }
}
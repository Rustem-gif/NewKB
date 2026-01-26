import BaseComponent from '../../../Components/BaseComponent';
import { Locator, Page } from '@playwright/test';

export default class MainSliderRegistrationForm extends BaseComponent {
  private mainSliderRegistrationForm: Page = this.page;
  private emailInput: Locator = this.page.locator('#main_email_input');
  private passwordInput: Locator = this.page.locator('#main_password_input');
  private countryDropdown: Locator = this.page.locator(
    '.registration-form-nomodal__country-select'
  );
  private countryDropdownItem = (country: string) =>
    this.page.locator('#main_country_dropdown-menu .select__option').filter({ hasText: country });
  private currencyDropdown: Locator = this.page.locator(
    '.registration-form-nomodal__currency-select'
  );
  private currencyDropdownItem = (currency: string) =>
    this.page
      .locator('.registration-form-nomodal__currency-select .select__option')
      .filter({ hasText: currency });
  private promoCheckbox: Locator = this.page.locator('#promos_checkbox');
  private ageCheckbox: Locator = this.page.locator('#age_checkbox');
  private crossSaleCheckbox: Locator = this.page.locator('#cross_sale_checkbox');
  private createAccountButton: Locator = this.page.locator('#main_create_acc_btn');
  private signInLink: Locator = this.page.locator('.registration-form-nomodal__link');

  async fillEmail(email: string): Promise<void> {
    await this.emailInput.fill(email);
  }

  async fillPassword(password: string): Promise<void> {
    await this.passwordInput.fill(password);
  }

  async selectCountry(country: string): Promise<void> {
    await this.countryDropdown.click();
    await this.countryDropdownItem(country).click();
  }

  async selectCurrency(currency: string): Promise<void> {
    await this.currencyDropdown.click();
    await this.currencyDropdownItem(currency).click();
  }

  async checkPromoCheckbox(): Promise<void> {
    await this.promoCheckbox.click();
  }

  async checkAgeCheckbox(): Promise<void> {
    await this.ageCheckbox.click();
  }

  async checkCrossSaleCheckbox(): Promise<void> {
    await this.crossSaleCheckbox.click();
  }

  async clickCreateAccount(): Promise<void> {
    await this.createAccountButton.click();
  }

  async clickSignInLink(): Promise<void> {
    await this.signInLink.click();
  }
}

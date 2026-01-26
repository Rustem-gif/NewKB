import BasePage from '../BasePage/BasePage';
import { Locator, Page } from '@playwright/test';

export default class ReferalProgram extends BasePage {
  private title: Locator = this.page.locator('h1');
  private refBonusBlock: Locator = this.page.locator('.referral-page__bonus');
  private refPageStepper: Locator = this.page.locator('.referral-page__steps-list');
  private refFAQ: Locator = this.page.locator('.referral-page__questions');
  private refTermsAndCond: Locator = this.page.locator('.description__preview ');
  private generateLinkButton: Locator = this.page.locator('.referral-page__bonus-button');
  private profileReferalLinkForm: Locator = this.page.locator('.referral-link-creation-form');
  private refLinkInputField: Locator = this.page.locator('.input__left-container + input');

  async clickGenerateLinkButton() {
    await this.generateLinkButton.click();
  }

  get getTitle() {
    return this.title;
  }
  get getRefBonusBlock() {
    return this.refBonusBlock;
  }
  get getRefPageStepper() {
    return this.refPageStepper;
  }
  get getRefFAQ() {
    return this.refFAQ;
  }
  get getRefTermsAndCond() {
    return this.refTermsAndCond;
  }

  get getGenerateLinkButton() {
    return this.generateLinkButton;
  }

  get getProfileReferalLinkForm() {
    return this.profileReferalLinkForm;
  }
  get getRefLinkInputField() {
    return this.refLinkInputField;
  }
}

import { Locator, Page } from '@playwright/test';
import BasePage from '../BasePage/BasePage';

export default class PrivacyPolicy extends BasePage {
  private privacyPolicyTitle: Locator = this.page.locator('h1');
  private infoBlock: Locator = this.page.locator('.help-center__data');

  async getPrivacyPolicyText(): Promise<string> {
    return await this.infoBlock.innerText();
  }

  get PrivacyPolicyTitle(): Locator {
    return this.privacyPolicyTitle;
  }
}

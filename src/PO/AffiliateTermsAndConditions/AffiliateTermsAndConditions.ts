import { Locator, Page } from '@playwright/test';
import BasePage from '../BasePage/BasePage';

export default class AffiliateTermsAndConditions extends BasePage {
  private body: Locator = this.page.locator('.cms-page');

  async getTextOfThePage(): Promise<string> {
    await this.body.waitFor({ state: 'visible' });
    const text = await this.body.innerText();
    return text;
  }
}

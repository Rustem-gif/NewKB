import BasePage from '../BasePage/BasePage';
import { Locator, Page } from '@playwright/test';

export default class CasinoDictionary extends BasePage {
  private pageTitle: Locator = this.page.locator('h1').filter({ hasText: "KING'S DICTIONARY" });
  private body: Locator = this.page.locator('.help-center__data');

  async getBodyText(): Promise<string> {
    return await this.body.innerText();
  }

  get getPageTitle() {
    return this.pageTitle;
  }
}

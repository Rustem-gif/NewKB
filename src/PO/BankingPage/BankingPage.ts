import BasePage from '../BasePage/BasePage';
import { Locator, Page } from '@playwright/test';

export default class BankingPage extends BasePage {
  private bankingItem: Locator = this.page.locator(
    '.payment-tables__content:not(.payment-tables__content--hide) .payment-list__block:nth-of-type(1)'
  );
  private bankingItems: Locator = this.page.locator(
    '.payment-tables__content:not(.payment-tables__content--hide) .payment-list__block'
  );

  async getNumberOfBankingItems() {
    return await this.bankingItems.count();
  }

  get getBankingItem() {
    return this.bankingItem;
  }

  get getBankingItems() {
    return this.bankingItems;
  }
}

import { Locator } from '@playwright/test';
import { Page } from '@playwright/test';
import BaseComponent from '../../../Components/BaseComponent';

export default class CategoryDropdown extends BaseComponent {
  private accumulatingCategory: Locator = this.page.locator('#slots_accumulating');
  private bonusBuyCategory: Locator = this.page.locator('#slots_bonus_buy');
  private slotsMegaways: Locator = this.page.locator('#slots_megaways');
  private slotsCrash: Locator = this.page.locator('#slots_crash');
  private slotsBook: Locator = this.page.locator('#slots_book');
  private slotsExclusive: Locator = this.page.locator('#slots_exclusive');

  private liveBlackJack: Locator = this.page.locator('#live_blackjack');
  private liveRoulette: Locator = this.page.locator('#live_roulette');
  private liveBaccarat: Locator = this.page.locator('#live_baccarat');
  private livePoker: Locator = this.page.locator('#live_poker');

  private onlineRoulette: Locator = this.page.locator('#table_online_roulette');
  private onlineBlackJack: Locator = this.page.locator('#table_online_blackjack');
  private onlineBaccarat: Locator = this.page.locator('#table_online_baccarat');

  private subcategory: Locator = this.page.locator('.top-games-menu__link');

  protected slotsCategories: Array<Locator> = [
    this.accumulatingCategory,
    this.bonusBuyCategory,
    this.slotsMegaways,
    this.slotsCrash,
    this.slotsBook,
    this.slotsExclusive,
  ];

  protected liveCategories: Array<Locator> = [
    this.liveBlackJack,
    this.liveRoulette,
    this.liveBaccarat,
    this.livePoker,
  ];

  protected tableCategories: Array<Locator> = [
    this.onlineRoulette,
    this.onlineBlackJack,
    this.onlineBaccarat,
  ];

  async getSubcategories(): Promise<Array<string>> {
    return this.page.evaluate(() => {
      const listOfCategories = document.querySelectorAll('.top-games-menu__link');

      const arrayOfElements = Array.from(listOfCategories);
      const arrayOfCategoryNames = [];
      for (let element of arrayOfElements) {
        let categoryName = (element as HTMLElement).innerText;
        arrayOfCategoryNames.push(categoryName.trim());
      }

      return arrayOfCategoryNames;
    });
  }

  async selectSubcategory(subcategory: string): Promise<void> {
    await this.subcategory.filter({ hasText: subcategory }).click();
  }
}

import BasePage from '../BasePage/BasePage';
import { Locator, Page } from '@playwright/test';

export default class VipPage extends BasePage {
  private currentStatusImage: Locator = this.page.locator('.vip-page-head__img');
  private vipPageLogo: Locator = this.page.locator('.new-vip-page__title');
  private vipPageStepper: Locator = this.page.locator('.new-vip-page__main  .vip-grid__grid');
  private cardList: Locator = this.page.locator('section .slick-list');
  private pageLevelLogo: Locator = this.page.locator('.vip-page-head__level');
  private contentContainer: Locator = this.page.locator('.container');
  private termsAndConditions: Locator = this.page.locator('.new-vip-page__section.description');

  get getCurrentStatusImage(): Locator {
    return this.currentStatusImage;
  }

  get getVipPageLogo(): Locator {
    return this.vipPageLogo;
  }

  get getVipPageStepper(): Locator {
    return this.vipPageStepper;
  }

  get getCardList(): Locator {
    return this.cardList;
  }

  get getPageLevelLogo(): Locator {
    return this.pageLevelLogo;
  }

  get getContentContainer(): Locator {
    return this.contentContainer;
  }

  get getTermsAndConditions(): Locator {
    return this.termsAndConditions;
  }
}

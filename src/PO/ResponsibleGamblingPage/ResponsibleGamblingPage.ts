import { Locator, Page } from '@playwright/test';
import BasePage from '../BasePage/BasePage';

export default class ResponsibleGamblingPage extends BasePage {
  private responsibleGamblingTitle: Locator = this.page.locator('h1');

  get getResponsibleGamblingTitle(): Locator {
    return this.responsibleGamblingTitle;
  }
}

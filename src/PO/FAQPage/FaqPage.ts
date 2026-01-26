import BasePage from '../BasePage/BasePage';
import { Locator, Page } from '@playwright/test';

export default class FaqPage extends BasePage {
  private questionList: Locator = this.page.locator('.help-center__data');

  get getQuestionList() {
    return this.questionList;
  }
}

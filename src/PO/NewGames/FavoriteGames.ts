import { Locator, Page } from '@playwright/test';
import BasePage from '../BasePage/BasePage';

export default class FavoriteGames extends BasePage {
  private favoriteGamesButton: Locator = this.page.locator(
    '.catalog__item:nth-of-type(1) .game__favorite'
  );
  private favoriteGameItem: Locator = this.page.locator('.favorite-games__item');
  private favoriteGamePageButton: Locator = this.page.locator(
    '.favorite-games__item .game__favorite'
  );

  async clickOnFavoriteButton(): Promise<void> {
    await this.favoriteGamesButton.click();
  }

  async clickOnFavoritePageGameButton(): Promise<void> {
    await this.favoriteGamePageButton.click();
  }

  get getFavoriteGameItem(): Locator {
    return this.favoriteGameItem;
  }
}

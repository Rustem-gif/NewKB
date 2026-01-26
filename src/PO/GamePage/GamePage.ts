import BasePage from '../BasePage/BasePage';
import { Locator, Page } from '@playwright/test';

export default class GamePage extends BasePage {
  private gameFrame: Locator = this.page.locator('.game-frame__frame');
  private sideBarPanel: Locator = this.page.locator('.game-panel');
  private sideNewGame: Locator = this.page.locator('#game_side_new');
  private sideRecentGames: Locator = this.page.locator('#game_side_recently');
  private sideFavoriteGames: Locator = this.page.locator('#game_side_fav');
  private sideTopGames: Locator = this.page.locator('#game_side_fav');
  private sideLastGames: Locator = this.page.locator('#game_side_last');
  private sideTournaments: Locator = this.page.locator('#game-side-tournament');
  private sideSupport: Locator = this.page.locator('#game_side_support');
  private searchButton: Locator = this.page.locator('.game-panel__button-search');
  private searchInput: Locator = this.page.locator('#games-search');
  private gameButton: Locator = this.page.locator('#games-search-item-0');
  private confirmButton: Locator = this.page.locator(
    '.game-session-close-modal__buttons .btn--primary'
  );
  private twoScreensButton: Locator = this.page.locator('.game-controls__button--screen-2');
  private gameWindow: Locator = this.page.locator('.page-game__grid-item');
  private fourScreensButton: Locator = this.page.locator('.game-controls__button--screen-4');
  private sidebarCurrencyDropdown: Locator = this.page.locator('#game-currency-select');
  private gameCurrencyList: Locator = this.page.locator('.game-currency__list');
  private tournamentButton: Locator = this.page.locator('#game-side-tournament');
  private sidebarTournament: Locator = this.page.locator('.game-tourn');
  private ingameCurrency = (text: string) =>
    this.page.locator('.game-currency__code').filter({ hasText: text });

  async triggerSideBarMenu() {
    await this.sideBarPanel.hover();
  }

  async clickOnSearchButton() {
    await this.searchButton.click();
  }

  async searchForAGame(text: string) {
    await this.searchInput.fill(text);
  }

  async clickOnGame() {
    await this.gameButton.click();
  }

  async openSecondGameWindow() {
    await this.twoScreensButton.click();
  }

  async openFourGameWindow() {
    await this.fourScreensButton.click();
  }

  async clickOnConfirm() {
    await this.confirmButton.click();
  }

  async openCurrencyDropdown() {
    await this.sidebarCurrencyDropdown.click();
  }

  async selectIngameCurrency(text: string) {
    await this.ingameCurrency(text).click();
  }

  async clickOnTournamentButton() {
    await this.tournamentButton.click();
  }

  get getGameFrame(): Locator {
    return this.gameFrame;
  }

  get getSideBarPanel(): Locator {
    return this.sideBarPanel;
  }

  get getGameWindow(): Locator {
    return this.gameWindow;
  }

  get getSidebarCurrencyDropdown(): Locator {
    return this.sidebarCurrencyDropdown;
  }

  get getGameCurrencyList(): Locator {
    return this.gameCurrencyList;
  }

  get getSidebarTournament(): Locator {
    return this.sidebarTournament;
  }

  get sideBarButtons(): Array<Locator> {
    return [
      this.sideNewGame,
      this.sideRecentGames,
      this.sideFavoriteGames,
      this.sideTopGames,
      this.sideLastGames,
      this.sideTournaments,
      this.sideSupport,
    ];
  }
}

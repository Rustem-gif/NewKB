import BaseComponent from './BaseComponent';
import { Locator, Page } from '@playwright/test';
import PromoPage from '../PO/PromoPage/PromoPage';

export default class SidebarMenu extends BaseComponent {
  private sidebarMenu: Locator = this.page.locator('.bar-modal__container');
  private promotionsTab: Locator = this.page.locator('#bar #burger_promotions_btn');
  private tournamentsTab: Locator = this.page.locator('#bar #burger_tournaments_btn ');
  private vipTab: Locator = this.page.locator('#bar #burger_vip_btn');
  private bankingTab: Locator = this.page.locator('#bar #burger_banking_btn');
  private legendTab: Locator = this.page.locator('#bar #burger_legend_btn');
  private appBtn: Locator = this.page.locator('#bar .btn--app');
  private userInfoBlock: Locator = this.page.locator('#bar').locator('.select-user-menu__section');
  private compointsBlock: Locator = this.page.locator('#bar').locator('.side-bar');
  private playerPannerWrapper: Locator = this.page.locator('#bar #downshift-select');
  private username: Locator = this.page.locator('#bar .user-info-player__nickname');
  private currentStatus: Locator = this.page.locator('#bar .user-info-player__level');
  private nextStatus: Locator = this.page.locator('#bar .user-status-player__name');
  private statusPoints: Locator = this.page.locator('#bar .user-status-player__next-level');
  private statusBar: Locator = this.page.locator('#bar .progress-bar__track');
  private userMenu: Locator = this.page.locator('#bar .select-user-menu__dropdown');
  private logoutButton: Locator = this.page.locator('#bar .logout ');
  private referalButton: Locator = this.page.locator(
    '#bar .left-header-menu__item--referral_program'
  );

  private openMenuStatusClass: string =
    'select-user-menu__dropdown select-user-menu__dropdown--open';

  private profileButton = (text: string) =>
    this.page.locator('#bar .user-menu__link ').filter({ hasText: text });

  async openPromotionsTab(): Promise<void> {
    await this.promotionsTab.click();
  }

  async openTournamentsTab(): Promise<void> {
    await this.tournamentsTab.click();
  }

  async openVipTab(): Promise<void> {
    await this.vipTab.click();
  }

  async openBankingTab(): Promise<void> {
    await this.bankingTab.click();
  }

  async openLegendTab(): Promise<void> {
    await this.legendTab.click();
  }

  async clickAppBtn(): Promise<void> {
    await this.appBtn.click();
  }

  async unwrapPlayerPanel(): Promise<void> {
    await this.playerPannerWrapper.click();
  }

  async getUserInfo(): Promise<Object> {
    const usernameInfo = await this.username.innerText();
    const currentStatusInfo = await this.currentStatus.innerText();
    const nextStatusInfo = await this.nextStatus.innerText();
    const statusPointsInfo = await this.statusPoints.textContent();
    const statusBarInfo = await this.statusBar.getAttribute('style');

    return {
      username: usernameInfo,
      currentStatus: currentStatusInfo,
      nextStatus: nextStatusInfo,
      statusPoints: statusPointsInfo,
      statusBar: statusBarInfo,
    };
  }

  async getButtonsOfUserPanel(): Promise<Array<string>> {
    return String(await this.userMenu.innerText())
      .split('\n')
      .map(word => word.trim());
  }

  async getClassOfUserPanel(): Promise<string | null> {
    return await this.userMenu.getAttribute('class');
  }

  async clickOnUserMenuButton(string: string): Promise<void> {
    await this.profileButton(string).click();
  }

  async clickOnMobileAppButton(): Promise<void> {
    await this.appBtn.click();
  }

  async clickOnLogoutButton(): Promise<void> {
    await this.logoutButton.click();
  }

  async clickOnRefferalButton(): Promise<void> {
    await this.referalButton.click();
  }

  //accessors
  get getSidebarMenu(): Locator {
    return this.sidebarMenu;
  }

  get getPromotionsTab(): Locator {
    return this.promotionsTab;
  }

  get getTournamentsTab(): Locator {
    return this.tournamentsTab;
  }

  get getVipTab(): Locator {
    return this.vipTab;
  }

  get getBankingTab(): Locator {
    return this.bankingTab;
  }

  get getLegendTab(): Locator {
    return this.legendTab;
  }

  get getAppBtn(): Locator {
    return this.appBtn;
  }

  get getUserInfoBlock(): Locator {
    return this.userInfoBlock;
  }

  get getCompointsBlock(): Locator {
    return this.compointsBlock;
  }

  get getuserMenu(): Locator {
    return this.userMenu;
  }

  get getOpenMenuStatusClass(): string {
    return this.openMenuStatusClass;
  }

  get getReferalButton(): Locator {
    return this.referalButton;
  }
}

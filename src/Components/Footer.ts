import { IGameCategories } from '../Interfaces/gameCategories';
import BaseComponent from './BaseComponent';
import { Locator, Page } from '@playwright/test';

export default class Footer extends BaseComponent {
  private facebookButton: Locator = this.page.locator('.social-links__link--facebook');
  private instagramButton: Locator = this.page.locator('.social-links__link--instagram');
  private youtubeButton: Locator = this.page.locator('.social-links__link--youtube');
  private telegramButton: Locator = this.page.locator('.social-links__link--telegram');
  private bankingLink: Locator = this.page.locator('.footer-menu__link--online-casino-payments');
  private casinoFaq: Locator = this.page.locator('.footer-menu__link--casino-faq');
  private casinoDictionary: Locator = this.page.locator('.footer-menu__link--dictionary');
  private cryptoFaq: Locator = this.page.locator('.footer-menu__link--btc-faq');
  private complaints: Locator = this.page.locator('.footer-menu__link--complaints');
  private cookiePolicy: Locator = this.page.locator('.footer-menu__link--cookie-policy-tb');
  private termsAndConditions: Locator = this.page.locator(
    '.footer-menu__link--terms-and-conditions'
  );
  private privacyPolicy: Locator = this.page.locator('.footer-menu__link--privacy-policy');
  private responsibleGaming: Locator = this.page.locator(
    '.footer-menu__link--responsible-gaming-tb'
  );
  private legend: Locator = this.page.locator('.footer-menu__link--the-legend');
  private blog: Locator = this.page.locator('.footer-menu__link--blog');
  private top: Locator = this.page.locator('.footer-menu__link--top_casino_games');
  private new: Locator = this.page.locator('.footer-menu__link--new_online_games');
  private slots: Locator = this.page.locator('.footer-menu__link--slots');
  private tableGames: Locator = this.page.locator('.footer-menu__link--casino_table_games');
  private liveCasino: Locator = this.page.locator('.footer-menu__link--live_casino');
  private kingsChoice: Locator = this.page.locator('.footer-menu__link--hot_games');
  private promotions: Locator = this.page.locator('.footer-menu__link--promotions');
  private tournaments: Locator = this.page.locator('.footer-menu__link--tournaments');
  private footerLangDropdown: Locator = this.page.locator('#footer_lang_dropdown');
  private vip: Locator = this.page.locator('.footer-menu__link--vip-club');
  private BonusTermsAndConditions: Locator = this.page.locator(
    '.footer-menu__link--bonus-terms-conditions'
  );
  private affiliate: Locator = this.page.locator('.footer-menu__link--affiliate');
  private affiliateTermsAndConditions: Locator = this.page.locator(
    '.footer-menu__link--affiliate-terms-conditions'
  );
  private askgamblersAwards: Locator = this.page.locator('.ask-footer');
  private paymentLogos: Locator = this.page.locator('footer .slick-track > div[data-index][style]');
  private nextArrow: Locator = this.page.locator('footer .slick-next');

  public gameCategories: IGameCategories = {
    New: {
      locator: this.new,
      title: 'New online games',
    },
    Top: {
      locator: this.top,
      title: 'Top casino games',
    },
    Popular: {
      locator: this.kingsChoice,
      title: "King's Choice",
    },
    Slots: {
      locator: this.slots,
      title: 'Slots',
    },
    Live: {
      locator: this.liveCasino,
      title: 'Live casino',
    },
    Table: {
      locator: this.tableGames,
      title: 'Casino table games',
    },
  };

  async openGameCategory(gameCategory: Locator): Promise<void> {
    await gameCategory.click();
  }

  async openFooterLangDropdown(): Promise<void> {
    await this.footerLangDropdown.click();
  }

  async getFooterLangDropdownLocales() {
    return await this.page.evaluate(() => {
      const dropdownList = document.querySelector('#footer_lang_dropdown');
      const dropdownButton = document.querySelector('#footer_lang_dropdown-menu');

      const aText = (dropdownButton as HTMLElement).innerText;

      const bText = (dropdownList as HTMLElement).innerText;

      const allText = `${bText}\n ${aText}`;

      return allText.split('\n').map(code => code.trim());
    });
  }

  async clickOnFacebookButton(): Promise<void> {
    await this.facebookButton.click();
  }

  async clickOnInstagramButton(): Promise<void> {
    await this.instagramButton.click();
  }

  async clickOnYoutubeButton(): Promise<void> {
    await this.youtubeButton.click();
  }

  async clickOnTelegramButton(): Promise<void> {
    await this.telegramButton.click();
  }

  async openBankingPage(): Promise<void> {
    await this.bankingLink.click();
  }

  async openCasinoFaqPage(): Promise<void> {
    await this.casinoFaq.click();
  }

  async openCasinoDictionaryPage(): Promise<void> {
    await this.casinoDictionary.click();
  }

  async openCryptoFaqPage(): Promise<void> {
    await this.cryptoFaq.click();
  }

  async openComplaintsPage(): Promise<void> {
    await this.complaints.click();
  }

  async openCookiePolicyPage(): Promise<void> {
    await this.cookiePolicy.click();
  }

  async openTermsAndConditionsPage(): Promise<void> {
    await this.termsAndConditions.click();
  }

  async openPrivacyPolicyPage(): Promise<void> {
    await this.privacyPolicy.click();
  }

  async openResponsibleGamingPage(): Promise<void> {
    await this.responsibleGaming.click();
  }

  async openLegendPage(): Promise<void> {
    await this.legend.click();
  }

  async openBlogPage(): Promise<void> {
    await this.blog.click();
  }

  async openTopCasinoGamesPage(): Promise<void> {
    await this.top.click();
  }

  async openNewOnlineGamesPage(): Promise<void> {
    await this.new.click();
  }

  async openSlotsPage(): Promise<void> {
    await this.slots.click();
  }

  async openTableGamesPage(): Promise<void> {
    await this.tableGames.click();
  }

  async openLiveCasinoPage(): Promise<void> {
    await this.liveCasino.click();
  }

  async openPromotionsPage(): Promise<void> {
    await this.promotions.click();
  }

  async openTournamentsPage(): Promise<void> {
    await this.tournaments.click();
  }

  async openVipPage(): Promise<void> {
    await this.vip.click();
  }

  async openBonusTermsAndConditionsPage(): Promise<void> {
    await this.BonusTermsAndConditions.click();
  }

  async openAffiliatePage(): Promise<void> {
    await this.affiliate.click();
  }

  async openAffiliateTermsAndConditionsPage(): Promise<void> {
    await this.affiliateTermsAndConditions.click();
  }

  async askgamblersAwardsChildrenCount(): Promise<number> {
    return this.page.evaluate(() => {
      const askgamblersAwards = document.querySelector('.ask-footer');

      if (askgamblersAwards) {
        return askgamblersAwards.childElementCount;
      } else {
        throw new Error();
      }
    });
  }

  async getAllPaymentLogos(): Promise<Array<Locator>> {
    return await this.paymentLogos.all();
  }

  async clickOnNextArrow(): Promise<void> {
    await this.nextArrow.click();
  }

  get getAskgamblersAwardsLocator(): Locator {
    return this.askgamblersAwards;
  }

  // Getters for social media buttons
  getFacebookButton(): Locator {
    return this.facebookButton;
  }

  getInstagramButton(): Locator {
    return this.instagramButton;
  }

  getYoutubeButton(): Locator {
    return this.youtubeButton;
  }

  getTelegramButton(): Locator {
    return this.telegramButton;
  }
}

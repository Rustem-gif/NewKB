import { Locator, Page } from '@playwright/test';
import BasePage from '../PO/BasePage/BasePage';
import MainPage from '../PO/MainPage/MainPage';
import VipPage from '../PO/VipPage/VipPage';
import PromoPage from '../PO/PromoPage/PromoPage';
import BankingPage from '../PO/BankingPage/BankingPage';
import BonusStore from '../PO/BonusStore/BonusStore';
import GamePage from '../PO/GamePage/GamePage';
import TournamentPage from '../PO/TournamentPage/TournamentPage';
import FAQPage from '../PO/FAQPage/FaqPage';
import CasinoFaq from '../PO/CasinoFaq/CasinoFaq';
import CryptoFaq from '../PO/CryptoFaq/CryptoFaq';
import SupportPage from '../PO/SupportPage/SupportPage';
import TermsAndConditions from '../PO/TermsAndConditions/TermsAndConditions';
import PrivacyPolicy from '../PO/PrivacyPolicy/PrivacyPolicy';
import ResponsibleGamblingPage from '../PO/ResponsibleGamblingPage/ResponsibleGamblingPage';
import BonusTermsAndConditions from '../PO/BonusTermsAndConditions/BonusTermsAndConditions';
import AffiliateTermsAndConditions from '../PO/AffiliateTermsAndConditions/AffiliateTermsAndConditions';
import CasinoDictionary from '../PO/CasinoDictionary/CasinoDictionary';
import Complaints from '../PO/Complaints/Complaints';
import CookiePolicy from '../PO/CookiePolicy/CookiePolicy';
import LegendPage from '../PO/LegendPage/LegendPage';
import MobileAppPage from '../PO/MobileAppPage/MobileAppPage';
import PasswordRecovery from '../PO/PasswordRecovery/PasswordRecovery';
import ProfilePage from '../PO/PlayersProfile/ProfilePage';
import ReferalProgram from '../PO/ReferalProgram/ReferalProgram';
import FavoriteGames from '../PO/NewGames/FavoriteGames';
import SignInModal from '../PO/MainPage/Component/SignInModal';
import SignUpModal from '../PO/MainPage/Component/SignUpModal';
import { DepModal } from '../Components/DepModal';
import Methods from '../Methods/Methods';
import { MAIN_USER } from '../Data/Users/mainUser';

export default class KingBilly extends BasePage {
  private _mainPage?: MainPage;
  private _vipPage?: VipPage;
  private _promoPage?: PromoPage;
  private _bankingPage?: BankingPage;
  private _bonusStore?: BonusStore;
  private _gamePage?: GamePage;
  private _tournamentPage?: TournamentPage;
  private _faqPage?: FAQPage;
  private _casinoFaq?: CasinoFaq;
  private _cryptoFaq?: CryptoFaq;
  private _supportPage?: SupportPage;
  private _termsAndConditions?: TermsAndConditions;
  private _privacyPolicy?: PrivacyPolicy;
  private _responsibleGamblingPage?: ResponsibleGamblingPage;
  private _bonusTermsAndConditions?: BonusTermsAndConditions;
  private _affiliateTermsAndConditions?: AffiliateTermsAndConditions;
  private _casinoDictionary?: CasinoDictionary;
  private _complaints?: Complaints;
  private _cookiePolicy?: CookiePolicy;
  private _legendPage?: LegendPage;
  private _mobileAppPage?: MobileAppPage;
  private _passwordRecovery?: PasswordRecovery;
  private _profilePage?: ProfilePage;
  private _referalProgram?: ReferalProgram;
  private _favoriteGames?: FavoriteGames;
  private _signInModal?: SignInModal;
  private _signUpModal?: SignUpModal;
  private _depModal?: DepModal;
  private _methods?: Methods;

  public get mainPage(): MainPage {
    if (!this._mainPage) {
      this._mainPage = new MainPage(this.page);
    }
    return this._mainPage;
  }

  public get vipPage(): VipPage {
    if (!this._vipPage) {
      this._vipPage = new VipPage(this.page);
    }
    return this._vipPage;
  }

  public get promoPage(): PromoPage {
    if (!this._promoPage) {
      this._promoPage = new PromoPage(this.page);
    }
    return this._promoPage;
  }

  public get bankingPage(): BankingPage {
    if (!this._bankingPage) {
      this._bankingPage = new BankingPage(this.page);
    }
    return this._bankingPage;
  }

  public get bonusStore(): BonusStore {
    if (!this._bonusStore) {
      this._bonusStore = new BonusStore(this.page);
    }
    return this._bonusStore;
  }

  public get gamePage(): GamePage {
    if (!this._gamePage) {
      this._gamePage = new GamePage(this.page);
    }
    return this._gamePage;
  }

  public get tournamentPage(): TournamentPage {
    if (!this._tournamentPage) {
      this._tournamentPage = new TournamentPage(this.page);
    }
    return this._tournamentPage;
  }

  public get faqPage(): FAQPage {
    if (!this._faqPage) {
      this._faqPage = new FAQPage(this.page);
    }
    return this._faqPage;
  }

  public get casinoFaq(): CasinoFaq {
    if (!this._casinoFaq) {
      this._casinoFaq = new CasinoFaq(this.page);
    }
    return this._casinoFaq;
  }

  public get cryptoFaq(): CryptoFaq {
    if (!this._cryptoFaq) {
      this._cryptoFaq = new CryptoFaq(this.page);
    }
    return this._cryptoFaq;
  }

  public get supportPage(): SupportPage {
    if (!this._supportPage) {
      this._supportPage = new SupportPage(this.page);
    }
    return this._supportPage;
  }

  public get termsAndConditions(): TermsAndConditions {
    if (!this._termsAndConditions) {
      this._termsAndConditions = new TermsAndConditions(this.page);
    }
    return this._termsAndConditions;
  }

  public get privacyPolicy(): PrivacyPolicy {
    if (!this._privacyPolicy) {
      this._privacyPolicy = new PrivacyPolicy(this.page);
    }
    return this._privacyPolicy;
  }

  public get responsibleGamblingPage(): ResponsibleGamblingPage {
    if (!this._responsibleGamblingPage) {
      this._responsibleGamblingPage = new ResponsibleGamblingPage(this.page);
    }
    return this._responsibleGamblingPage;
  }

  public get bonusTermsAndConditions(): BonusTermsAndConditions {
    if (!this._bonusTermsAndConditions) {
      this._bonusTermsAndConditions = new BonusTermsAndConditions(this.page);
    }
    return this._bonusTermsAndConditions;
  }

  public get affiliateTermsAndConditions(): AffiliateTermsAndConditions {
    if (!this._affiliateTermsAndConditions) {
      this._affiliateTermsAndConditions = new AffiliateTermsAndConditions(this.page);
    }
    return this._affiliateTermsAndConditions;
  }

  public get casinoDictionary(): CasinoDictionary {
    if (!this._casinoDictionary) {
      this._casinoDictionary = new CasinoDictionary(this.page);
    }
    return this._casinoDictionary;
  }

  public get complaints(): Complaints {
    if (!this._complaints) {
      this._complaints = new Complaints(this.page);
    }
    return this._complaints;
  }

  public get cookiePolicy(): CookiePolicy {
    if (!this._cookiePolicy) {
      this._cookiePolicy = new CookiePolicy(this.page);
    }
    return this._cookiePolicy;
  }

  public get legendPage(): LegendPage {
    if (!this._legendPage) {
      this._legendPage = new LegendPage(this.page);
    }
    return this._legendPage;
  }

  public get mobileAppPage(): MobileAppPage {
    if (!this._mobileAppPage) {
      this._mobileAppPage = new MobileAppPage(this.page);
    }
    return this._mobileAppPage;
  }

  public get passwordRecovery(): PasswordRecovery {
    if (!this._passwordRecovery) {
      this._passwordRecovery = new PasswordRecovery(this.page);
    }
    return this._passwordRecovery;
  }

  public get profilePage(): ProfilePage {
    if (!this._profilePage) {
      this._profilePage = new ProfilePage(this.page);
    }
    return this._profilePage;
  }

  public get referalProgram(): ReferalProgram {
    if (!this._referalProgram) {
      this._referalProgram = new ReferalProgram(this.page);
    }
    return this._referalProgram;
  }

  public get favoriteGames(): FavoriteGames {
    if (!this._favoriteGames) {
      this._favoriteGames = new FavoriteGames(this.page);
    }
    return this._favoriteGames;
  }

  public get signInModal(): SignInModal {
    if (!this._signInModal) {
      this._signInModal = new SignInModal(this.page);
    }
    return this._signInModal;
  }

  public get signUpModal(): SignUpModal {
    if (!this._signUpModal) {
      this._signUpModal = new SignUpModal(this.page);
    }
    return this._signUpModal;
  }

  public get depModal(): DepModal {
    if (!this._depModal) {
      this._depModal = new DepModal(this.page);
    }
    return this._depModal;
  }

  public get methods(): Methods {
    if (!this._methods) {
      this._methods = new Methods();
    }
    return this._methods;
  }

  public users = MAIN_USER;

  public get intercomApp(): Locator {
    return this.page.locator('.intercom-launcher');
  }

  public get intercomBody(): Locator {
    return this.page
      .locator('iframe[name="intercom-messenger-frame"]')
      .contentFrame()
      .locator('.intercom-home-screen-search-browse-card');
  }
}

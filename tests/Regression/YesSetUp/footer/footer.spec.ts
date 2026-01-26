import test, { BrowserContext, Page, expect } from '@playwright/test';
import KingBilly from '../../../../src/PageManager/KingBilly';
import { LINKS } from '../../../../src/Data/Links/Links';
import { LOCALES } from '../../../../src/Data/Locales/Locales';
import { IGameCategories } from '../../../../src/Interfaces/gameCategories';
import FaqPage from '../../../../src/PO/FAQPage/FaqPage';
import CasinoDictionary from '../../../../src/PO/CasinoDictionary/CasinoDictionary';
import CryptoFaq from '../../../../src/PO/CryptoFaq/CryptoFaq';
import LegendPage from '../../../../src/PO/LegendPage/LegendPage';
import TermsAndConditions from '../../../../src/PO/TermsAndConditions/TermsAndConditions';
import PrivacyPolicy from '../../../../src/PO/PrivacyPolicy/PrivacyPolicy';
import ResponsibleGamblingPage from '../../../../src/PO/ResponsibleGamblingPage/ResponsibleGamblingPage';
import CookiePolicyPage from '../../../../src/PO/CookiePolicy/CookiePolicy';
import PromoPage from '../../../../src/PO/PromoPage/PromoPage';
import TournamentPage from '../../../../src/PO/TournamentPage/TournamentPage';
import VipPage from '../../../../src/PO/VipPage/VipPage';
import BonusTermsAndConditions from '../../../../src/PO/BonusTermsAndConditions/BonusTermsAndConditions';

test.describe('Footer', () => {
  let kingBilly: KingBilly;
  let context: BrowserContext;
  let page: Page;

  test.beforeEach(async ({ browser }) => {
    context = await browser.newContext({
      storageState: './tests/Regression/setup/storageState.json',
    });
    page = await context.newPage();

    kingBilly = new KingBilly(page);

    await test.step('Navigate to main page', async () => {
      await kingBilly.mainPage.navTo(LINKS.Main);
      await kingBilly.mainPage.clickAcceptCookies();
      await kingBilly.mainPage.closeModal();
    });

    // Storage state should already have us logged in, just verify
    await test.step('Verify user is logged in (using storage state)', async () => {
      await kingBilly.mainPage.header.waitForSelector(kingBilly.mainPage.header.getDepositButton);
      await expect(kingBilly.mainPage.header.getDepositButton).toBeVisible();
    });
  });

  test.describe('Check "Social" buttons', () => {
    // Individual tests for each social media button
    test('Check Facebook button href', async () => {
      await test.step('Verify Facebook link', async () => {
        const buttonElement = kingBilly.mainPage.footer.getFacebookButton();
        const href = await buttonElement.getAttribute('href');
        expect(href).toBe(LINKS.facebookLink);

        // Also verify that the target is "_blank" to ensure links open in a new tab
        const target = await buttonElement.getAttribute('target');
        expect(target).toBe('_blank');
      });
    });

    test('Check Instagram button href', async () => {
      await test.step('Verify Instagram link', async () => {
        const buttonElement = kingBilly.mainPage.footer.getInstagramButton();
        const href = await buttonElement.getAttribute('href');
        expect(href).toBe(LINKS.instagramLink);

        // Also verify that the target is "_blank" to ensure links open in a new tab
        const target = await buttonElement.getAttribute('target');
        expect(target).toBe('_blank');
      });
    });

    test('Check Youtube button href', async () => {
      await test.step('Verify Youtube link', async () => {
        const buttonElement = kingBilly.mainPage.footer.getYoutubeButton();
        const href = await buttonElement.getAttribute('href');
        expect(href).toBe(LINKS.youtubeLink);

        // Also verify that the target is "_blank" to ensure links open in a new tab
        const target = await buttonElement.getAttribute('target');
        expect(target).toBe('_blank');
      });
    });

    test('Check Telegram button href', async () => {
      await test.step('Verify Telegram link', async () => {
        const buttonElement = kingBilly.mainPage.footer.getTelegramButton();
        const href = await buttonElement.getAttribute('href');
        expect(href).toBe(LINKS.telegramLink);

        // Also verify that the target is "_blank" to ensure links open in a new tab
        const target = await buttonElement.getAttribute('target');
        expect(target).toBe('_blank');
      });
    });
  });

  test.describe('Check language dropdown', () => {
    test('Check language change dropdown', async () => {
      let listOfLocales: Array<string>;

      test.skip(
        (test.info().project.use.baseURL || '').includes('kingbillywin26'),
        'These tests are skipped on kingbillywin26 domain'
      );

      await test.step('Open lang dropdown', async () => {
        await kingBilly.mainPage.footer.openFooterLangDropdown();
      });

      await test.step('Get text of the lang button and dropdown', async () => {
        listOfLocales = await kingBilly.mainPage.footer.getFooterLangDropdownLocales();
      });

      await test.step('Compare received list to the expected result', async () => {
        expect(listOfLocales).toEqual(LOCALES);
      });
    });
  });

  test.describe('Check "awards" articles', () => {
    test.skip('Check number of the askgamblers awards', async () => {
      const expectedNumberOfAwards = 5;

      await test.step('Check the number of awards', async () => {
        const actualNumeberOfAwards =
          await kingBilly.mainPage.footer.askgamblersAwardsChildrenCount();
        expect(actualNumeberOfAwards).toEqual(expectedNumberOfAwards);
      });

      await test.step('Visual comparison of the awards', async () => {
        // await kingBilly.mainPage.waitForSelector(kingBilly.mainPage.header.getDepositButton)
        await expect(kingBilly.mainPage.footer.getAskgamblersAwardsLocator).toHaveScreenshot({
          maxDiffPixels: 100,
        });
      });
    });
  });

  test.describe('Check "Help" column of the information pages', () => {
    test('Check "Casino FAQ"', async ({ baseURL }) => {
      const faqPage = new FaqPage(page);
      await test.step('Click on the Casino FAQ link', async () => {
        await kingBilly.mainPage.footer.openCasinoFaqPage();
        await expect(faqPage.getQuestionList).toBeVisible();
      });

      await test.step('Check Casino FAQ page url', async () => {
        const currentUrl = await faqPage.getPageUrl();
        expect(currentUrl).toBe(`${baseURL}${LINKS.faqLink}`);
      });
    });

    test('Check "Casino Dictionary"', async ({ baseURL }) => {
      const casinoDictionary = new CasinoDictionary(page);

      await test.step('Click on the Casino Dictionary link', async () => {
        await kingBilly.mainPage.footer.openCasinoDictionaryPage();
        await expect(casinoDictionary.getPageTitle).toBeVisible();
      });

      await test.step('Check Casino Dictionary page url', async () => {
        const currentUrl = await casinoDictionary.getPageUrl();
        expect(currentUrl).toBe(`${baseURL}${LINKS.casinoDictionary}`);
      });
    });

    test('Check "Crypto FAQ"', async ({ baseURL }) => {
      const cryptoFaq = new CryptoFaq(page);
      await test.step('Click on the Crypto FAQ link', async () => {
        await kingBilly.mainPage.footer.openCryptoFaqPage();
        await kingBilly.mainPage.page.waitForTimeout(5000);
        await expect(cryptoFaq.getPageTitle).toBeVisible();
      });

      await test.step('Check Crypto FAQ page url', async () => {
        const currentUrl = await cryptoFaq.getPageUrl();
        expect(currentUrl).toBe(`${baseURL}${LINKS.cryptoFaq}`);
      });
    });
  });

  test.describe('Check "Info" column of the info pages', () => {
    test('Check "The legend" page', async ({ baseURL }) => {
      const theLegendPage = new LegendPage(page);

      await test.step('Click on the Legend link', async () => {
        await kingBilly.mainPage.footer.openLegendPage();
        await expect(theLegendPage.getLegendTitle).toBeVisible();
      });

      await test.step('Check Legend page url', async () => {
        const currentUrl = await theLegendPage.getPageUrl();
        expect(currentUrl).toBe(`${baseURL}${LINKS.Legend}`);
      });
    });

    test('Check "Terms and Conditions" page', async ({ baseURL }) => {
      const termsAndConditions = new TermsAndConditions(page);

      await test.step('Click on the Terms and Conditions link', async () => {
        await kingBilly.mainPage.footer.openTermsAndConditionsPage();
        await expect(termsAndConditions.getDownloadPdfButton).toBeVisible();
      });

      await test.step('Check Terms and Conditions page url', async () => {
        const currentUrl = await termsAndConditions.getPageUrl();
        expect(currentUrl).toBe(`${baseURL}${LINKS.TermsAndConditions}`);
      });
    });

    test('Check "Privacy policy" page', async ({ baseURL }) => {
      const privacyPolicy = new PrivacyPolicy(page);

      await test.step('Click on the Privacy Policy link', async () => {
        await kingBilly.mainPage.footer.openPrivacyPolicyPage();
        await expect(privacyPolicy.PrivacyPolicyTitle).toBeVisible();
      });

      await test.step('Check Privacy Policy page url', async () => {
        const currentUrl = await privacyPolicy.getPageUrl();
        expect(currentUrl).toBe(`${baseURL}${LINKS.privacyPolicy}`);
      });
    });

    test('Check "Responsible gambling" page', async ({ baseURL }) => {
      const responsibleGambling = new ResponsibleGamblingPage(page);

      await test.step('Click on the Responsible gambling link', async () => {
        await kingBilly.mainPage.footer.openResponsibleGamingPage();
        await expect(responsibleGambling.getResponsibleGamblingTitle).toBeVisible();
      });

      await test.step('Check Responsible gambling page url', async () => {
        const currentUrl = await responsibleGambling.getPageUrl();
        expect(currentUrl).toBe(`${baseURL}${LINKS.responsibleGambling}`);
      });
    });

    test('Check "Cookie Policy" page', async ({ baseURL }) => {
      const cookiePolicy = new CookiePolicyPage(page);

      await test.step('Click on the Cookie Policy link', async () => {
        await kingBilly.mainPage.footer.openCookiePolicyPage();
        await expect(cookiePolicy.getCookiePolicyTitle).toBeVisible();
      });

      await test.step('Check Cookie Policy page url', async () => {
        const currentUrl = await cookiePolicy.getPageUrl();
        expect(currentUrl).toBe(`${baseURL}${LINKS.cookiePolicy}`);
      });
    });
  });

  test.describe('Check "Games" column in the footer', () => {
    let gameCategories: IGameCategories;

    test('Click on the "Top" button', async () => {
      gameCategories = kingBilly.mainPage.footer.gameCategories;

      for (let [categoryName, values] of Object.entries(gameCategories)) {
        await test.step(`Check ${categoryName} category`, async () => {
          await kingBilly.mainPage.openGameCategory(values.locator);
          await kingBilly.mainPage.sleep(5000);
          const numberOfGames = await kingBilly.mainPage.getNumberOfGames();
          const categoryTitle = await kingBilly.mainPage.getCategoryTitleName();

          expect.soft(numberOfGames).toBeGreaterThan(0);
          expect.soft(categoryTitle).toMatch(values.title);
        });
      }
    });
  });

  test.describe('Check "Promotions" column in the footer', () => {
    test('Check "Promotions" button', async ({ baseURL }) => {
      const promoPage = new PromoPage(page);

      await test.step('Click on the Promotions button', async () => {
        await kingBilly.mainPage.footer.openPromotionsPage();
        await expect(promoPage.getPromoCard.first()).toBeVisible();
      });

      await test.step('Check Promotions page url', async () => {
        const currentUrl = await promoPage.getPageUrl();
        expect(currentUrl).toBe(`${baseURL}${LINKS.Promo}`);
      });
    });

    test('Check "Tournaments" button', async ({ baseURL }) => {
      const tournamentPage = new TournamentPage(page);

      await test.step('Click on the Tournaments button', async () => {
        await kingBilly.mainPage.footer.openTournamentsPage();
        await expect(tournamentPage.getTournamentItem).toBeVisible();
      });

      await test.step('Check Tournaments page url', async () => {
        const currentUrl = await tournamentPage.getPageUrl();
        expect(currentUrl).toBe(`${baseURL}${LINKS.Tournaments}`);
      });
    });

    test('Check "VIP" button', async ({ baseURL }) => {
      const vipPage = new VipPage(page);

      await test.step('Click on the VIP button', async () => {
        await kingBilly.mainPage.footer.openVipPage();
        await expect(vipPage.getVipPageLogo).toBeVisible();
      });

      await test.step('Check VIP page url', async () => {
        const currentUrl = await vipPage.getPageUrl();
        expect(currentUrl).toBe(`${baseURL}${LINKS.Vip}`);
      });
    });

    test('Check "Bonus Terms and Conditions" button', async ({ baseURL }) => {
      const bonusTermsAndConditions = new BonusTermsAndConditions(page);

      await test.step('Click on the Bonus Terms and Conditions button', async () => {
        await kingBilly.mainPage.footer.openBonusTermsAndConditionsPage();
        await expect(bonusTermsAndConditions.getBonusTermsAndConditionsTitle).toBeVisible();
      });

      await test.step('Check Bonus Terms and Conditions page url', async () => {
        const currentUrl = await bonusTermsAndConditions.getPageUrl();
        expect(currentUrl).toBe(`${baseURL}${LINKS.bonusTermsAndConditions}`);
      });
    });
  });

  test.describe('Check "Partners" column in the footer', () => {
    let affiliatePage: Page;

    test('Check "Affiliate" button', async () => {
      await test.step('Click on the Affiliate button', async () => {
        [affiliatePage] = await Promise.all([
          context.waitForEvent('page'),
          await kingBilly.mainPage.footer.openAffiliatePage(),
        ]);
      });

      await test.step('Check Affiliate page url', () => {
        const currentUrl = affiliatePage.url();
        expect(currentUrl).toBe(`${LINKS.affiliate}`);
      });
    });
  });

  test('Check if deposit methods logos are looped', async () => {
    await test.step('Check number of the deposit logos', async () => {
      const [firstPaymentLogo] = await kingBilly.mainPage.footer.getAllPaymentLogos();

      const numberOfLogos = (await kingBilly.mainPage.footer.getAllPaymentLogos()).length;

      for (let i = 0; i < numberOfLogos; i++) {
        await kingBilly.mainPage.footer.clickOnNextArrow();
        await kingBilly.mainPage.sleep(1000);
      }

      expect(firstPaymentLogo).toHaveAttribute('aria-hidden', 'false');
    });
  });

  test('Blog', async () => {
    let blogPage: Page;

    await test.step('Click on the Blog button', async () => {
      [blogPage] = await Promise.all([
        context.waitForEvent('page'),
        await kingBilly.mainPage.footer.openBlogPage(),
      ]);
    });

    await test.step('Check Blog page url', async () => {
      const currentUrl = blogPage.url();
      expect(currentUrl).toBe(`https://www.kingbillycasino.com${LINKS.blog}`);
    });
  });

  test.afterEach(async () => {
    await context.close();
  });
});

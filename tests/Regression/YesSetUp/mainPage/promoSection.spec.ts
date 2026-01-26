import test, { expect, Locator } from '@playwright/test';
import KingBilly from '../../../../src/PageManager/KingBilly';
import { LINKS } from '../../../../src/Data/Links/Links';

test.describe('Main page', () => {
  test.describe('Promo Section', () => {
    let kingBilly: KingBilly;

    test.beforeEach(async ({ page }) => {
      kingBilly = new KingBilly(page);

      await test.step('Navigate to main page', async () => {
        await kingBilly.mainPage.navTo(LINKS.Main);
        await kingBilly.mainPage.clickAcceptCookies();
        await kingBilly.mainPage.closeModal();
      });

      await test.step('Verify user is logged in (using storage state)', async () => {
        await kingBilly.mainPage.header.waitForSelector(kingBilly.mainPage.header.getDepositButton);
        await expect(kingBilly.mainPage.header.getDepositButton).toBeVisible();
      });
    });

    test('Check Number of promo banners', async () => {
      let promoCards: Array<Locator> = [];
      await test.step('Get promo cards', async () => {
        promoCards = await kingBilly.mainPage.promoSection.getPromoCards();
        expect(promoCards.length).toBeGreaterThanOrEqual(2);
      });
    });

    test('Check "Next" arrow-shaped button in the promo section', async () => {
      await test.step('Click on "Next" arrow-shaped button', async () => {
        await kingBilly.mainPage.promoSection.clickOnSliderButtonTwo();
        console.log(
          await kingBilly.mainPage.promoSection.getSliderButton.getAttribute('currentslide')
        );
      });

      await test.step('Check current slide number', async () => {
        const currentSlide =
          await kingBilly.mainPage.promoSection.getSliderButton.getAttribute('currentslide');

        expect(currentSlide).toBe('1');
      });
    });
  });
});

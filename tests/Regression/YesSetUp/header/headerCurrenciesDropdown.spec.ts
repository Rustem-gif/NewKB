import test, { expect } from '@playwright/test';
import KingBilly from '../../../../src/PageManager/KingBilly';
import { LINKS } from '../../../../src/Data/Links/Links';
import { CURRENCIES } from '../../../../src/Data/Currencies/Currencies';

test.describe('Header', () => {
  let kingBilly: KingBilly;

  test.beforeEach(async ({ page }) => {
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

  test('Check "Currency" dropdown', async () => {
    await test.step('Open currencies dropdown', async () => {
      await kingBilly.mainPage.header.openCurrenciesDropdown();
    });

    await test.step('Check if currencies are displayed', async () => {
      expect(await kingBilly.mainPage.header.getCurrencies()).toEqual(CURRENCIES);
    });
  });
});

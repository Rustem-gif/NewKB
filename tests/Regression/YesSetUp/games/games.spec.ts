import test, { expect } from '@playwright/test';
import KingBilly from '../../../../src/PageManager/KingBilly';
import { LINKS } from '../../../../src/Data/Links/Links';

test.describe('Games', () => {
  let kingBilly: KingBilly;

  test.beforeEach(async ({ page }) => {
    kingBilly = new KingBilly(page);

    await test.step('Navigate to main page', async () => {
      await kingBilly.favoriteGames.navTo(LINKS.newGames);
      await kingBilly.favoriteGames.clickAcceptCookies();
      await kingBilly.favoriteGames.closeModal();
    });

    // Storage state should already have us logged in, just verify
    await test.step('Verify user is logged in (using storage state)', async () => {
      await kingBilly.favoriteGames.header.waitForSelector(
        kingBilly.favoriteGames.header.getDepositButton
      );
      await expect(kingBilly.favoriteGames.header.getDepositButton).toBeVisible();
    });
  });

  test('Check "Favourite" button', async ({ baseURL }) => {
    await test.step('Click on "Favourite" button', async () => {
      await kingBilly.favoriteGames.closeModal();
      await kingBilly.favoriteGames.clickOnFavoriteButton();
    });

    await test.step('Go to favorite games page', async () => {
      await kingBilly.favoriteGames.navTo(LINKS.favoriteGames);
      expect(await kingBilly.favoriteGames.getPageUrl()).toBe(`${baseURL}${LINKS.favoriteGames}`);
    });

    await test.step('Check the chosen game to be visible', async () => {
      await kingBilly.favoriteGames.waitForSelector(kingBilly.favoriteGames.getFavoriteGameItem);
      expect(kingBilly.favoriteGames.getFavoriteGameItem).toBeVisible();
    });
  });

  test.afterEach(async () => {
    await kingBilly.favoriteGames.clickOnFavoritePageGameButton();
  });
});

test.describe('Game page', () => {
  let kingBilly: KingBilly;

  test.beforeEach(async ({ page }) => {
    kingBilly = new KingBilly(page);

    await test.step('Navigate to main page', async () => {
      await kingBilly.gamePage.navTo(LINKS.newGames);
      await kingBilly.gamePage.clickAcceptCookies();
      await kingBilly.gamePage.closeModal();
      // Check and close deposit modal if visible
      await kingBilly.gamePage.closeModal();
    });

    await test.step('Sign in', async () => {
      await kingBilly.gamePage.closeModal();
      // Check and close deposit modal if visible
      await kingBilly.gamePage.closeModal();
    });

    await test.step('Open Fire lightning game', async () => {
      await kingBilly.gamePage.navTo(LINKS.fireLightning);
      await kingBilly.gamePage.triggerSideBarMenu();
    });
  });

  test('Check side bar menu on the game page', async () => {
    await test.step('Trigger sidebar menu', async () => {
      await kingBilly.gamePage.triggerSideBarMenu();
    });

    await test.step('Compare visuals of the sidebar panel', async () => {
      await expect(kingBilly.gamePage.getSideBarPanel).toHaveScreenshot({ maxDiffPixels: 100 });
    });
  });

  test('Check categories in the side menu on the game page', async () => {
    for (let button of kingBilly.gamePage.sideBarButtons) {
      await test.step(`Expect ${await button.evaluate(el => el.textContent)} to be visible`, async () => {
        await expect(button).toBeVisible();
      });
    }
  });

  test('Check game search in the sidemenu', async ({ baseURL }) => {
    await test.step('Click on the search button', async () => {
      await kingBilly.gamePage.clickOnSearchButton();
    });

    await test.step('Fill in the search input', async () => {
      await kingBilly.gamePage.searchForAGame('Elvis Frog true');
    });

    await test.step('Click on the game', async () => {
      await kingBilly.gamePage.clickOnGame();
      await kingBilly.gamePage.clickOnConfirm();
    });

    await test.step('Check link of the game page', async () => {
      await kingBilly.gamePage.sleep(3000);
      expect(await kingBilly.gamePage.getPageUrl()).toBe(`${baseURL}${LINKS.elvisFrog}`);
    });
  });

  test('[Desktop only] Check screen modifications on the game page, 2 games at a time', async () => {
    await test.step('Trigger side bar menu', async () => {
      await kingBilly.gamePage.triggerSideBarMenu();
    });

    await test.step('Open second game window', async () => {
      await kingBilly.gamePage.openSecondGameWindow();
    });

    await test.step('Check number of windows', async () => {
      const numberOfWindows = await kingBilly.gamePage.getGameWindow.count();
      expect(numberOfWindows).toBe(2);
    });
  });

  test('[Desktop only] Check screen modifications on the game page, 4 games at a time', async () => {
    await test.step('Trigger side bar menu', async () => {
      await kingBilly.gamePage.triggerSideBarMenu();
    });

    await test.step('Open second game window', async () => {
      await kingBilly.gamePage.openFourGameWindow();
    });

    await test.step('Check number of windows', async () => {
      const numberOfWindows = await kingBilly.gamePage.getGameWindow.count();
      expect(numberOfWindows).toBe(4);
    });
  });

  test('Check currency change on the game page, choose FUN', async () => {
    await test.step('Trigger side bar menu', async () => {
      await kingBilly.gamePage.page.setViewportSize({ width: 900, height: 1280 });
      await kingBilly.gamePage.triggerSideBarMenu();
    });

    await test.step('Open currency dropdown', async () => {
      await kingBilly.gamePage.openCurrencyDropdown();
    });

    await test.step('Get all available currencies in the game', async () => {
      const availableCurrencies = await kingBilly.gamePage.getGameCurrencyList.innerText();
    });

    await test.step('Select currency', async () => {
      await kingBilly.gamePage.selectIngameCurrency('FUN');
    });

    await test.step('Check currency to be FUN', async () => {
      const ingameCurrency =
        await kingBilly.gamePage.getSidebarCurrencyDropdown.getAttribute('value');
      expect(ingameCurrency).toBe('FUN');
    });
  });

  test('Check Tournament tab in the sidebar', async () => {
    await test.step('Trigger side bar menu', async () => {
      await kingBilly.gamePage.triggerSideBarMenu();
    });

    await test.step('Click on the tournament button', async () => {
      await kingBilly.gamePage.clickOnTournamentButton();
    });

    await test.step('Check tournament tab to be visible', async () => {
      await expect(kingBilly.gamePage.getSidebarTournament).toBeVisible();
    });
  });
});

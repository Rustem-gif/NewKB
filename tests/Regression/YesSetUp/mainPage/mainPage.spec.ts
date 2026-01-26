import test, { expect } from '@playwright/test';
import KingBilly from '../../../../src/PageManager/KingBilly';
import { LINKS } from '../../../../src/Data/Links/Links';
import { providersIE, providersIEFilter } from '../../../../src/Data/Providers/Providers';
import { qase } from 'playwright-qase-reporter';
import { IGameCategories } from '../../../../src/Interfaces/gameCategories';
import { CATEGORY_DROPDOWN_PARAMS } from '../../../../src/Data/Constants/CategoryDropdownsLocators';
import SidebarMenu from '../../../../src/Components/SidebarMenu';
import {
  CATEGORIES_FILTER,
  CATEGORIES_FILTER_AU,
} from '../../../../src/Data/Categories/Categories';

test.describe('Main page', () => {
  let kingBilly: KingBilly;
  let gameCategories: IGameCategories;

  test.beforeEach(async ({ page }) => {
    kingBilly = new KingBilly(page);
    gameCategories = kingBilly.mainPage.gameCategories;

    await test.step('Navigate to main page', async () => {
      await kingBilly.mainPage.navTo(LINKS.Main);
      await kingBilly.mainPage.clickAcceptCookies();
    });

    await test.step('Verify user is logged in and close deposit modal if visible', async () => {
      await kingBilly.mainPage.closeModal();
      await kingBilly.mainPage.header.waitForSelector(kingBilly.mainPage.header.getDepositButton);
      await expect(kingBilly.mainPage.header.getDepositButton).toBeVisible();
    });
  });

  test.skip(`Check "All providers" dropdown`, async () => {
    await test.step('Click on the "All providers" dropdown and check provider names', async () => {
      await kingBilly.mainPage.page.waitForLoadState('domcontentloaded');
      const providers = await kingBilly.mainPage.getAllProviders();
      qase.comment(`${providers}\n\n`);
      expect(providers).toEqual(providersIE);
    });
  });

  for (let i = 1; i < providersIE.length; i++) {
    test(`Check "All providers" filter functionality ${providersIE[i]}`, async () => {
      await test.step('Click on the "All providers" dropdown button', async () => {
        await kingBilly.mainPage.openAllProviders();
      });

      await test.step('Click on a name of one of the providers', async () => {
        const providerName = await kingBilly.mainPage.getProviderName(i);
        console.log(providerName);

        await kingBilly.mainPage.clickOnProvider(i);
      });

      await test.step('Check number of games in the provider category', async () => {
        await kingBilly.mainPage.sleep(5000);
        const numberOfGames = await kingBilly.mainPage.getNumberOfGames();

        expect(numberOfGames).toBeGreaterThan(0);
      });
    });
  }

  test(`Check New category slider functionality`, async () => {
    await test.step(`Check New category`, async () => {
      async function checkIfClickable() {
        const isVisible = await kingBilly.mainPage.gameCategories.New.locator.isVisible();
        console.log(`isVisible: ${isVisible}`);
        if (!isVisible) {
          await kingBilly.mainPage.page.locator('#slider_arrow_right').click();
          await checkIfClickable();
        } else {
          await kingBilly.mainPage.openGameCategory(kingBilly.mainPage.gameCategories.New.locator);
        }
      }
      await checkIfClickable();
      await kingBilly.mainPage.sleep(5000);
      const numberOfGames = await kingBilly.mainPage.getNumberOfGames();
      const categoryTitle = await kingBilly.mainPage.getCategoryTitleName();

      expect.soft(numberOfGames).toBeGreaterThan(0);
      expect.soft(categoryTitle).toMatch(kingBilly.mainPage.gameCategories.New.title);
    });
  });

  test(`Check Top category slider functionality`, async () => {
    await test.step(`Check Top category`, async () => {
      await kingBilly.mainPage.openGameCategory(kingBilly.mainPage.gameCategories.Top.locator);
      await kingBilly.mainPage.sleep(5000);
      const numberOfGames = await kingBilly.mainPage.getNumberOfGames();
      const categoryTitle = await kingBilly.mainPage.getCategoryTitleName();

      expect.soft(numberOfGames).toBeGreaterThan(0);
      expect.soft(categoryTitle).toMatch(kingBilly.mainPage.gameCategories.Top.title);
    });
  });

  test(`Check Popular category slider functionality`, async () => {
    await test.step(`Check Popular category`, async () => {
      await kingBilly.mainPage.openGameCategory(kingBilly.mainPage.gameCategories.Popular.locator);
      await kingBilly.mainPage.sleep(5000);
      const numberOfGames = await kingBilly.mainPage.getNumberOfGames();
      const categoryTitle = await kingBilly.mainPage.getCategoryTitleName();

      expect.soft(numberOfGames).toBeGreaterThan(0);
      expect.soft(categoryTitle).toMatch(kingBilly.mainPage.gameCategories.Popular.title);
    });
  });

  test(`Check Jackpots category slider functionality`, async () => {
    await test.step(`Check Jackpots category`, async () => {
      await kingBilly.mainPage.openGameCategory(kingBilly.mainPage.gameCategories.Jackpots.locator);
      await kingBilly.mainPage.sleep(5000);
      const numberOfGames = await kingBilly.mainPage.getNumberOfGames();
      const categoryTitle = await kingBilly.mainPage.getCategoryTitleName();

      expect.soft(numberOfGames).toBeGreaterThan(0);
      expect.soft(categoryTitle).toMatch(kingBilly.mainPage.gameCategories.Jackpots.title);
    });
  });

  test(`Check Slots category slider functionality`, async () => {
    await test.step(`Check Slots category`, async () => {
      if (!test.info().project.use.baseURL?.includes('win26')) {
        await kingBilly.mainPage.openGameCategory(kingBilly.mainPage.gameCategories.Slots.locator);
        console.log('checking slots');
      } else {
        await kingBilly.mainPage.openGameCategory(kingBilly.mainPage.gameCategories.Pokies.locator);
        console.log('checking pokies');
      }
      await kingBilly.mainPage.sleep(5000);
      const numberOfGames = await kingBilly.mainPage.getNumberOfGames();
      const categoryTitle = await kingBilly.mainPage.getCategoryTitleName();

      expect.soft(numberOfGames).toBeGreaterThan(0);
      if (!test.info().project.use.baseURL?.includes('win26')) {
        expect.soft(categoryTitle).toMatch(kingBilly.mainPage.gameCategories.Slots.title);
      } else {
        expect.soft(categoryTitle).toMatch(kingBilly.mainPage.gameCategories.Pokies.title);
      }
    });
  });

  test(`Check Live category slider functionality`, async () => {
    await test.step(`Check Live category`, async () => {
      await kingBilly.mainPage.openGameCategory(kingBilly.mainPage.gameCategories.Live.locator);
      await kingBilly.mainPage.sleep(5000);
      const numberOfGames = await kingBilly.mainPage.getNumberOfGames();
      const categoryTitle = await kingBilly.mainPage.getCategoryTitleName();

      expect.soft(numberOfGames).toBeGreaterThan(0);
      expect.soft(categoryTitle).toMatch(kingBilly.mainPage.gameCategories.Live.title);
    });
  });

  test(`Check Table category slider functionality`, async () => {
    await test.step(`Check Table category`, async () => {
      await kingBilly.mainPage.openGameCategory(kingBilly.mainPage.gameCategories.Table.locator);
      await kingBilly.mainPage.sleep(5000);
      const numberOfGames = await kingBilly.mainPage.getNumberOfGames();
      const categoryTitle = await kingBilly.mainPage.getCategoryTitleName();

      expect.soft(numberOfGames).toBeGreaterThan(0);
      expect.soft(categoryTitle).toMatch(kingBilly.mainPage.gameCategories.Table.title);
    });
  });

  //3 tests
  for (const [categoryName, params] of Object.entries(CATEGORY_DROPDOWN_PARAMS) as [
    string,
    {
      locator: string;
      expectedResult: Array<string>;
    },
  ][]) {
    test(`Check ${categoryName} Subcategories`, async () => {
      await test.step(`Open ${categoryName} dropdown`, async () => {
        await kingBilly.mainPage.clickOnCategoryDropdown(params.locator);

        const subCategories = await kingBilly.mainPage.categoryDropdown.getSubcategories();

        await kingBilly.mainPage.sleep(300);

        expect(subCategories).toEqual(params.expectedResult);
      });
    });
  }

  for (const [categoryName, params] of Object.entries(CATEGORY_DROPDOWN_PARAMS)) {
    const arrayLength = params.expectedResult.length;

    for (let i = 0; i < arrayLength; i++) {
      let subcategory = params.expectedResult[i];

      test(`Check ${subcategory} of ${categoryName}`, async () => {
        await test.step('Open ${subcategory} dropdown', async () => {
          await kingBilly.mainPage.clickOnCategoryDropdown(params.locator);
        });

        await test.step(`Click on ${subcategory}`, async () => {
          await kingBilly.mainPage.categoryDropdown.selectSubcategory(subcategory);
        });

        await test.step(`Check games of ${subcategory}`, async () => {
          await kingBilly.mainPage.page.waitForSelector(kingBilly.mainPage.getGameItemSelector);

          const numberOfGames = await kingBilly.mainPage.getNumberOfGames();

          expect(numberOfGames).toBeGreaterThan(0);
        });
      });
    }
  }

  test('Check show more button, Top games', async () => {
    const topGamesCategoryTitle = 'Top casino games';

    await test.step('Click on Top games show more button', async () => {
      await kingBilly.mainPage.clickOnTopShowMoreButton();
    });

    await test.step('Check Top games category title', async () => {
      const categoryTitle = await kingBilly.mainPage.getCategoryTitleName();
      expect.soft(categoryTitle).toMatch(topGamesCategoryTitle);
    });

    await test.step('Check number of games in the Top Category', async () => {
      await kingBilly.mainPage.page.waitForSelector(kingBilly.mainPage.getGameItemSelector);
      const numberOfGames = await kingBilly.mainPage.getNumberOfGames();
      expect.soft(numberOfGames).toBeGreaterThan(0);
    });
  });

  test('Check show more button, New games', async () => {
    const newGamesCategoryTitle = 'New online games';

    await test.step('Click on New games show more button', async () => {
      await kingBilly.mainPage.clickOnNewShowMoreButton();
    });

    await test.step('Check New games category title', async () => {
      const categoryTitle = await kingBilly.mainPage.getCategoryTitleName();
      expect.soft(categoryTitle).toMatch(newGamesCategoryTitle);
    });

    await test.step('Check number of games in the New Category', async () => {
      await kingBilly.mainPage.page.waitForSelector(kingBilly.mainPage.getGameItemSelector);
      const numberOfGames = await kingBilly.mainPage.getNumberOfGames();
      expect.soft(numberOfGames).toBeGreaterThan(0);
    });
  });

  test('Check the show more button, Promo', async ({ baseURL }) => {
    await test.step('Click on Promo show more button', async () => {
      await kingBilly.mainPage.clickOnPromoShowMoreButton();
    });

    await test.step('Check Promo page url', async () => {
      const promoPageUrl = await kingBilly.mainPage.getPageUrl();
      expect.soft(promoPageUrl).toEqual(`${baseURL}${LINKS.Promo}`);
      console.log(promoPageUrl);
    });
  });

  test('Check "Scroll up" button', async () => {
    await test.step('Scroll down to the bottom of the page', async () => {
      await kingBilly.mainPage.sleep(3000);
      await kingBilly.mainPage.scrollTo(kingBilly.mainPage.getPromoShowMoreButton);
    });

    await test.step('Check if scroll up button is visible', async () => {
      const scrollUpButton = await kingBilly.mainPage.scrollUpButton.isVisible();
      expect(scrollUpButton).toBeTruthy();
    });

    await test.step('Click on scroll up button', async () => {
      await kingBilly.mainPage.scrollUpButton.click();
    });

    await test.step('Check if the page has scrolled up', async () => {
      await kingBilly.mainPage.sleep(3000);
      const scrollPosition = await kingBilly.mainPage.page.evaluate(() => window.scrollY);

      expect(scrollPosition).toEqual(0);
    });
  });

  test('Check "Get bonus" button on a promo banner', async () => {
    await kingBilly.mainPage.page.setViewportSize({ width: 1890, height: 720 });
    await kingBilly.mainPage.clickOnGetItButton();
    const pageURL = await kingBilly.mainPage.getPageUrl();
    await kingBilly.mainPage.page.waitForTimeout(5000);
    console.log(pageURL);

    if (pageURL.includes('/promotions/royal-month')) {
      await kingBilly.mainPage.page.goBack();
    } else if (pageURL.includes('/bonus-store')) {
      await kingBilly.mainPage.page.goBack();
    } else {
      expect.soft(kingBilly.mainPage.getPromoModal).toBeVisible();
    }
  });

  test('Check Burger menu functionality', async () => {
    let sidebar: SidebarMenu;
    await test.step('Click on the burger menu', async () => {
      sidebar = await kingBilly.mainPage.clickOnSidebarButton();
    });

    await test.step('Check user info block to be visible', async () => {
      await sidebar.page.waitForTimeout(5000);
      await expect.soft(sidebar.getUserInfoBlock).toBeVisible();
    });

    await test.step('Check compoints block to be visible', async () => {
      await expect.soft(sidebar.getCompointsBlock).toBeVisible();
    });

    await test.step('Check promo button to be visible', async () => {
      await expect.soft(sidebar.getPromotionsTab).toBeVisible();
    });

    await test.step('Check tournaments button to be visible', async () => {
      await expect(sidebar.getTournamentsTab).toBeVisible();
    });

    await test.step('Check VIP button to be visible', async () => {
      await expect.soft(sidebar.getVipTab).toBeVisible();
    });

    await test.step('Check legend button to be visible', async () => {
      await expect.soft(sidebar.getLegendTab).toBeVisible();
    });

    await test.step('Check app button to be visible', async () => {
      await expect.soft(sidebar.getAppBtn).toBeVisible();
    });

    await test.step('Visual test of the sidebar', async () => {
      await sidebar.page.setViewportSize({ width: 1010, height: 870 });
      await expect.soft(sidebar.getSidebarMenu).toHaveScreenshot({ maxDiffPixels: 100 });
    });
  });

  test.skip('Check game filter provider dropdown', async () => {
    await test.step('Click on filter button', async () => {
      await kingBilly.mainPage.header.clickFilterButton();
    });

    await test.step('Open provider dropdown', async () => {
      await kingBilly.mainPage.header.clickFilterProviderButton();
      await kingBilly.mainPage.sleep(1000);
    });

    await test.step('Check provider names', async () => {
      const providersArray = await kingBilly.mainPage.header.getListOfFilterProviders();

      expect(providersArray).toEqual(providersIEFilter);
    });
  });

  test('Check game filter category dropdown', async () => {
    await test.step('Click on filter button', async () => {
      await kingBilly.mainPage.header.clickFilterButton();
    });

    await test.step('Open category dropdown', async () => {
      await kingBilly.mainPage.header.clickFilterCategoriesButton();
      await kingBilly.mainPage.sleep(1000);
    });

    await test.step('Check category names', async () => {
      const categoriesArray = await kingBilly.mainPage.header.getListOfFilterCategories();

      if ((test.info().project.use.baseURL || '').includes('kingbillywin26')) {
        expect(categoriesArray).toEqual(CATEGORIES_FILTER_AU);
      } else {
        expect(categoriesArray).toEqual(CATEGORIES_FILTER);
      }
    });
  });
});

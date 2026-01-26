import KingBilly from '../../../../src/PageManager/KingBilly';
import { LINKS } from '../../../../src/Data/Links/Links';
import { test, expect } from '@playwright/test';
import { USERS, VIP_USERS } from '../../../../src/Data/Users/users';
import { EU_EXPECTED_RESULTS_BONUS_STORE } from '../../../../src/Data/bonusStoreExpectedResults/bonusStoreExpectedEU';

function createComparisonMatcher(bonuses: any[]): any {
  return expect.arrayContaining(
    bonuses.map((bonus: any) =>
      expect.objectContaining({
        ...(bonus.title && { title: bonus.title }),
        ...(bonus.price !== undefined && { price: bonus.price }),
        ...(bonus.fiatTitle && { fiatTitle: bonus.fiatTitle }),
        ...(bonus.fiatPrice && { fiatPrice: bonus.fiatPrice }),
      })
    )
  );
}

test.describe('Bonus Store - EU', () => {
  let kingBilly: KingBilly;

  test.beforeEach(async ({ page }, testInfo) => {
    const baseURL = testInfo.project.use.baseURL;
    test.skip(baseURL === 'https://www.kingbillywin25.com', 'These tests are for EU domains only');

    kingBilly = new KingBilly(page);
    await kingBilly.bonusStore.navTo(LINKS.bonusStore);
    await kingBilly.bonusStore.clickAcceptCookies();
  });

  test('Verify Sign in button availability', async () => {
    await kingBilly.bonusStore.header.signInButton.click();
    await expect(kingBilly.signInModal.getEmailInput).toBeVisible();
  });

  test('Verify Sign up button availability', async () => {
    await kingBilly.bonusStore.header.createAccountButton.click();
    await expect(kingBilly.signUpModal.getEmailInput).toBeVisible();
  });

  test('Verify bonus availability for New Citizen user real money', async () => {
    await kingBilly.bonusStore.header.signInButton.click();
    await kingBilly.signInModal.fillEmail(USERS.citizenUser.email);
    await kingBilly.signInModal.fillPassword(USERS.citizenUser.password);
    await kingBilly.signInModal.clickSignIn();
    await kingBilly.bonusStore.realMoneyButton.click();

    await kingBilly.bonusStore.bonusCardReal.first().waitFor({ state: 'visible' });
    const bonusInfo = await kingBilly.bonusStore.gatherBonusInfo('realMoney');
    expect(bonusInfo).toEqual(
      createComparisonMatcher(EU_EXPECTED_RESULTS_BONUS_STORE.CITIZEN.REAL)
    );
  });

  test('Verify bonus availability for New Citizen user kings coins', async () => {
    await kingBilly.bonusStore.header.signInButton.click();
    await kingBilly.signInModal.fillEmail(USERS.citizenUser.email);
    await kingBilly.signInModal.fillPassword(USERS.citizenUser.password);
    await kingBilly.signInModal.clickSignIn();
    await kingBilly.bonusStore.kingsCoinsButton.click();

    await kingBilly.bonusStore.bonusCardKingsCoins.first().scrollIntoViewIfNeeded();
    const bonusInfo = await kingBilly.bonusStore.gatherBonusInfo('kingsCoins');
    expect(bonusInfo).toEqual(
      createComparisonMatcher(EU_EXPECTED_RESULTS_BONUS_STORE.CITIZEN.KINGS_COINS)
    );
  });

  test('Verify bonus availability for King user real money', async () => {
    await kingBilly.bonusStore.header.signInButton.click();
    await kingBilly.signInModal.fillEmail(VIP_USERS.king.email);
    await kingBilly.signInModal.fillPassword(VIP_USERS.king.password);
    await kingBilly.signInModal.clickSignIn();
    await kingBilly.bonusStore.realMoneyButton.click();

    await kingBilly.bonusStore.bonusCardReal.first().waitFor({ state: 'visible' });
    const bonusInfo = await kingBilly.bonusStore.gatherBonusInfo('realMoney');

    expect(bonusInfo).toEqual(createComparisonMatcher(EU_EXPECTED_RESULTS_BONUS_STORE.KING.REAL));
  });

  test('Verify bonus availability for King user kings coins', async () => {
    await kingBilly.bonusStore.header.signInButton.click();
    await kingBilly.signInModal.fillEmail(VIP_USERS.king.email);
    await kingBilly.signInModal.fillPassword(VIP_USERS.king.password);
    await kingBilly.signInModal.clickSignIn();
    await kingBilly.bonusStore.kingsCoinsButton.click();
    await kingBilly.bonusStore.bonusCardKingsCoins.first().waitFor({ state: 'visible' });
    const bonusInfo = await kingBilly.bonusStore.gatherBonusInfo('kingsCoins');
    expect(bonusInfo).toEqual(
      createComparisonMatcher(EU_EXPECTED_RESULTS_BONUS_STORE.KING.KINGS_COINS)
    );
  });

  test('Verify bonus availability for Duke user real money', async () => {
    await kingBilly.bonusStore.header.signInButton.click();
    await kingBilly.signInModal.fillEmail(VIP_USERS.duke.email);
    await kingBilly.signInModal.fillPassword(VIP_USERS.duke.password);
    await kingBilly.signInModal.clickSignIn();
    await kingBilly.bonusStore.realMoneyButton.click();
    await kingBilly.bonusStore.bonusCardReal.first().waitFor({ state: 'visible' });
    const bonusInfo = await kingBilly.bonusStore.gatherBonusInfo('realMoney');
    expect(bonusInfo).toEqual(createComparisonMatcher(EU_EXPECTED_RESULTS_BONUS_STORE.DUKE.REAL));
  });

  test('Verify bonus availability for Duke user kings coins', async () => {
    await kingBilly.bonusStore.header.signInButton.click();
    await kingBilly.signInModal.fillEmail(VIP_USERS.duke.email);
    await kingBilly.signInModal.fillPassword(VIP_USERS.duke.password);
    await kingBilly.signInModal.clickSignIn();
    await kingBilly.bonusStore.kingsCoinsButton.click();
    await kingBilly.bonusStore.bonusCardKingsCoins.first().waitFor({ state: 'visible' });
    const bonusInfo = await kingBilly.bonusStore.gatherBonusInfo('kingsCoins');
    expect(bonusInfo).toEqual(
      createComparisonMatcher(EU_EXPECTED_RESULTS_BONUS_STORE.DUKE.KINGS_COINS)
    );
  });

  test('Verify bonus availability for Baronet user real money', async () => {
    await kingBilly.bonusStore.header.signInButton.click();
    await kingBilly.signInModal.fillEmail(VIP_USERS.baronet.email);
    await kingBilly.signInModal.fillPassword(VIP_USERS.baronet.password);
    await kingBilly.signInModal.clickSignIn();
    await kingBilly.bonusStore.realMoneyButton.click();
    await kingBilly.bonusStore.bonusCardReal.first().waitFor({ state: 'visible' });
    const bonusInfo = await kingBilly.bonusStore.gatherBonusInfo('realMoney');
    expect(bonusInfo).toEqual(
      createComparisonMatcher(EU_EXPECTED_RESULTS_BONUS_STORE.BARONET.REAL)
    );
  });

  test('Verify bonus availability for Baronet user kings coins', async () => {
    await kingBilly.bonusStore.header.signInButton.click();
    await kingBilly.signInModal.fillEmail(VIP_USERS.baronet.email);
    await kingBilly.signInModal.fillPassword(VIP_USERS.baronet.password);
    await kingBilly.signInModal.clickSignIn();
    await kingBilly.bonusStore.kingsCoinsButton.click();
    await kingBilly.bonusStore.bonusCardKingsCoins.first().waitFor({ state: 'visible' });
    const bonusInfo = await kingBilly.bonusStore.gatherBonusInfo('kingsCoins');
    expect(bonusInfo).toEqual(
      createComparisonMatcher(EU_EXPECTED_RESULTS_BONUS_STORE.BARONET.KINGS_COINS)
    );
  });

  test('Verify bonus availability for Knight user real money', async () => {
    await kingBilly.bonusStore.header.signInButton.click();
    await kingBilly.signInModal.fillEmail(VIP_USERS.knight.email);
    await kingBilly.signInModal.fillPassword(VIP_USERS.knight.password);
    await kingBilly.signInModal.clickSignIn();
    await kingBilly.bonusStore.realMoneyButton.click();
    await kingBilly.bonusStore.bonusCardReal.first().waitFor({ state: 'visible' });
    const bonusInfo = await kingBilly.bonusStore.gatherBonusInfo('realMoney');
    expect(bonusInfo).toEqual(createComparisonMatcher(EU_EXPECTED_RESULTS_BONUS_STORE.KNIGHT.REAL));
  });

  test('Verify bonus availability for Knight user kings coins', async () => {
    await kingBilly.bonusStore.header.signInButton.click();
    await kingBilly.signInModal.fillEmail(VIP_USERS.knight.email);
    await kingBilly.signInModal.fillPassword(VIP_USERS.knight.password);
    await kingBilly.signInModal.clickSignIn();
    await kingBilly.bonusStore.kingsCoinsButton.click();
    await kingBilly.bonusStore.bonusCardKingsCoins.first().waitFor({ state: 'visible' });
    const bonusInfo = await kingBilly.bonusStore.gatherBonusInfo('kingsCoins');
    expect(bonusInfo).toEqual(
      createComparisonMatcher(EU_EXPECTED_RESULTS_BONUS_STORE.KNIGHT.KINGS_COINS)
    );
  });

  test('Verify Bonus Store filtering for Citizen user Kings coins', async () => {
    await kingBilly.bonusStore.header.signInButton.click();
    await kingBilly.signInModal.fillEmail(USERS.citizenUser.email);
    await kingBilly.signInModal.fillPassword(USERS.citizenUser.password);
    await kingBilly.signInModal.clickSignIn();
    await kingBilly.bonusStore.kingsCoinsButton.click();

    await test.step('Check cash bonuses', async () => {
      await kingBilly.bonusStore.cashTab.click();
      const cashBonuses = EU_EXPECTED_RESULTS_BONUS_STORE.CITIZEN.KINGS_COINS.filter(
        bonus => bonus.type === 'cash'
      );
      const receivedBonuses = await kingBilly.bonusStore.gatherBonusInfo('kingsCoins');

      expect.soft(receivedBonuses).toEqual(createComparisonMatcher(cashBonuses));
    });

    await test.step('Check wheel bonuses', async () => {
      await kingBilly.bonusStore.wheelTab.click();
      const wheelBonuses = EU_EXPECTED_RESULTS_BONUS_STORE.CITIZEN.KINGS_COINS.filter(
        bonus => bonus.type === 'wheel'
      );
      const receivedBonuses = await kingBilly.bonusStore.gatherBonusInfo('kingsCoins');
      expect.soft(receivedBonuses).toEqual(createComparisonMatcher(wheelBonuses));
    });

    await test.step('Check fs bonuses', async () => {
      await kingBilly.bonusStore.fsTab.click();
      const fsBonuses = EU_EXPECTED_RESULTS_BONUS_STORE.CITIZEN.KINGS_COINS.filter(
        bonus => bonus.type === 'fs'
      );
      const receivedBonuses = await kingBilly.bonusStore.gatherBonusInfo('kingsCoins');
      expect.soft(receivedBonuses).toEqual(createComparisonMatcher(fsBonuses));
    });
  });

  test('Verify Bonus Store filtering for Citizen user real money', async () => {
    await kingBilly.bonusStore.header.signInButton.click();
    await kingBilly.signInModal.fillEmail(USERS.citizenUser.email);
    await kingBilly.signInModal.fillPassword(USERS.citizenUser.password);
    await kingBilly.signInModal.clickSignIn();
    await kingBilly.bonusStore.realMoneyButton.click();

    await test.step('Check fs bonuses', async () => {
      await kingBilly.bonusStore.fsTab.click();
      const fsBonuses = EU_EXPECTED_RESULTS_BONUS_STORE.CITIZEN.REAL.filter(
        bonus => bonus.type === 'fs'
      );
      const receivedBonuses = await kingBilly.bonusStore.gatherBonusInfo('realMoney');
      expect.soft(receivedBonuses).toEqual(createComparisonMatcher(fsBonuses));
    });

    await test.step('Check wheel bonuses', async () => {
      await kingBilly.bonusStore.wheelTab.click();
      const wheelBonuses = EU_EXPECTED_RESULTS_BONUS_STORE.CITIZEN.REAL.filter(
        bonus => bonus.type === 'wheel'
      );
      const receivedBonuses = await kingBilly.bonusStore.gatherBonusInfo('realMoney');
      expect.soft(receivedBonuses).toEqual(createComparisonMatcher(wheelBonuses));
    });

    await test.step('Check tips bonuses', async () => {
      await kingBilly.bonusStore.tipsTab.click();
      const tipsBonuses = EU_EXPECTED_RESULTS_BONUS_STORE.CITIZEN.REAL.filter(
        bonus => bonus.type === 'tips'
      );
      const receivedBonuses = await kingBilly.bonusStore.gatherBonusInfo('realMoney');
      expect.soft(receivedBonuses).toEqual(createComparisonMatcher(tipsBonuses));
    });
  });

  test('Verify Bonus Store filtering for Baronet user Kings coins', async () => {
    await kingBilly.bonusStore.header.signInButton.click();
    await kingBilly.signInModal.fillEmail(VIP_USERS.baronet.email);
    await kingBilly.signInModal.fillPassword(VIP_USERS.baronet.password);
    await kingBilly.signInModal.clickSignIn();
    await kingBilly.bonusStore.kingsCoinsButton.click();

    await test.step('Check cash bonuses', async () => {
      await kingBilly.bonusStore.cashTab.click();
      const cashBonuses = EU_EXPECTED_RESULTS_BONUS_STORE.BARONET.KINGS_COINS.filter(
        bonus => bonus.type === 'cash'
      );
      const receivedBonuses = await kingBilly.bonusStore.gatherBonusInfo('kingsCoins');
      expect.soft(receivedBonuses).toEqual(createComparisonMatcher(cashBonuses));
    });

    await test.step('Check wheel bonuses', async () => {
      await kingBilly.bonusStore.wheelTab.click();
      const wheelBonuses = EU_EXPECTED_RESULTS_BONUS_STORE.BARONET.KINGS_COINS.filter(
        bonus => bonus.type === 'wheel'
      );
      const receivedBonuses = await kingBilly.bonusStore.gatherBonusInfo('kingsCoins');
      expect.soft(receivedBonuses).toEqual(createComparisonMatcher(wheelBonuses));
    });

    await test.step('Check fs bonuses', async () => {
      await kingBilly.bonusStore.fsTab.click();
      const fsBonuses = EU_EXPECTED_RESULTS_BONUS_STORE.BARONET.KINGS_COINS.filter(
        bonus => bonus.type === 'fs'
      );
      const receivedBonuses = await kingBilly.bonusStore.gatherBonusInfo('kingsCoins');
      expect.soft(receivedBonuses).toEqual(createComparisonMatcher(fsBonuses));
    });
  });

  test('Verify Bonus Store filtering for Baronet user real money', async () => {
    await kingBilly.bonusStore.header.signInButton.click();
    await kingBilly.signInModal.fillEmail(VIP_USERS.baronet.email);
    await kingBilly.signInModal.fillPassword(VIP_USERS.baronet.password);
    await kingBilly.signInModal.clickSignIn();
    await kingBilly.bonusStore.realMoneyButton.click();

    await test.step('Check fs bonuses', async () => {
      await kingBilly.bonusStore.fsTab.click();
      const fsBonuses = EU_EXPECTED_RESULTS_BONUS_STORE.BARONET.REAL.filter(
        bonus => bonus.type === 'fs'
      );
      const receivedBonuses = await kingBilly.bonusStore.gatherBonusInfo('realMoney');
      expect.soft(receivedBonuses).toEqual(createComparisonMatcher(fsBonuses));
    });

    await test.step('Check wheel bonuses', async () => {
      await kingBilly.bonusStore.wheelTab.click();
      const wheelBonuses = EU_EXPECTED_RESULTS_BONUS_STORE.BARONET.REAL.filter(
        bonus => bonus.type === 'wheel'
      );
      const receivedBonuses = await kingBilly.bonusStore.gatherBonusInfo('realMoney');
      expect.soft(receivedBonuses).toEqual(createComparisonMatcher(wheelBonuses));
    });

    await test.step('Check tips bonuses', async () => {
      await kingBilly.bonusStore.tipsTab.click();
      const tipsBonuses = EU_EXPECTED_RESULTS_BONUS_STORE.BARONET.REAL.filter(
        bonus => bonus.type === 'tips'
      );
      const receivedBonuses = await kingBilly.bonusStore.gatherBonusInfo('realMoney');
      expect.soft(receivedBonuses).toEqual(createComparisonMatcher(tipsBonuses));
    });
  });

  test('Verify Bonus Store filtering for Duke user Kings coins', async () => {
    await kingBilly.bonusStore.header.signInButton.click();
    await kingBilly.signInModal.fillEmail(VIP_USERS.duke.email);
    await kingBilly.signInModal.fillPassword(VIP_USERS.duke.password);
    await kingBilly.signInModal.clickSignIn();
    await kingBilly.bonusStore.kingsCoinsButton.click();

    await test.step('Check cash bonuses', async () => {
      await kingBilly.bonusStore.cashTab.click();
      const cashBonuses = EU_EXPECTED_RESULTS_BONUS_STORE.DUKE.KINGS_COINS.filter(
        bonus => bonus.type === 'cash'
      );
      const receivedBonuses = await kingBilly.bonusStore.gatherBonusInfo('kingsCoins');
      expect.soft(receivedBonuses).toEqual(createComparisonMatcher(cashBonuses));
    });

    await test.step('Check wheel bonuses', async () => {
      await kingBilly.bonusStore.wheelTab.click();
      const wheelBonuses = EU_EXPECTED_RESULTS_BONUS_STORE.DUKE.KINGS_COINS.filter(
        bonus => bonus.type === 'wheel'
      );
      const receivedBonuses = await kingBilly.bonusStore.gatherBonusInfo('kingsCoins');
      expect.soft(receivedBonuses).toEqual(createComparisonMatcher(wheelBonuses));
    });

    await test.step('Check fs bonuses', async () => {
      await kingBilly.bonusStore.fsTab.click();
      const fsBonuses = EU_EXPECTED_RESULTS_BONUS_STORE.DUKE.KINGS_COINS.filter(
        bonus => bonus.type === 'fs'
      );
      const receivedBonuses = await kingBilly.bonusStore.gatherBonusInfo('kingsCoins');
      expect.soft(receivedBonuses).toEqual(createComparisonMatcher(fsBonuses));
    });
  });

  test('Verify Bonus Store filtering for Duke user real money', async () => {
    await kingBilly.bonusStore.header.signInButton.click();
    await kingBilly.signInModal.fillEmail(VIP_USERS.duke.email);
    await kingBilly.signInModal.fillPassword(VIP_USERS.duke.password);
    await kingBilly.signInModal.clickSignIn();
    await kingBilly.bonusStore.realMoneyButton.click();

    await test.step('Check fs bonuses', async () => {
      await kingBilly.bonusStore.fsTab.click();
      const fsBonuses = EU_EXPECTED_RESULTS_BONUS_STORE.DUKE.REAL.filter(
        bonus => bonus.type === 'fs'
      );
      const receivedBonuses = await kingBilly.bonusStore.gatherBonusInfo('realMoney');
      expect.soft(receivedBonuses).toEqual(createComparisonMatcher(fsBonuses));
    });

    await test.step('Check wheel bonuses', async () => {
      await kingBilly.bonusStore.wheelTab.click();
      const wheelBonuses = EU_EXPECTED_RESULTS_BONUS_STORE.DUKE.REAL.filter(
        bonus => bonus.type === 'wheel'
      );
      const receivedBonuses = await kingBilly.bonusStore.gatherBonusInfo('realMoney');
      expect.soft(receivedBonuses).toEqual(createComparisonMatcher(wheelBonuses));
    });

    await test.step('Check tips bonuses', async () => {
      await kingBilly.bonusStore.tipsTab.click();
      const tipsBonuses = EU_EXPECTED_RESULTS_BONUS_STORE.DUKE.REAL.filter(
        bonus => bonus.type === 'tips'
      );
      const receivedBonuses = await kingBilly.bonusStore.gatherBonusInfo('realMoney');
      expect.soft(receivedBonuses).toEqual(createComparisonMatcher(tipsBonuses));
    });
  });

  test('Verify Bonus Store filtering for King user Kings coins', async () => {
    await kingBilly.bonusStore.header.signInButton.click();
    await kingBilly.signInModal.fillEmail(VIP_USERS.king.email);
    await kingBilly.signInModal.fillPassword(VIP_USERS.king.password);
    await kingBilly.signInModal.clickSignIn();
    await kingBilly.bonusStore.kingsCoinsButton.click();

    await test.step('Check cash bonuses', async () => {
      await kingBilly.bonusStore.cashTab.click();
      const cashBonuses = EU_EXPECTED_RESULTS_BONUS_STORE.KING.KINGS_COINS.filter(
        bonus => bonus.type === 'cash'
      );
      const receivedBonuses = await kingBilly.bonusStore.gatherBonusInfo('kingsCoins');
      expect.soft(receivedBonuses).toEqual(createComparisonMatcher(cashBonuses));
    });

    await test.step('Check wheel bonuses', async () => {
      await kingBilly.bonusStore.wheelTab.click();
      const wheelBonuses = EU_EXPECTED_RESULTS_BONUS_STORE.KING.KINGS_COINS.filter(
        bonus => bonus.type === 'wheel'
      );
      const receivedBonuses = await kingBilly.bonusStore.gatherBonusInfo('kingsCoins');
      expect.soft(receivedBonuses).toEqual(createComparisonMatcher(wheelBonuses));
    });

    await test.step('Check fs bonuses', async () => {
      await kingBilly.bonusStore.fsTab.click();
      const fsBonuses = EU_EXPECTED_RESULTS_BONUS_STORE.KING.KINGS_COINS.filter(
        bonus => bonus.type === 'fs'
      );
      const receivedBonuses = await kingBilly.bonusStore.gatherBonusInfo('kingsCoins');
      expect.soft(receivedBonuses).toEqual(createComparisonMatcher(fsBonuses));
    });
  });

  test('Verify Bonus Store filtering for King user real money', async () => {
    await kingBilly.bonusStore.header.signInButton.click();
    await kingBilly.signInModal.fillEmail(VIP_USERS.king.email);
    await kingBilly.signInModal.fillPassword(VIP_USERS.king.password);
    await kingBilly.signInModal.clickSignIn();
    await kingBilly.bonusStore.realMoneyButton.click();

    await test.step('Check fs bonuses', async () => {
      await kingBilly.bonusStore.fsTab.click();
      const fsBonuses = EU_EXPECTED_RESULTS_BONUS_STORE.KING.REAL.filter(
        bonus => bonus.type === 'fs'
      );
      const receivedBonuses = await kingBilly.bonusStore.gatherBonusInfo('realMoney');
      expect.soft(receivedBonuses).toEqual(createComparisonMatcher(fsBonuses));
    });

    await test.step('Check wheel bonuses', async () => {
      await kingBilly.bonusStore.wheelTab.click();
      const wheelBonuses = EU_EXPECTED_RESULTS_BONUS_STORE.KING.REAL.filter(
        bonus => bonus.type === 'wheel'
      );
      const receivedBonuses = await kingBilly.bonusStore.gatherBonusInfo('realMoney');
      expect.soft(receivedBonuses).toEqual(createComparisonMatcher(wheelBonuses));
    });

    await test.step('Check tips bonuses', async () => {
      await kingBilly.bonusStore.tipsTab.click();
      const tipsBonuses = EU_EXPECTED_RESULTS_BONUS_STORE.KING.REAL.filter(
        bonus => bonus.type === 'tips'
      );
      const receivedBonuses = await kingBilly.bonusStore.gatherBonusInfo('realMoney');
      expect.soft(receivedBonuses).toEqual(createComparisonMatcher(tipsBonuses));
    });
  });

  test('Verify Bonus Store filtering for King user Knight coins', async () => {
    await kingBilly.bonusStore.header.signInButton.click();
    await kingBilly.signInModal.fillEmail(VIP_USERS.knight.email);
    await kingBilly.signInModal.fillPassword(VIP_USERS.knight.password);
    await kingBilly.signInModal.clickSignIn();
    await kingBilly.bonusStore.kingsCoinsButton.click();

    await test.step('Check cash bonuses', async () => {
      await kingBilly.bonusStore.cashTab.click();
      const cashBonuses = EU_EXPECTED_RESULTS_BONUS_STORE.KNIGHT.KINGS_COINS.filter(
        bonus => bonus.type === 'cash'
      );
      const receivedBonuses = await kingBilly.bonusStore.gatherBonusInfo('kingsCoins');
      expect.soft(receivedBonuses).toEqual(createComparisonMatcher(cashBonuses));
    });

    await test.step('Check wheel bonuses', async () => {
      await kingBilly.bonusStore.wheelTab.click();
      const wheelBonuses = EU_EXPECTED_RESULTS_BONUS_STORE.KNIGHT.KINGS_COINS.filter(
        bonus => bonus.type === 'wheel'
      );
      const receivedBonuses = await kingBilly.bonusStore.gatherBonusInfo('kingsCoins');
      expect.soft(receivedBonuses).toEqual(createComparisonMatcher(wheelBonuses));
    });

    await test.step('Check fs bonuses', async () => {
      await kingBilly.bonusStore.fsTab.click();
      const fsBonuses = EU_EXPECTED_RESULTS_BONUS_STORE.KNIGHT.KINGS_COINS.filter(
        bonus => bonus.type === 'fs'
      );
      const receivedBonuses = await kingBilly.bonusStore.gatherBonusInfo('kingsCoins');
      expect.soft(receivedBonuses).toEqual(createComparisonMatcher(fsBonuses));
    });
  });

  test('Verify Bonus Store filtering for Knight user real money', async () => {
    await kingBilly.bonusStore.header.signInButton.click();
    await kingBilly.signInModal.fillEmail(VIP_USERS.knight.email);
    await kingBilly.signInModal.fillPassword(VIP_USERS.knight.password);
    await kingBilly.signInModal.clickSignIn();
    await kingBilly.bonusStore.realMoneyButton.click();

    await test.step('Check fs bonuses', async () => {
      await kingBilly.bonusStore.fsTab.click();
      const fsBonuses = EU_EXPECTED_RESULTS_BONUS_STORE.KNIGHT.REAL.filter(
        bonus => bonus.type === 'fs'
      );
      const receivedBonuses = await kingBilly.bonusStore.gatherBonusInfo('realMoney');
      expect.soft(receivedBonuses).toEqual(createComparisonMatcher(fsBonuses));
    });

    await test.step('Check wheel bonuses', async () => {
      await kingBilly.bonusStore.wheelTab.click();
      const wheelBonuses = EU_EXPECTED_RESULTS_BONUS_STORE.KNIGHT.REAL.filter(
        bonus => bonus.type === 'wheel'
      );
      const receivedBonuses = await kingBilly.bonusStore.gatherBonusInfo('realMoney');
      expect.soft(receivedBonuses).toEqual(createComparisonMatcher(wheelBonuses));
    });

    await test.step('Check tips bonuses', async () => {
      await kingBilly.bonusStore.tipsTab.click();
      const tipsBonuses = EU_EXPECTED_RESULTS_BONUS_STORE.KNIGHT.REAL.filter(
        bonus => bonus.type === 'tips'
      );
      const receivedBonuses = await kingBilly.bonusStore.gatherBonusInfo('realMoney');
      expect.soft(receivedBonuses).toEqual(createComparisonMatcher(tipsBonuses));
    });
  });
});

import test, { expect } from '@playwright/test';
import KingBilly from '../../../../src/PageManager/KingBilly';
import { LINKS } from '../../../../src/Data/Links/Links';
import { USERS, VIP_USERS } from '../../../../src/Data/Users/users';
import { AU_EXPECTED_RESULTS_BONUS_STORE } from '../../../../src/Data/bonusStoreExpectedResults/bonusStoreExpectedAU';
import SignInModal from '../../../../src/PO/MainPage/Component/SignInModal';
import SignUpModal from '../../../../src/PO/MainPage/Component/SignUpModal';

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

test.describe('Bonus Store - AU', () => {
  let kingBilly: KingBilly;
  let signInModal: SignInModal;
  let signUpModal: SignUpModal;

  test.beforeEach(async ({ page }, testInfo) => {
    const baseURL = testInfo.project.use.baseURL;
    test.skip(baseURL !== 'https://www.kingbillywin25.com', 'These tests are for AU domain only');

    kingBilly = new KingBilly(page);
    signInModal = new SignInModal(page);
    signUpModal = new SignUpModal(page);

    await kingBilly.bonusStore.navTo(LINKS.bonusStore);
    await kingBilly.bonusStore.clickAcceptCookies();
  });

  test('Verify Sign in button availability', async () => {
    await kingBilly.bonusStore.header.signInButton.click();
    await expect(signInModal.getEmailInput).toBeVisible();
  });

  test('Verify Sign up button availability', async () => {
    await kingBilly.bonusStore.header.createAccountButton.click();
    await expect(signUpModal.getEmailInput).toBeVisible();
  });

  test('Verify bonus availability for New Citizen user real money', async () => {
    await kingBilly.bonusStore.header.signInButton.click();
    await signInModal.fillEmail(USERS.citizenUser.email);
    await signInModal.fillPassword(USERS.citizenUser.password);
    await signInModal.clickSignIn();
    await kingBilly.bonusStore.clickOn(kingBilly.bonusStore.realMoneyButton);

    await kingBilly.bonusStore.bonusCardReal.first().waitFor({ state: 'visible' });
    const bonusInfo = await kingBilly.bonusStore.gatherBonusInfo('realMoney');
    expect(bonusInfo).toEqual(
      createComparisonMatcher(AU_EXPECTED_RESULTS_BONUS_STORE.CITIZEN.REAL)
    );
  });

  test('Verify bonus availability for New Citizen user kings coins', async () => {
    await kingBilly.bonusStore.header.signInButton.click();
    await signInModal.fillEmail(USERS.citizenUser.email);
    await signInModal.fillPassword(USERS.citizenUser.password);
    await signInModal.clickSignIn();
    await kingBilly.bonusStore.clickOn(kingBilly.bonusStore.kingsCoinsButton);

    await kingBilly.bonusStore.bonusCardKingsCoins.first().scrollIntoViewIfNeeded();
    const bonusInfo = await kingBilly.bonusStore.gatherBonusInfo('kingsCoins');
    expect(bonusInfo).toEqual(
      createComparisonMatcher(AU_EXPECTED_RESULTS_BONUS_STORE.CITIZEN.KINGS_COINS)
    );
  });

  test('Verify bonus availability for King user real money', async () => {
    await kingBilly.bonusStore.header.signInButton.click();
    await signInModal.fillEmail(VIP_USERS.king.email);
    await signInModal.fillPassword(VIP_USERS.king.password);
    await signInModal.clickSignIn();
    await kingBilly.bonusStore.clickOn(kingBilly.bonusStore.realMoneyButton);

    await kingBilly.bonusStore.bonusCardReal.first().waitFor({ state: 'visible' });
    const bonusInfo = await kingBilly.bonusStore.gatherBonusInfo('realMoney');
    expect(bonusInfo).toEqual(createComparisonMatcher(AU_EXPECTED_RESULTS_BONUS_STORE.KING.REAL));
  });

  test('Verify bonus availability for King user kings coins', async () => {
    await kingBilly.bonusStore.header.signInButton.click();
    await signInModal.fillEmail(VIP_USERS.king.email);
    await signInModal.fillPassword(VIP_USERS.king.password);
    await signInModal.clickSignIn();
    await kingBilly.bonusStore.clickOn(kingBilly.bonusStore.kingsCoinsButton);
    await kingBilly.bonusStore.bonusCardKingsCoins.first().waitFor({ state: 'visible' });
    const bonusInfo = await kingBilly.bonusStore.gatherBonusInfo('kingsCoins');
    console.log(bonusInfo);
    expect(bonusInfo).toEqual(
      createComparisonMatcher(AU_EXPECTED_RESULTS_BONUS_STORE.KING.KINGS_COINS)
    );
  });

  test('Verify bonus availability for Duke user real money', async () => {
    await kingBilly.bonusStore.header.signInButton.click();
    await signInModal.fillEmail(VIP_USERS.duke.email);
    await signInModal.fillPassword(VIP_USERS.duke.password);
    await signInModal.clickSignIn();
    await kingBilly.bonusStore.clickOn(kingBilly.bonusStore.realMoneyButton);
    await kingBilly.bonusStore.bonusCardReal.first().waitFor({ state: 'visible' });
    const bonusInfo = await kingBilly.bonusStore.gatherBonusInfo('realMoney');
    expect(bonusInfo).toEqual(createComparisonMatcher(AU_EXPECTED_RESULTS_BONUS_STORE.DUKE.REAL));
  });

  test('Verify bonus availability for Duke user kings coins', async () => {
    await kingBilly.bonusStore.header.signInButton.click();
    await signInModal.fillEmail(VIP_USERS.duke.email);
    await signInModal.fillPassword(VIP_USERS.duke.password);
    await signInModal.clickSignIn();
    await kingBilly.bonusStore.clickOn(kingBilly.bonusStore.kingsCoinsButton);
    await kingBilly.bonusStore.bonusCardKingsCoins.first().waitFor({ state: 'visible' });
    const bonusInfo = await kingBilly.bonusStore.gatherBonusInfo('kingsCoins');
    expect(bonusInfo).toEqual(
      createComparisonMatcher(AU_EXPECTED_RESULTS_BONUS_STORE.DUKE.KINGS_COINS)
    );
  });

  test('Verify bonus availability for Baronet user real money', async () => {
    await kingBilly.bonusStore.header.signInButton.click();
    await signInModal.fillEmail(VIP_USERS.baronet.email);
    await signInModal.fillPassword(VIP_USERS.baronet.password);
    await signInModal.clickSignIn();
    await kingBilly.bonusStore.clickOn(kingBilly.bonusStore.realMoneyButton);
    await kingBilly.bonusStore.bonusCardReal.first().waitFor({ state: 'visible' });
    const bonusInfo = await kingBilly.bonusStore.gatherBonusInfo('realMoney');
    expect(bonusInfo).toEqual(
      createComparisonMatcher(AU_EXPECTED_RESULTS_BONUS_STORE.BARONET.REAL)
    );
  });

  test('Verify bonus availability for Baronet user kings coins', async () => {
    await kingBilly.bonusStore.header.signInButton.click();
    await signInModal.fillEmail(VIP_USERS.baronet.email);
    await signInModal.fillPassword(VIP_USERS.baronet.password);
    await signInModal.clickSignIn();
    await kingBilly.bonusStore.clickOn(kingBilly.bonusStore.kingsCoinsButton);
    await kingBilly.bonusStore.bonusCardKingsCoins.first().waitFor({ state: 'visible' });
    const bonusInfo = await kingBilly.bonusStore.gatherBonusInfo('kingsCoins');
    expect(bonusInfo).toEqual(
      createComparisonMatcher(AU_EXPECTED_RESULTS_BONUS_STORE.BARONET.KINGS_COINS)
    );
  });

  test('Verify bonus availability for Knight user real money', async () => {
    await kingBilly.bonusStore.header.signInButton.click();
    await signInModal.fillEmail(VIP_USERS.knight.email);
    await signInModal.fillPassword(VIP_USERS.knight.password);
    await signInModal.clickSignIn();
    await kingBilly.bonusStore.clickOn(kingBilly.bonusStore.realMoneyButton);
    await kingBilly.bonusStore.bonusCardReal.first().waitFor({ state: 'visible' });
    const bonusInfo = await kingBilly.bonusStore.gatherBonusInfo('realMoney');
    console.log(bonusInfo);
    expect(bonusInfo).toEqual(createComparisonMatcher(AU_EXPECTED_RESULTS_BONUS_STORE.KNIGHT.REAL));
  });

  test('Verify bonus availability for Knight user kings coins', async () => {
    await kingBilly.bonusStore.header.signInButton.click();
    await signInModal.fillEmail(VIP_USERS.knight.email);
    await signInModal.fillPassword(VIP_USERS.knight.password);
    await signInModal.clickSignIn();
    await kingBilly.bonusStore.clickOn(kingBilly.bonusStore.kingsCoinsButton);
    await kingBilly.bonusStore.bonusCardKingsCoins.first().waitFor({ state: 'visible' });
    const bonusInfo = await kingBilly.bonusStore.gatherBonusInfo('kingsCoins');
    expect(bonusInfo).toEqual(
      createComparisonMatcher(AU_EXPECTED_RESULTS_BONUS_STORE.KNIGHT.KINGS_COINS)
    );
  });

  test('Verify Bonus Store filtering for Citizen user Kings coins', async () => {
    await kingBilly.bonusStore.header.signInButton.click();
    await signInModal.fillEmail(USERS.citizenUser.email);
    await signInModal.fillPassword(USERS.citizenUser.password);
    await signInModal.clickSignIn();
    await kingBilly.bonusStore.clickOn(kingBilly.bonusStore.kingsCoinsButton);

    await test.step('Check cash bonuses', async () => {
      await kingBilly.bonusStore.clickOn(kingBilly.bonusStore.cashTab);
      const cashBonuses = AU_EXPECTED_RESULTS_BONUS_STORE.CITIZEN.KINGS_COINS.filter(
        bonus => bonus.type === 'cash'
      );
      const receivedBonuses = await kingBilly.bonusStore.gatherBonusInfo('kingsCoins');
      expect.soft(receivedBonuses).toEqual(createComparisonMatcher(cashBonuses));
    });

    await test.step('Check wheel bonuses', async () => {
      await kingBilly.bonusStore.clickOn(kingBilly.bonusStore.wheelTab);
      const wheelBonuses = AU_EXPECTED_RESULTS_BONUS_STORE.CITIZEN.KINGS_COINS.filter(
        bonus => bonus.type === 'wheel'
      );
      const receivedBonuses = await kingBilly.bonusStore.gatherBonusInfo('kingsCoins');
      expect.soft(receivedBonuses).toEqual(createComparisonMatcher(wheelBonuses));
    });

    await test.step('Check fs bonuses', async () => {
      await kingBilly.bonusStore.clickOn(kingBilly.bonusStore.fsTab);
      const fsBonuses = AU_EXPECTED_RESULTS_BONUS_STORE.CITIZEN.KINGS_COINS.filter(
        bonus => bonus.type === 'fs'
      );
      const receivedBonuses = await kingBilly.bonusStore.gatherBonusInfo('kingsCoins');
      expect.soft(receivedBonuses).toEqual(createComparisonMatcher(fsBonuses));
    });
  });

  test('Verify Bonus Store filtering for Citizen user real money', async () => {
    await kingBilly.bonusStore.header.signInButton.click();
    await signInModal.fillEmail(USERS.citizenUser.email);
    await signInModal.fillPassword(USERS.citizenUser.password);
    await signInModal.clickSignIn();
    await kingBilly.bonusStore.clickOn(kingBilly.bonusStore.realMoneyButton);

    await test.step('Check fs bonuses', async () => {
      await kingBilly.bonusStore.clickOn(kingBilly.bonusStore.fsTab);
      const fsBonuses = AU_EXPECTED_RESULTS_BONUS_STORE.CITIZEN.REAL.filter(
        bonus => bonus.type === 'fs'
      );
      const receivedBonuses = await kingBilly.bonusStore.gatherBonusInfo('realMoney');
      expect.soft(receivedBonuses).toEqual(createComparisonMatcher(fsBonuses));
    });

    await test.step('Check wheel bonuses', async () => {
      await kingBilly.bonusStore.clickOn(kingBilly.bonusStore.wheelTab);
      const wheelBonuses = AU_EXPECTED_RESULTS_BONUS_STORE.CITIZEN.REAL.filter(
        bonus => bonus.type === 'wheel'
      );
      const receivedBonuses = await kingBilly.bonusStore.gatherBonusInfo('realMoney');
      expect.soft(receivedBonuses).toEqual(createComparisonMatcher(wheelBonuses));
    });

    await test.step('Check tips bonuses', async () => {
      await kingBilly.bonusStore.clickOn(kingBilly.bonusStore.tipsTab);
      const tipsBonuses = AU_EXPECTED_RESULTS_BONUS_STORE.CITIZEN.REAL.filter(
        bonus => bonus.type === 'tips'
      );
      const receivedBonuses = await kingBilly.bonusStore.gatherBonusInfo('realMoney');
      expect.soft(receivedBonuses).toEqual(createComparisonMatcher(tipsBonuses));
    });
  });

  test('Verify Bonus Store filtering for Baronet user Kings coins', async () => {
    await kingBilly.bonusStore.header.signInButton.click();
    await signInModal.fillEmail(VIP_USERS.baronet.email);
    await signInModal.fillPassword(VIP_USERS.baronet.password);
    await signInModal.clickSignIn();
    await kingBilly.bonusStore.clickOn(kingBilly.bonusStore.kingsCoinsButton);

    await test.step('Check cash bonuses', async () => {
      await kingBilly.bonusStore.clickOn(kingBilly.bonusStore.cashTab);
      const cashBonuses = AU_EXPECTED_RESULTS_BONUS_STORE.BARONET.KINGS_COINS.filter(
        bonus => bonus.type === 'cash'
      );
      const receivedBonuses = await kingBilly.bonusStore.gatherBonusInfo('kingsCoins');
      expect.soft(receivedBonuses).toEqual(createComparisonMatcher(cashBonuses));
    });

    await test.step('Check wheel bonuses', async () => {
      await kingBilly.bonusStore.clickOn(kingBilly.bonusStore.wheelTab);
      const wheelBonuses = AU_EXPECTED_RESULTS_BONUS_STORE.BARONET.KINGS_COINS.filter(
        bonus => bonus.type === 'wheel'
      );
      const receivedBonuses = await kingBilly.bonusStore.gatherBonusInfo('kingsCoins');
      expect.soft(receivedBonuses).toEqual(createComparisonMatcher(wheelBonuses));
    });

    await test.step('Check fs bonuses', async () => {
      await kingBilly.bonusStore.clickOn(kingBilly.bonusStore.fsTab);
      const fsBonuses = AU_EXPECTED_RESULTS_BONUS_STORE.BARONET.KINGS_COINS.filter(
        bonus => bonus.type === 'fs'
      );
      const receivedBonuses = await kingBilly.bonusStore.gatherBonusInfo('kingsCoins');
      expect.soft(receivedBonuses).toEqual(createComparisonMatcher(fsBonuses));
    });
  });

  test('Verify Bonus Store filtering for Baronet user real money', async () => {
    await kingBilly.bonusStore.header.signInButton.click();
    await signInModal.fillEmail(VIP_USERS.baronet.email);
    await signInModal.fillPassword(VIP_USERS.baronet.password);
    await signInModal.clickSignIn();
    await kingBilly.bonusStore.clickOn(kingBilly.bonusStore.realMoneyButton);

    await test.step('Check fs bonuses', async () => {
      await kingBilly.bonusStore.clickOn(kingBilly.bonusStore.fsTab);
      const fsBonuses = AU_EXPECTED_RESULTS_BONUS_STORE.BARONET.REAL.filter(
        bonus => bonus.type === 'fs'
      );
      const receivedBonuses = await kingBilly.bonusStore.gatherBonusInfo('realMoney');
      expect.soft(receivedBonuses).toEqual(createComparisonMatcher(fsBonuses));
    });

    await test.step('Check wheel bonuses', async () => {
      await kingBilly.bonusStore.clickOn(kingBilly.bonusStore.wheelTab);
      const wheelBonuses = AU_EXPECTED_RESULTS_BONUS_STORE.BARONET.REAL.filter(
        bonus => bonus.type === 'wheel'
      );
      const receivedBonuses = await kingBilly.bonusStore.gatherBonusInfo('realMoney');
      expect.soft(receivedBonuses).toEqual(createComparisonMatcher(wheelBonuses));
    });

    await test.step('Check tips bonuses', async () => {
      await kingBilly.bonusStore.clickOn(kingBilly.bonusStore.tipsTab);
      const tipsBonuses = AU_EXPECTED_RESULTS_BONUS_STORE.BARONET.REAL.filter(
        bonus => bonus.type === 'tips'
      );
      const receivedBonuses = await kingBilly.bonusStore.gatherBonusInfo('realMoney');
      expect.soft(receivedBonuses).toEqual(createComparisonMatcher(tipsBonuses));
    });
  });

  test('Verify Bonus Store filtering for Duke user Kings coins', async () => {
    await kingBilly.bonusStore.header.signInButton.click();
    await signInModal.fillEmail(VIP_USERS.duke.email);
    await signInModal.fillPassword(VIP_USERS.duke.password);
    await signInModal.clickSignIn();
    await kingBilly.bonusStore.clickOn(kingBilly.bonusStore.kingsCoinsButton);

    await test.step('Check cash bonuses', async () => {
      await kingBilly.bonusStore.clickOn(kingBilly.bonusStore.cashTab);
      const cashBonuses = AU_EXPECTED_RESULTS_BONUS_STORE.DUKE.KINGS_COINS.filter(
        bonus => bonus.type === 'cash'
      );
      const receivedBonuses = await kingBilly.bonusStore.gatherBonusInfo('kingsCoins');
      expect.soft(receivedBonuses).toEqual(createComparisonMatcher(cashBonuses));
    });

    await test.step('Check wheel bonuses', async () => {
      await kingBilly.bonusStore.clickOn(kingBilly.bonusStore.wheelTab);
      const wheelBonuses = AU_EXPECTED_RESULTS_BONUS_STORE.DUKE.KINGS_COINS.filter(
        bonus => bonus.type === 'wheel'
      );
      const receivedBonuses = await kingBilly.bonusStore.gatherBonusInfo('kingsCoins');
      expect.soft(receivedBonuses).toEqual(createComparisonMatcher(wheelBonuses));
    });

    await test.step('Check fs bonuses', async () => {
      await kingBilly.bonusStore.clickOn(kingBilly.bonusStore.fsTab);
      const fsBonuses = AU_EXPECTED_RESULTS_BONUS_STORE.DUKE.KINGS_COINS.filter(
        bonus => bonus.type === 'fs'
      );
      const receivedBonuses = await kingBilly.bonusStore.gatherBonusInfo('kingsCoins');
      expect.soft(receivedBonuses).toEqual(createComparisonMatcher(fsBonuses));
    });
  });

  test('Verify Bonus Store filtering for Duke user real money', async () => {
    await kingBilly.bonusStore.header.signInButton.click();
    await signInModal.fillEmail(VIP_USERS.duke.email);
    await signInModal.fillPassword(VIP_USERS.duke.password);
    await signInModal.clickSignIn();
    await kingBilly.bonusStore.clickOn(kingBilly.bonusStore.realMoneyButton);

    await test.step('Check fs bonuses', async () => {
      await kingBilly.bonusStore.clickOn(kingBilly.bonusStore.fsTab);
      const fsBonuses = AU_EXPECTED_RESULTS_BONUS_STORE.DUKE.REAL.filter(
        bonus => bonus.type === 'fs'
      );
      const receivedBonuses = await kingBilly.bonusStore.gatherBonusInfo('realMoney');
      expect.soft(receivedBonuses).toEqual(createComparisonMatcher(fsBonuses));
    });

    await test.step('Check wheel bonuses', async () => {
      await kingBilly.bonusStore.clickOn(kingBilly.bonusStore.wheelTab);
      const wheelBonuses = AU_EXPECTED_RESULTS_BONUS_STORE.DUKE.REAL.filter(
        bonus => bonus.type === 'wheel'
      );
      const receivedBonuses = await kingBilly.bonusStore.gatherBonusInfo('realMoney');
      expect.soft(receivedBonuses).toEqual(createComparisonMatcher(wheelBonuses));
    });

    await test.step('Check tips bonuses', async () => {
      await kingBilly.bonusStore.clickOn(kingBilly.bonusStore.tipsTab);
      const tipsBonuses = AU_EXPECTED_RESULTS_BONUS_STORE.DUKE.REAL.filter(
        bonus => bonus.type === 'tips'
      );
      const receivedBonuses = await kingBilly.bonusStore.gatherBonusInfo('realMoney');
      expect.soft(receivedBonuses).toEqual(createComparisonMatcher(tipsBonuses));
    });
  });

  test('Verify Bonus Store filtering for King user Kings coins', async () => {
    await kingBilly.bonusStore.header.signInButton.click();
    await signInModal.fillEmail(VIP_USERS.king.email);
    await signInModal.fillPassword(VIP_USERS.king.password);
    await signInModal.clickSignIn();
    await kingBilly.bonusStore.clickOn(kingBilly.bonusStore.kingsCoinsButton);

    await test.step('Check cash bonuses', async () => {
      await kingBilly.bonusStore.clickOn(kingBilly.bonusStore.cashTab);
      const cashBonuses = AU_EXPECTED_RESULTS_BONUS_STORE.KING.KINGS_COINS.filter(
        bonus => bonus.type === 'cash'
      );
      const receivedBonuses = await kingBilly.bonusStore.gatherBonusInfo('kingsCoins');
      expect.soft(receivedBonuses).toEqual(createComparisonMatcher(cashBonuses));
    });

    await test.step('Check wheel bonuses', async () => {
      await kingBilly.bonusStore.clickOn(kingBilly.bonusStore.wheelTab);
      const wheelBonuses = AU_EXPECTED_RESULTS_BONUS_STORE.KING.KINGS_COINS.filter(
        bonus => bonus.type === 'wheel'
      );
      const receivedBonuses = await kingBilly.bonusStore.gatherBonusInfo('kingsCoins');
      expect.soft(receivedBonuses).toEqual(createComparisonMatcher(wheelBonuses));
    });

    await test.step('Check fs bonuses', async () => {
      await kingBilly.bonusStore.clickOn(kingBilly.bonusStore.fsTab);
      const fsBonuses = AU_EXPECTED_RESULTS_BONUS_STORE.KING.KINGS_COINS.filter(
        bonus => bonus.type === 'fs'
      );
      const receivedBonuses = await kingBilly.bonusStore.gatherBonusInfo('kingsCoins');
      expect.soft(receivedBonuses).toEqual(createComparisonMatcher(fsBonuses));
    });
  });

  test('Verify Bonus Store filtering for King user real money', async () => {
    await kingBilly.bonusStore.header.signInButton.click();
    await signInModal.fillEmail(VIP_USERS.king.email);
    await signInModal.fillPassword(VIP_USERS.king.password);
    await signInModal.clickSignIn();
    await kingBilly.bonusStore.clickOn(kingBilly.bonusStore.realMoneyButton);

    await test.step('Check fs bonuses', async () => {
      await kingBilly.bonusStore.clickOn(kingBilly.bonusStore.fsTab);
      const fsBonuses = AU_EXPECTED_RESULTS_BONUS_STORE.KING.REAL.filter(
        bonus => bonus.type === 'fs'
      );
      const receivedBonuses = await kingBilly.bonusStore.gatherBonusInfo('realMoney');
      expect.soft(receivedBonuses).toEqual(createComparisonMatcher(fsBonuses));
    });

    await test.step('Check wheel bonuses', async () => {
      await kingBilly.bonusStore.clickOn(kingBilly.bonusStore.wheelTab);
      const wheelBonuses = AU_EXPECTED_RESULTS_BONUS_STORE.KING.REAL.filter(
        bonus => bonus.type === 'wheel'
      );
      const receivedBonuses = await kingBilly.bonusStore.gatherBonusInfo('realMoney');
      expect.soft(receivedBonuses).toEqual(createComparisonMatcher(wheelBonuses));
    });

    await test.step('Check tips bonuses', async () => {
      await kingBilly.bonusStore.clickOn(kingBilly.bonusStore.tipsTab);
      const tipsBonuses = AU_EXPECTED_RESULTS_BONUS_STORE.KING.REAL.filter(
        bonus => bonus.type === 'tips'
      );
      const receivedBonuses = await kingBilly.bonusStore.gatherBonusInfo('realMoney');
      expect.soft(receivedBonuses).toEqual(createComparisonMatcher(tipsBonuses));
    });
  });

  test('Verify Bonus Store filtering for King user Knight coins', async () => {
    await kingBilly.bonusStore.header.signInButton.click();
    await signInModal.fillEmail(VIP_USERS.knight.email);
    await signInModal.fillPassword(VIP_USERS.knight.password);
    await signInModal.clickSignIn();
    await kingBilly.bonusStore.clickOn(kingBilly.bonusStore.kingsCoinsButton);

    await test.step('Check cash bonuses', async () => {
      await kingBilly.bonusStore.clickOn(kingBilly.bonusStore.cashTab);
      const cashBonuses = AU_EXPECTED_RESULTS_BONUS_STORE.KNIGHT.KINGS_COINS.filter(
        bonus => bonus.type === 'cash'
      );
      const receivedBonuses = await kingBilly.bonusStore.gatherBonusInfo('kingsCoins');
      expect.soft(receivedBonuses).toEqual(createComparisonMatcher(cashBonuses));
    });

    await test.step('Check wheel bonuses', async () => {
      await kingBilly.bonusStore.clickOn(kingBilly.bonusStore.wheelTab);
      const wheelBonuses = AU_EXPECTED_RESULTS_BONUS_STORE.KNIGHT.KINGS_COINS.filter(
        bonus => bonus.type === 'wheel'
      );
      const receivedBonuses = await kingBilly.bonusStore.gatherBonusInfo('kingsCoins');
      expect.soft(receivedBonuses).toEqual(createComparisonMatcher(wheelBonuses));
    });

    await test.step('Check fs bonuses', async () => {
      await kingBilly.bonusStore.clickOn(kingBilly.bonusStore.fsTab);
      const fsBonuses = AU_EXPECTED_RESULTS_BONUS_STORE.KNIGHT.KINGS_COINS.filter(
        bonus => bonus.type === 'fs'
      );
      const receivedBonuses = await kingBilly.bonusStore.gatherBonusInfo('kingsCoins');
      expect.soft(receivedBonuses).toEqual(createComparisonMatcher(fsBonuses));
    });
  });

  test('Verify Bonus Store filtering for Knight user real money', async () => {
    await kingBilly.bonusStore.header.signInButton.click();
    await signInModal.fillEmail(VIP_USERS.knight.email);
    await signInModal.fillPassword(VIP_USERS.knight.password);
    await signInModal.clickSignIn();
    await kingBilly.bonusStore.clickOn(kingBilly.bonusStore.realMoneyButton);

    await test.step('Check fs bonuses', async () => {
      await kingBilly.bonusStore.clickOn(kingBilly.bonusStore.fsTab);
      const fsBonuses = AU_EXPECTED_RESULTS_BONUS_STORE.KNIGHT.REAL.filter(
        bonus => bonus.type === 'fs'
      );
      const receivedBonuses = await kingBilly.bonusStore.gatherBonusInfo('realMoney');
      expect.soft(receivedBonuses).toEqual(createComparisonMatcher(fsBonuses));
    });

    await test.step('Check wheel bonuses', async () => {
      await kingBilly.bonusStore.clickOn(kingBilly.bonusStore.wheelTab);
      const wheelBonuses = AU_EXPECTED_RESULTS_BONUS_STORE.KNIGHT.REAL.filter(
        bonus => bonus.type === 'wheel'
      );
      const receivedBonuses = await kingBilly.bonusStore.gatherBonusInfo('realMoney');
      expect.soft(receivedBonuses).toEqual(createComparisonMatcher(wheelBonuses));
    });

    await test.step('Check tips bonuses', async () => {
      await kingBilly.bonusStore.clickOn(kingBilly.bonusStore.tipsTab);
      const tipsBonuses = AU_EXPECTED_RESULTS_BONUS_STORE.KNIGHT.REAL.filter(
        bonus => bonus.type === 'tips'
      );
      const receivedBonuses = await kingBilly.bonusStore.gatherBonusInfo('realMoney');
      expect.soft(receivedBonuses).toEqual(createComparisonMatcher(tipsBonuses));
    });
  });
});

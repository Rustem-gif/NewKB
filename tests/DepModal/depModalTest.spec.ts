import { expect, test } from '@playwright/test';
import { VpnController } from '../../helpers/vpnController';
import KingBilly from '../../src/PageManager/KingBilly';
import { USERS_DEPOSIT_MODAL } from '../../src/Data/testDepositData/depositModalTestUsers';

for (const locale of Object.keys(USERS_DEPOSIT_MODAL)) {
  const { location, user } = USERS_DEPOSIT_MODAL[locale];

  for (const [type, creds] of Object.entries(user)) {
    const { email, password } = creds;

    test.describe(`Check ${locale}, ${type}`, () => {
      let kingBilly: KingBilly;
      let vpnController: VpnController;

      test.beforeAll(async () => {
        vpnController = new VpnController();
        const vpnStatus = await vpnController.vpnCheckStatus();

        if (vpnStatus.includes('connected')) {
            await vpnController.vpnDisconnect();
        }
      });

      test.beforeEach(async ({ page }) => {
        kingBilly = new KingBilly(page);
        await vpnController.vpnConnect(location);
        await vpnController.sleepVPN(5000);
      });

      test.afterEach(async () => {
        await vpnController.vpnDisconnect();
        await vpnController.vpnDisconnect();
      });

      test(`Visual comparison of dep modal ${locale}. ${type}`, async () => {
        await kingBilly.mainPage.navTo('/');
        await kingBilly.mainPage.header.signIn(email, password);
        await kingBilly.mainPage.header.clickDepositButton();
        await kingBilly.depModal.getDepModal.waitFor({ state: 'visible' });
        await kingBilly.page.waitForTimeout(15000);

        await expect(kingBilly.depModal.paymentList).toHaveScreenshot({
          maxDiffPixels: 500,
          maxDiffPixelRatio: 0.1,
          threshold: 0.2,
        });
      });
    });
  }
}

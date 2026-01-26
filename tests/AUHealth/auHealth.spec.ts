import { MAIN_USER } from '../../src/Data/Users/mainUser';
import { expect, test } from '../../src/fixtures/testFixture';

test.describe('AU health check', () => {
  test('Check AU health check', async ({ kingBilly }) => {
    await kingBilly.mainPage.navTo('/');
    const signInModal = await kingBilly.mainPage.header.clickSignIn();
    await signInModal.fillEmail(MAIN_USER.email);
    await signInModal.fillPassword(MAIN_USER.password);
    await signInModal.clickSignIn();
    await expect(kingBilly.mainPage.header.getDepositButton).toBeVisible();
  });
});

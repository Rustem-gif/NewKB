import { expect, test } from '../../src/fixtures/testFixture';

test.describe('AU health check', () => {
  test('Check AU health fast', { tag: '@fast' }, async ({ kingBilly }) => {
    await kingBilly.mainPage.navTo('/');
    await expect(kingBilly.mainPage.header.getSignInButton).toBeVisible();
  });
});

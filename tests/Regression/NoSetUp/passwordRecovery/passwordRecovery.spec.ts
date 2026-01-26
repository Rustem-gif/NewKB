import test, { expect } from '@playwright/test';
import KingBilly from '../../../../src/PageManager/KingBilly';
import { LINKS } from '../../../../src/Data/Links/Links';
import { MAIN_USER } from '../../../../src/Data/Users/mainUser';
import { ERRORS } from '../../../../src/Data/Errors/errors';
import { INVALID_USER } from '../../../../src/Data/Users/invalidUser';

test.describe('Password recovery', () => {
  let kingBilly: KingBilly;

  test.beforeEach(async ({ page }) => {
    kingBilly = new KingBilly(page);

    await test.step('Navigate to password recovery page', async () => {
      await kingBilly.mainPage.navTo(LINKS.PasswordRecovery);
      await kingBilly.mainPage.clickAcceptCookies();
    });
  });

  test('Check password recovery function', async () => {
    await test.step('Fill email input', async () => {
      await kingBilly.passwordRecovery.fillEmail(MAIN_USER.email);
    });

    await test.step('Check password recovery function', async () => {
      await kingBilly.passwordRecovery.clickResendReset();
    });

    await test.step('Check notification to be visible', async () => {
      await expect.soft(kingBilly.passwordRecovery.getPasswordRecoveryNotification).toBeVisible();
    });

    await test.step('Check text of the notification', async () => {
      await expect(kingBilly.passwordRecovery.getPasswordRecoveryNotification).toHaveText(
        kingBilly.passwordRecovery.getNotificationText
      );
    });
  });

  test('Check "Resend confirmation email" functionality', async () => {
    await test.step('Click on "Didn\'t receive confirmation instructions?" button', async () => {
      await kingBilly.passwordRecovery.clickResendConfirmationInstructions();
    });

    await test.step('Enter existing email into email input', async () => {
      await kingBilly.passwordRecovery.fillEmail(MAIN_USER.email);
    });

    await test.step('Click on "Resend" button', async () => {
      await kingBilly.passwordRecovery.clickResendReset();
    });

    await test.step('Check notification to be visible', async () => {
      await expect.soft(kingBilly.passwordRecovery.getResendConfirmationNotification).toBeVisible();
    });

    await test.step('Check text of the notification', async () => {
      await expect(kingBilly.passwordRecovery.getResendConfirmationNotification).toHaveText(
        kingBilly.passwordRecovery.getConfirmationNotificationText
      );
    });
  });

  test('Error message about wrong credentials appears', async () => {
    await test.step('Press on "Resend" button', async () => {
      await kingBilly.passwordRecovery.clickResendReset();
    });

    await test.step('Check error to be visible', async () => {
      await expect.soft(kingBilly.passwordRecovery.getInputError).toBeVisible();
    });

    await test.step('Check error text', async () => {
      await expect(kingBilly.passwordRecovery.getInputError).toHaveText(ERRORS.emailEmpty);
    });
  });

  test('Negative. Check password recovery. Invalid email', async () => {
    await test.step('Fill email input with invalid email', async () => {
      await kingBilly.passwordRecovery.fillEmail(INVALID_USER.email);
    });

    await test.step('Check password recovery function', async () => {
      await kingBilly.passwordRecovery.clickResendReset();
    });

    await test.step('Check notification to be visible', async () => {
      await expect.soft(kingBilly.passwordRecovery.getPasswordRecoveryNotification).toBeVisible();
    });

    await test.step('Check text of the notification', async () => {
      await expect(kingBilly.passwordRecovery.getPasswordRecoveryNotification).toHaveText(
        kingBilly.passwordRecovery.getNotificationText
      );
    });
  });
});

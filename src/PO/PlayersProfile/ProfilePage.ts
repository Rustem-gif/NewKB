import BasePage from "../BasePage/BasePage";
import {Locator, Page} from "@playwright/test";

export default class ProfilePage extends BasePage {
    readonly profileTitle: Locator = this.page.locator('h1');
    readonly paymentTableDeposit: Locator = this.page.locator('[data-testid="payment-tab-deposit"]');
    readonly paymentTableWithdraw: Locator = this.page.locator('[data-testid="payment-tab-cashout"]');
    readonly paymentCard: Locator = this.page.locator('.payment-card')
}
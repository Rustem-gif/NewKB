import BasePage from "../BasePage/BasePage";
import {Locator, Page} from "@playwright/test";

export default class ProfilePage extends BasePage {
    readonly profileTitle: Locator = this.page.locator('h1');
    readonly paymentTable: Locator = this.page.locator('.payment-methods-bar__methods-block');
}
import { Locator, Page } from "@playwright/test";
import BasePage from "../BasePage/BasePage";

export default class CookiePolicyPage extends BasePage {
    private cookiePolicyTitle: Locator = this.page.locator('h1')

    get getCookiePolicyTitle(): Locator {
        return this.cookiePolicyTitle
    }
}
import {Locator, Page} from "@playwright/test";
import BasePage from "../BasePage/BasePage";

export default class SupportPage extends BasePage {
    private supportBlock: Locator = this.page.locator('.support__content')

    get SupportBlock(): Locator {
        return this.supportBlock
    }
}
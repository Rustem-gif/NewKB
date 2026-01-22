import BasePage from "../BasePage/BasePage";
import {Locator, Page} from "@playwright/test";

export default class LegendPage extends BasePage {
    private legendTitle: Locator = this.page.locator('h2').filter({hasText: 'The Legend'})

    get getLegendTitle(): Locator {
        return this.legendTitle;
    }
}
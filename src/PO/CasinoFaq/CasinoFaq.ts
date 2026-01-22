import { Locator, Page } from "@playwright/test";
import BasePage from "../BasePage/BasePage";

export default class CasinoFaq extends BasePage {
    private body: Locator = this.page.locator('.help-center__data')

    
    async getBodyText(): Promise<string> {
        return await this.body.innerText();
    }

    
}
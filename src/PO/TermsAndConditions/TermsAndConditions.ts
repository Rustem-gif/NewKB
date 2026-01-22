import BasePage from "../BasePage/BasePage";
import {Page, Locator} from "@playwright/test";

export default class TermsAndConditions extends BasePage {
    private downloadPdfButton: Locator = this.page.locator('.download-pdf-button')
    private collapseBlockList: Locator = this.page.locator('a + .questions-list')

    
    async getCollapseDropdownText(): Promise<string> {
        return await this.collapseBlockList.innerText()

    }

    get getDownloadPdfButton(): Locator {
        return this.downloadPdfButton
    }
}
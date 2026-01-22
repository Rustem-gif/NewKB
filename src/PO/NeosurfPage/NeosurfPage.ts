import { Locator, Page } from "@playwright/test";
import BaseComponent from "../../Components/BaseComponent";

export default class NeosurfPage extends BaseComponent {
    private neosurfPageLogo: Locator = this.page.locator('.logo')

    
    get getNeosurfPageLogo(): Locator {
        return this.neosurfPageLogo;
    }
}
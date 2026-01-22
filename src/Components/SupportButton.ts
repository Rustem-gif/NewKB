import BaseComponent from "./BaseComponent";
import {Locator, Page} from "@playwright/test";

export default class SupportMessanger extends BaseComponent {
    private intercomWindowContainer: Locator = this.page.locator('iframe[name="intercom-messenger-frame"]').contentFrame().getByRole('button', { name: 'Search for help' })

    get getIntercomWindow() {
        return this.intercomWindowContainer;
    }  
}
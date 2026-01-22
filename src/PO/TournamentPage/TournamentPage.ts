import BasePage from "../BasePage/BasePage";
import {Locator, Page} from "@playwright/test";

export default class TournamentPage extends BasePage {
    private tournamentItem: Locator = this.page.locator('.tourn-item:nth-of-type(1)')


    get getTournamentItem(): Locator {
        return this.tournamentItem;
    }
}
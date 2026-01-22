import BasePage from "../BasePage/BasePage";
import {Locator, Page} from "@playwright/test";

export default class PromoPage extends BasePage{
    public defaultPromoIndex: number = 2

    private promoTab: Locator = this.page.locator('#promo_promo_tab')
    private vipTab: Locator = this.page.locator('#promo_promo_vip_tab')
    private tournamentsTab: Locator = this.page.locator('#promo_tournaments_tab')
    private promoCard: Locator = this.page.locator('.promo-item')
    private tournamentCard: Locator = this.page.locator('.tourn-item')
    private showMoreButton: Locator = this.page.locator('.section-header__button')
    private trounShowMoreButton: Locator = this.page.locator('.tourn-item__button')
    private getItPromoButton: Locator = this.page.locator('.promo-item__button')
    private promoModal: Locator = this.page.locator('.promo-modal')
    private closeButton: Locator = this.page.locator('.modal__close-icon')
    private infoButton: Locator = this.page.locator('.btn--info')
    private promoCardDepositButton: Locator = this.page.locator('.promo-modal__button.deposit-button')
    private depositModal: Locator = this.page.locator('#fast-deposit')
    readonly vipButton: Locator = this.page.locator('#promo_promo_vip_tab')

    private tournamentShowMoreButton = (index: number) => this.page.locator(`.a.tourn-item__button.link-btn:nth-of-type(${index})`)

    
    async openPromoTab(): Promise<void> {
        await this.promoTab.click()
    }

    
    async openVipTab(): Promise<void> {
        await this.vipTab.click()
    }

    async openTournamentsTab(): Promise<void> {
        await this.tournamentsTab.click()
    }


    async getPromoCardNumber(): Promise<number>{
        return await this.promoCard.count()
    }

    async getTournamentCardNumber(): Promise<number>{
        return await this.tournamentCard.count()
    }


    async openTournament(index: number): Promise<void> {
        await this.tournamentShowMoreButton(index).click()
    }

    async clickShowMore(): Promise<void> {
        await this.showMoreButton.click()
    }

    async clickTournShowMore(): Promise<void> {
        await this.trounShowMoreButton.click()
    }

    async clickOnGetItButton(promoCard: Locator): Promise<void> {
        await promoCard.locator(this.getItPromoButton).click()
    }

    async clickOnCloseButton(): Promise<void> {
        await this.closeButton.click()
    }

    async clickOnInfoButton(promoCard: Locator): Promise<void> {
        await promoCard.locator(this.infoButton).click()
    }

    async clickOnPromoCardDepositButton(): Promise<void> {
        await this.promoCardDepositButton.click()
    }


    async getaAndSortPromos(): Promise<{ activePromos: Array<Locator>; inactivePromos: Array<Locator> }> {
        let activePromos: Array<Locator> = []
        let inactivePromos: Array<Locator> = []

        const allPromos: Array<Locator> = await this.getPromoCard.all()

            for (let promo of allPromos){
                const promoClass = await promo.getAttribute('class')

                if (promoClass?.includes('promo-item--disabled')){
                    inactivePromos.push(promo)
                } else {
                    activePromos.push(promo)
                }
            }

        return {activePromos, inactivePromos}
    }

    async checkPromoTourn({promoType, lang, expectedValue, section}:
            {promoType: 'promo' | 'tournament', lang: string, expectedValue: string, section: 'promo' | 'tournament'}): Promise<boolean> {
        let receivedArray
        let titleIsNotFound

        switch(section) {
            case "promo":
                receivedArray = await this.getPromoCardText();
                titleIsNotFound = await this.checkTitle({receivedArray, expectedValue});
                // console.log(chalk.green(`${lang}\n ${promoType}\n ${receivedArray}`));
                break;
            case "tournament":
                receivedArray = await this.getTournamentPromoText();
                titleIsNotFound = await this.checkTitle({receivedArray, expectedValue});
                // console.log(chalk.green(`${lang}\n ${promoType}\n ${receivedArray}`));
                break;
            default:
                // console.log(chalk.red(`Invalid section ${section}`));
                return false;
        }
        return titleIsNotFound
    }


    get getPromoCard(): Locator {
        return this.promoCard
    }

    get getTournamentCard(): Locator {
        return this.tournamentCard
    }

    get getShowMoreButton(): Locator {
        return this.showMoreButton
    }

    get getTournShowMoreButton(): Locator {
        return this.trounShowMoreButton
    }

    get getPromoModal(): Locator {
        return this.promoModal
    }

    get getCloseButton(): Locator {
        return this.closeButton
    }

    get getPromoDepositButton(): Locator {
        return this.promoCardDepositButton
    }

}
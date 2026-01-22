import { BlobOptions } from "buffer";
import BaseComponent from "../../../Components/BaseComponent";
import {Locator, Page} from "@playwright/test";

export default class PromoSection extends BaseComponent {
    private promoCards: Locator = this.page.locator('.promo-item')
    private closeButton: Locator = this.page.locator('button.modal__close-button')
    private infoModal: Locator = this.page.locator('.promo-modal__container')
    private promoSection: Locator = this.page.locator('.promos-slider')
    private sliderButtonOne: Locator = this.page.locator('.promos-slider .slick-arrow:nth-of-type(1)')
    private sliderButtonTwo: Locator = this.page.locator('.promos-slider .slick-arrow:nth-of-type(2)')

    private promoCard = (index: number) => this.page.locator(`.promo-item:nth-of-type(${index})`)
    private promoInfoButton = (index: number) => this.page.locator(`div[data-index='${index}'] .promo-item__info`)
    private promoGetItButton = (index: number) => this.page.locator(`div[data-index='${index}'] .promo-item__button`)

    async getNumberOfCards(): Promise<number> {
        return await this.promoCards.count()
    }

    async getPromoCards(): Promise<Array<Locator>> {
        return await this.promoCards.all();
    }

    async checkIfPromoCardIsActive(index: number): Promise<boolean> {

        return await this.page.evaluate((i) => {
            const promoCard = document.querySelector(`.promos-slider div[data-index='${i}']`);
            if(promoCard) {

                const isBlurred = promoCard.classList.contains('promo-item__active')

                return !isBlurred;

            } else {
                throw new Error(`No promo cards found on the page`)
            }
        }, index)
    }

    async clickOnInfoButton(index: number): Promise<void> {
        await this.promoInfoButton(index).click()
    }

    async clickOnGetItButton(index: number): Promise<void> {
        await this.promoGetItButton(index).click()
    }

    async expectedPromoCardTOBeVisible(index: number): Promise<boolean>{
        return await this.promoInfoButton(index).isVisible()
    }

    async closeInfoModal(): Promise<void> {
        await this.closeButton.click()
    }

    async clickOnSliderButtonTwo(): Promise<void> {
        await this.sliderButtonTwo.click()
    }

    get getInfoModal(): Locator {
        return this.infoModal
    }

    get getSliderButton(): Locator {
        return this.sliderButtonOne
    }

    get getSliderButtonTwo(): Locator {
        return this.sliderButtonTwo
    }

    get getPromoSection(): Locator {
        return this.promoSection
    }

}
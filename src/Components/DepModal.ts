import BaseComponent from "./BaseComponent";
import {Locator, Page} from "@playwright/test";


type DepMethod = 'creditCard' | 'neoserf' | 'paysafecard' | 'interac' | 'creditCardAU' | 'creditCardNZ' | 'creditCardCA' | 'creditCardDE'  | 'sparkasseDE' | 'deutscheBankDE' | 'postbankDE' | 'revolut' | 'nodaPay';

export class DepModal extends BaseComponent {
    private depModal: Locator = this.page.locator('.fast-deposit-modal')
    private creditCardAU: Locator = this.page.locator("[data-method-id='devcode_devcode-creditcard-352_creditcard']")
    private neoserf: Locator = this.page.locator("[data-method-id='finteqhub_seamless_finteqhub_seamless-neosurf~neosurf-175_neosurf~neosurf']")
    private paysafecard: Locator = this.page.locator("[data-method-id='finteqhub_seamless_finteqhub_seamless-skrill~skrill-paysafecard-300_skrill~skrill-paysafecard']")
    private creditCardNZ: Locator = this.page.locator("[data-method-id='finteqhub_seamless_finteqhub_seamless-card-acquirer-278_card-acquirer']")
    private interac: Locator = this.page.locator("[data-method-id='finteqhub_seamless_finteqhub_seamless-interac~interac-316_interac~interac']")
    private creditCardCA: Locator = this.page.locator("[data-method-id='finteqhub_seamless_finteqhub_seamless-card-acquirer-380_card-acquirer']")
    private creditCardDE: Locator = this.page.locator("[data-method-id='finteqhub_seamless_finteqhub_seamless-card-acquirer-313_card-acquirer']")
    private depositButton: Locator = this.page.locator('.payment-submit-default__button')
    private depModalError: Locator = this.page.locator('#payment_common_error')
    private paysafeCardModal: Locator = this.page.locator('.payments-lib-popup__content')

    //AU credit card locators
    private auCreditCardNumberInput: Locator = this.page.locator('#encCreditcardNumber')
    private auCardHolderNameInput: Locator = this.page.locator('#cardHolder')
    private auExpiryDateInput: Locator = this.page.locator('#expiry_date')
    private auCvvInput: Locator = this.page.locator('#encCvv')
    private firstNameInput: Locator = this.page.locator('[name="first_name"]')
    private lastNameInput: Locator = this.page.locator('#dynamic-form__last_name')
    private dateOfBirthInput: Locator = this.page.locator('.Date--calendar__input')
    private stateSelect: Locator = this.page.locator('.select__input')
    private cityInput: Locator = this.page.locator('#dynamic-form__city')
    private addressInput: Locator = this.page.locator('#dynamic-form__address')
    private postalCodeInput: Locator = this.page.locator('#dynamic-form__postal_code')
    private mobileNumberInput: Locator = this.page.locator('#dynamic-form__mobile_phone-number')

    // NZ credit card specific locators
    private nzCardNumberInput: Locator = this.page.locator('.payment-dynamic-form__credit-card-number > input')
    private nzCardHolderNameInput: Locator = this.page.locator('.payment-dynamic-form__card-holder > input')
    private nzExpiryDateInput: Locator = this.page.locator('.payment-dynamic-form__card-expiry-date > input')
    private nzCvvInput: Locator = this.page.locator('.payment-dynamic-form__cvv > input')
    private nzFirstNameInput: Locator = this.page.locator('#dynamic-form__first_name')
    private nzLastNameInput: Locator = this.page.locator('#dynamic-form__last_name')
    private nzCityInput: Locator = this.page.locator('#dynamic-form__city')
    private nzAddressInput: Locator = this.page.locator('#dynamic-form__address')
    private nzPostalCodeInput: Locator = this.page.locator('#dynamic-form__postal_code')
    private nzMobileFormInput: Locator = this.page.locator('#dynamic-form__mobile_phone-number')
    private creditCardNumberInpuitNZ: Locator = this.nzCardNumberInput
    private sparkasseDE: Locator = this.page.locator("[data-method-id='finteqhub_seamless_finteqhub_seamless-noda~sparkasse-germany-351_noda~sparkasse-germany']")
    private deutscheBankDE: Locator = this.page.locator("[data-method-id='finteqhub_seamless_finteqhub_seamless-noda~deutsche-bank-germany-348_noda~deutsche-bank-germany']")
    private postbankDE: Locator = this.page.locator("[data-method-id='finteqhub_seamless_finteqhub_seamless-noda~postbank-germany-349_noda~postbank-germany']")
    private revolut: Locator = this.page.locator("[data-method-id='finteqhub_seamless_finteqhub_seamless-noda~revolut-germany-350_noda~revolut-germany']")
    private nodaPay: Locator = this.page.locator("[data-method-id='finteqhub_seamless_finteqhub_seamless-noda~noda-320_noda~noda']")

    readonly paymentList: Locator = this.page.locator('.payment-methods__list')

    //CA credit card specific locators
    private caCardNumberInput: Locator = this.page.locator('#number')
    private caCardHolderNameInput: Locator = this.page.locator('#holder')
    private caExpiryDateInput: Locator = this.page.locator('#seamless_expiry_date')
    private caCvvInput: Locator = this.page.locator('#cvv')


    get getDepModal(): Locator {
        return this.depModal
    }

    async getdepMethod(depMethod: DepMethod): Promise<Locator> {
        switch (depMethod) {
            case 'creditCardAU':
                return this.creditCardAU;
            case 'creditCardNZ':
                return this.creditCardNZ;
            case 'creditCardCA':
                return this.creditCardCA;
            case 'creditCardDE':
                return this.creditCardDE;
            case 'neoserf':
                return this.neoserf;
            case 'paysafecard':
                return this.paysafecard;
            case 'interac':
                return this.interac;
            case 'sparkasseDE':
                return this.sparkasseDE;
            case 'deutscheBankDE':
                return this.deutscheBankDE;
            case 'postbankDE':
                return this.postbankDE;
            case 'revolut':
                return this.revolut;
            case 'nodaPay':
                return this.nodaPay;
            default:
                throw new Error(`Unknown deposit method: ${depMethod}`);
        }
    }

    async clickOnDepMethod(depMethod: DepMethod): Promise<void> {
        const methodLocator = await this.getdepMethod(depMethod);
        await methodLocator.click();
    }

    async clickOnDepositButton(): Promise<void> {
        await this.depositButton.scrollIntoViewIfNeeded();
        await this.depositButton.click();
    }

   async selectDateFromDatePicker(): Promise<void> {
    await this.dateOfBirthInput.click();
    await this.page.locator('.react-datepicker__month > .react-datepicker__week  > .react-datepicker__day[aria-disabled="false"]:nth-of-type(1)').first().click();
    }

    async chooseSatateAu(){
        await this.stateSelect.click();
        await this.page.locator('#dynamic-form__state-item-0').click();
    }

    async fillCreditCardField({
        cardNumber,
        cardHolderName,
        expiryDate,
        cvv,
        firstName,
        lastName,
        city,
        address,
        postalCode,
        mobileNumber,
        isNZ = false,
        isCA = false
    }: {
        cardNumber?: string;
        cardHolderName?: string;
        expiryDate?: string;
        cvv?: string;
        firstName?: string;
        lastName?: string;
        city?: string;
        address?: string;
        postalCode?: string;
        mobileNumber?: string;
        isNZ?: boolean;
        isCA?: boolean;
    }) {
        const region = isNZ ? 'NZ' : isCA ? 'CA' : 'AU';
        
        switch (region) {
            case 'NZ':
                await this.fillCreditCardFieldNZ({
                    cardNumber,
                    cardHolderName,
                    expiryDate,
                    cvv,
                    firstName,
                    lastName,
                    city,
                    address,
                    postalCode,
                    mobileNumber
                });
                break;
            
            case 'CA':
                await this.fillCACreditCardFieldsCA({
                    cardNumber,
                    cardHolderName,
                    expiryDate,
                    cvv
                });
                break;
            
            case 'AU':
            default:
                await this.fillAUCreditCardFieldsAU({
                    cardNumber,
                    cardHolderName,
                    expiryDate,
                    cvv,
                    firstName,
                    lastName,
                    city,
                    address,
                    postalCode,
                    mobileNumber
                });
                break;
        }
    }

    async fillCreditCardFieldNZ({
        cardNumber,
        cardHolderName,
        expiryDate,
        cvv,
        firstName,
        lastName,
        city,
        address,
        postalCode,
        mobileNumber
    }: {
        cardNumber?: string;
        cardHolderName?: string;
        expiryDate?: string;
        cvv?: string;
        firstName?: string;
        lastName?: string;
        city?: string;
        address?: string;
        postalCode?: string;
        mobileNumber?: string;
    }) {
        if (cardNumber !== undefined && cardNumber !== null) {
            await this.nzCardNumberInput.fill(cardNumber);
        }
        if (cardHolderName !== undefined && cardHolderName !== null) {
            await this.nzCardHolderNameInput.fill(cardHolderName);
        }
        if (expiryDate !== undefined && expiryDate !== null) {
            await this.nzExpiryDateInput.fill(expiryDate);
        }
        if (cvv !== undefined && cvv !== null) {
            await this.nzCvvInput.fill(cvv);
        }
        if (firstName !== undefined && firstName !== null) {
            await this.nzFirstNameInput.fill(firstName);
        }
        if (lastName !== undefined && lastName !== null) {
            await this.nzLastNameInput.fill(lastName);
        }
        if (city !== undefined && city !== null) {
            await this.nzCityInput.fill(city);
        }
        if (address !== undefined && address !== null) {
            await this.nzAddressInput.fill(address);
        }
        if (postalCode !== undefined && postalCode !== null) {
            await this.nzPostalCodeInput.fill(postalCode);
        }
        if (mobileNumber !== undefined && mobileNumber !== null) {
            await this.nzMobileFormInput.fill(mobileNumber);
        }
    }

    async fillCACreditCardFieldsCA({
        cardNumber,
        cardHolderName,
        expiryDate,
        cvv
    }: {
        cardNumber?: string;
        cardHolderName?: string;
        expiryDate?: string;
        cvv?: string;
    }) {
        if (cardNumber !== undefined && cardNumber !== null) {
            await this.caCardNumberInput.fill(cardNumber);
        }
        if (cardHolderName !== undefined && cardHolderName !== null) {
            await this.caCardHolderNameInput.fill(cardHolderName);
        }
        if (expiryDate !== undefined && expiryDate !== null) {
            await this.caExpiryDateInput.fill(expiryDate);
        }
        if (cvv !== undefined && cvv !== null) {
            await this.caCvvInput.fill(cvv);
        }
    }

    async fillAUCreditCardFieldsAU({
        cardNumber,
        cardHolderName,
        expiryDate,
        cvv,
        firstName,
        lastName,
        city,
        address,
        postalCode,
        mobileNumber,
        dateOfBirth
    }: {
        cardNumber?: string;    
        cardHolderName?: string;
        expiryDate?: string;
        cvv?: string;
        firstName?: string;
        lastName?: string;
        city?: string;
        address?: string;
        postalCode?: string;
        mobileNumber?: string;
        dateOfBirth?: string;
    }) { 
        if (cardNumber !== undefined && cardNumber !== null) {
            await this.auCreditCardNumberInput.fill(cardNumber);
        }
        if (cardHolderName !== undefined && cardHolderName !== null) {
            await this.auCardHolderNameInput.fill(cardHolderName);
        }
        if (expiryDate !== undefined && expiryDate !== null) {
            await this.auExpiryDateInput.fill(expiryDate);
        }
        if (cvv !== undefined && cvv !== null) {
            await this.auCvvInput.fill(cvv);
        }
        if (firstName !== undefined && firstName !== null) {
            await this.firstNameInput.fill(firstName);
        }
        if (lastName !== undefined && lastName !== null) {
            await this.lastNameInput.fill(lastName);
        }
        if (city !== undefined && city !== null) {
            await this.cityInput.fill(city);
        }
        if (address !== undefined && address !== null) {
            await this.addressInput.fill(address);
        }
        if (postalCode !== undefined && postalCode !== null) {
            await this.postalCodeInput.fill(postalCode);
        }
        if (mobileNumber !== undefined && mobileNumber !== null) {
            await this.mobileNumberInput.fill(mobileNumber);
        }
        if (dateOfBirth !== undefined && dateOfBirth !== null) {
            await this.dateOfBirthInput.fill(dateOfBirth);
        }
    }

    
    get getDepModalError() : Locator {
        return this.depModalError;
    }

    get getPaysafeCardModal(): Locator {
        return this.paysafeCardModal;
    }
}
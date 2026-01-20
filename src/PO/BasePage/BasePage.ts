import test, {Page, Locator} from "@playwright/test";
import Header from "../../Components/Header";
import Footer from "../../Components/Footer";
import SidebarMenu from "../../Components/SidebarMenu";
import CategoryDropdown from "../MainPage/Component/CategoryDropdown";
import { DepModal } from "../../Components/DepModal";
import chalk from "chalk";

export default class BasePage {
  readonly page: Page
  public header: Header
  public footer: Footer
  public sideBarMenu: SidebarMenu
  private acceptCookiesButton: Locator
  readonly scrollUpButton: Locator
  public categoryDropdown: CategoryDropdown
  public langItem: (langValue: string) => Locator
  public langDropdown: Locator

  constructor(page: Page) {
    this.page = page;

    this.scrollUpButton = this.page.locator('.btn-scroll-top')
    this.acceptCookiesButton = this.page.locator('#accept_initial_notification_button')

    this.langItem = (langValue) => page.locator('.header .select-language-icons-with-code__item', {'hasText': `${langValue}`}).first()
    this.langDropdown = page.locator('.header .select-language-icons-with-code__button')
    

    this.header = new Header(this.page)
    this.footer = new Footer(this.page)
    this.sideBarMenu = new SidebarMenu(this.page)
    this.categoryDropdown = new CategoryDropdown(this.page)
  }

  
  async navTo(url: string): Promise<void> {
    await this.page.goto(url);
    await this.changeLanguage('EN');
  }

  async sleep(miliseconds: number): Promise<void> {
    await this.page.waitForTimeout(miliseconds);
  }

  async getPageUrl(): Promise<string>{
    return this.page.url()
  }

  async scrollTo(locator: Locator): Promise<void>{
    await locator.scrollIntoViewIfNeeded()
  }

  async clickAcceptCookies(): Promise<void>{
    await this.acceptCookiesButton.click()
  }


  async waitForSelector(locator: Locator): Promise<void>{
    await locator.waitFor({state: "visible"})
  }
  
  async closeModal(): Promise<void>{
    if (await this.page.locator('.fast-deposit-modal').isVisible()) {
      try {
        await this.page.keyboard.press('Escape');
        await this.page.waitForTimeout(500);
      } catch (error) {
        console.log('Could not close modal with Escape key', error);
    }
    
    // Try clicking on any visible close buttons
    try {
      const closeButtons = [
        '.modal__close-icon',
        '.modal__close-button',
        '.close-button',
        '.fast-deposit-modal .btn-close'
      ];
      
      for (const selector of closeButtons) {
        const closeButton = this.page.locator(selector);
        if (await closeButton.isVisible()) {
          await closeButton.click();
          await this.page.waitForTimeout(500);
          break;
        }
      }
    } catch (error) {
      console.log('Could not find close button', error);
    }
  }
  }
  
  async checkAndCloseDepositModal(): Promise<void> {
    // Check if deposit modal is visible and close it if needed
    try {
      const depositModal = this.page.locator('.fast-deposit-modal');
      const closeButton = this.page.locator('.fast-deposit-modal .btn-close');
      
      if (await depositModal.isVisible({ timeout: 2000 })) {
          await closeButton.click();
          await this.page.waitForTimeout(500);
        }
    } catch (error) {
      // If the modal isn't visible or there's another issue, just continue
      console.log('No deposit modal detected or unable to close it', error);
    }
  }

     async checkTitle({
    receivedArray,
    expectedValue
}: {
    receivedArray: Array<string>,
    expectedValue: string
}): Promise<boolean> {
        console.log(receivedArray)
        console.log(expectedValue.trim().toUpperCase())

    if (receivedArray.includes(expectedValue.trim().toUpperCase())) {
        console.error(chalk.red(`${expectedValue} IS PRESENT ERROR!!!`))
        return false
    }
    if (receivedArray.length === 0) {
        console.error(chalk.red(`ARRAY IS EMPTY ERROR!!!!!!!`))
        return false
    } else {
        const message = `No ${expectedValue} found`;
        console.log(message);
        return true
    }
  }

        async getPromoCardText(): Promise<Array<string>> {
        await this.page.waitForSelector('.promo-item__subtitle')
        return await this.page.evaluate(async () => {
            let nodeList = document.querySelectorAll('.promo-item__subtitle')
            if (nodeList !== null) {
                let array = Array.from(nodeList).map(title => title.textContent?.trim().toUpperCase() || '')
                 if (array.length > 0) {
                    return array
                }  else {
                    console.error("Array is empty")
                }
            }
            return []
        })
    }

        async getTournamentMainText(): Promise<Array<string>> {
        return await this.page.evaluate(async () => {
            let nodeList = document.querySelectorAll('.tourn-banner .tourn-banner__subtitle')
            if (nodeList !== null) {
                let array:Array<string> = Array.from(nodeList).map(title => title.textContent?.trim().toUpperCase() || '')
                 if (array.length > 0) {
                    return array
                }  else {
                    // throw new Error("Array is empty")
                }
            }
            return []
        })
    }

        async getFooterPromoTitles(): Promise<Array<string>> {
        return await this.page.evaluate(async () => {
            let nodeList = document.querySelectorAll('.promo-item__subtitle')
            if (nodeList !== null) {
                let array:Array<string> = Array.from(nodeList).map(title => title.textContent?.trim().toUpperCase() || '')
                 if (array.length > 0) {
                    return array
                }  else {
                    throw new Error("Array is empty")
                }
            }
            return []
        })
    }

    async getTournamentPromoText(): Promise<Array<string>> {
        return await this.page.evaluate(async () => {
            let nodeList = document.querySelectorAll('.tourn-item__subtitle')
            if (nodeList !== null) {
                let array:Array<string> = Array.from(nodeList).map(title => title.textContent?.trim().toUpperCase() || '')
                if (array.length > 0) {
                    return array
                }  else {
                    console.error("Array is empty")
                }
            }
            return []
        })
    }


    async changeLanguage(langValue: string = 'EN', domain?: string): Promise<void> {
        await this.page.waitForLoadState('load')
        await this.page.waitForTimeout(2000)

        const depositModal = this.page.locator('.fast-deposit-modal')
        const closeDepositModalButton = this.page.locator('.modal__close-button').first()

        if (await depositModal.isVisible()) {
            await closeDepositModalButton.click()
        }
        
        
        const currentUrl = await this.page.url();
        const currentDomain = new URL(currentUrl).hostname;

        console.log(`[changeLanguage] Current URL: ${currentUrl}`);
        console.log(`[changeLanguage] Current domain: ${currentDomain}`);

        const skipLanguageChangeDomains = ['www.kingbillywin29.com', 'kingbillywin29.com'];

        if ((domain && skipLanguageChangeDomains.includes(domain)) ||
            skipLanguageChangeDomains.includes(currentDomain)) {
            console.log(`Domain ${domain || currentDomain} doesn't require language change`);
            return;
        }

        // Check if language dropdown exists on this page
        const langDropdownVisible = await this.langDropdown.isVisible({ timeout: 2000 }).catch(() => false);
        if (!langDropdownVisible) {
            console.log(`Language dropdown not found on ${currentDomain}, skipping language change`);
            return;
        }

        // Proceed with language change if needed
        try {
            const currentLocale = await this.langDropdown.innerText();
            
            if (currentLocale.trim().toUpperCase() === langValue.trim().toUpperCase()) {
                console.log(`Language is already set to ${langValue}`);
                return;
            } else {
                await this.langDropdown.click();
                await this.langItem(langValue).waitFor({ state: 'visible', timeout: 5000 });
                await this.langItem(langValue).click();
                console.log(`Language changed to ${langValue}`);
                // Wait for page to load after language change
                await this.page.waitForLoadState('load', { timeout: 10000 });
            }
        } catch (error) {
            console.error(`Error changing language: ${error}`);
            throw error;
        }
    }


    async clickOn(button: Locator) {
      await button.click();
  }


  get getScrollUpButton(): Locator {
    return this.scrollUpButton
  }
}

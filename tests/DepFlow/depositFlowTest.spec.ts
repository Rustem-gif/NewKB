import test, { expect } from "@playwright/test";
import KingBilly from "../../src/PageManager/KingBilly";
import { testData } from "../../src/Data/testDepositData/testDataDepositMonitor";
import NeosurfPage from "../../src/PO/NeosurfPage/NeosurfPage";
import { vpnController } from "../../helpers/vpnControllerInstance";

// Map regions to VPN locations
const regionToVpnLocation = {
    AU: "Australia - Melbourne",
    NZ: "New Zealand",
    CA: "Canada - Montreal",
    DE: "Germany - Frankfurt - 3"
};

test.describe("Deposit Flow Test", () => {
    const password = '193786Az()';
    let randomEmail: string;

    test('Verify deposit flow AU credit card', async ({ browser }) => {
        // Connect to Australian VPN
        await vpnController.vpnDisconnect(); // Ensure disconnected first
        await vpnController.vpnConnect(regionToVpnLocation.AU);
        await vpnController.sleepVPN(5000); // Wait for VPN to connect
        
        // Create context with consistent user agent
        const context = await browser.newContext({ 
            userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) kingBillyleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
        });
        const page = await context.newPage();
        
        // Initialize page manager
        const kingBilly = new KingBilly(page);

        await kingBilly.mainPage.navTo('http://kingbillywin24.com');
        await kingBilly.mainPage.clickAcceptCookies();
        const signUpModal = await kingBilly.mainPage.header.clickCreateAccount();
        randomEmail = await kingBilly.methods.generateRandomEmail(10);
        await signUpModal.createAccount({ email: randomEmail, password });

        const creditCardData = {
            cardNumber: testData.AU.paymentMethods.creditCard.cardNumber,
            cardHolderName: testData.AU.paymentMethods.creditCard.nameOnCard,
            expiryDate: testData.AU.paymentMethods.creditCard.expiryDate,
            cvv: testData.AU.paymentMethods.creditCard.cvv,
            firstName: testData.AU.paymentMethods.creditCard.firstName,
            lastName: testData.AU.paymentMethods.creditCard.lastName,
            address: testData.AU.paymentMethods.creditCard.address,
            city: testData.AU.paymentMethods.creditCard.city,
            postalCode: testData.AU.paymentMethods.creditCard.postalCode,
            mobileNumber: testData.AU.paymentMethods.creditCard.mobileNumber
        };
        await kingBilly.depModal.clickOnDepMethod('creditCardAU');
        await kingBilly.depModal.selectDateFromDatePicker()
        await kingBilly.depModal.chooseSatateAu();
        await kingBilly.depModal.fillCreditCardField(creditCardData);
        await kingBilly.depModal.page.waitForTimeout(60000);
        await kingBilly.depModal.clickOnDepositButton();
        await kingBilly.depModal.page.waitForTimeout(60000);
        expect(kingBilly.depModal.getDepModalError).toBeVisible({ timeout: 5000 });
    
        await expect(page).toHaveScreenshot('au_credit_card.png', {maxDiffPixels: 2000, maxDiffPixelRatio: 0.5});
        const auCreditCardScreenshot = await page.screenshot({ fullPage: false });
        await test.info().attach('au_credit_card.png', { body: auCreditCardScreenshot, contentType: 'image/png' });
        await context.close();
        
        // Disconnect VPN after test
        await vpnController.vpnDisconnect();
        await vpnController.sleepVPN(2000); // Wait for VPN to disconnect
    });

    test('Verify deposit flow AU Neoserf', async ({ browser }) => {
        // Connect to Australian VPN
        await vpnController.vpnDisconnect(); // Ensure disconnected first
        await vpnController.vpnConnect(regionToVpnLocation.AU);
        await vpnController.sleepVPN(5000); // Wait for VPN to connect
        
        // Create context with consistent user agent
        const context = await browser.newContext({ 
            userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) kingBillyleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
        });
        const page = await context.newPage();
        
        // Initialize page manager
        const kingBilly = new KingBilly(page);
        const neoserfPage = new NeosurfPage(page);
        
        await kingBilly.mainPage.navTo('http://kingbillywin24.com');
        await kingBilly.mainPage.clickAcceptCookies();
        const signUpModal = await kingBilly.mainPage.header.clickCreateAccount();
        randomEmail = await kingBilly.methods.generateRandomEmail(11);
        await signUpModal.createAccount({ email: randomEmail, password });
        await kingBilly.depModal.clickOnDepMethod('neoserf');
        await kingBilly.depModal.clickOnDepositButton();
        await kingBilly.depModal.page.waitForTimeout(60000);
        const url = await kingBilly.depModal.getPageUrl();
        expect(
            url.includes('pay2.secure-neosurf.com') || url.includes('pay.neosurf.com')
        ).toBe(true);
        expect(neoserfPage.getNeosurfPageLogo).toBeVisible();
        await expect(page).toHaveScreenshot('au_neoserf.png', {maxDiffPixels: 2000, maxDiffPixelRatio: 0.5});
        const auNeoserfScreenshot = await page.screenshot({ fullPage: false });
        await test.info().attach('au_neoserf.png', { body: auNeoserfScreenshot, contentType: 'image/png' });
        await context.close();
        
        // Disconnect VPN after test
        await vpnController.vpnDisconnect();
        await vpnController.sleepVPN(2000); // Wait for VPN to disconnect
    });

    test('Verify deposit flow NZ credit card', async ({ browser }) => {
        // Connect to New Zealand VPN
        await vpnController.vpnDisconnect(); // Ensure disconnected first
        await vpnController.vpnConnect(regionToVpnLocation.NZ);
        await vpnController.sleepVPN(5000); // Wait for VPN to connect
        
        // Create context with consistent user agent
        const context = await browser.newContext({ 
            userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) kingBillyleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
        });
        const page = await context.newPage();
        
        // Initialize page manager
        const kingBilly = new KingBilly(page);
        
        await kingBilly.mainPage.navTo('http://kingbillycasino.com');
        await kingBilly.mainPage.clickAcceptCookies();
        
        const signUpModal = await kingBilly.mainPage.header.clickCreateAccount();
        randomEmail = await kingBilly.methods.generateRandomEmail(13);
        await signUpModal.createAccount({ email: randomEmail, password });
        const creditCardData = {
            cardNumber: testData.NZ.paymentMethods.creditCard.cardNumber,
            cardHolderName: testData.NZ.paymentMethods.creditCard.nameOnCard,
            expiryDate: testData.NZ.paymentMethods.creditCard.expiryDate,
            cvv: testData.NZ.paymentMethods.creditCard.cvv,
            firstName: testData.NZ.paymentMethods.creditCard.firstName,
            lastName: testData.NZ.paymentMethods.creditCard.lastName,
            address: testData.NZ.paymentMethods.creditCard.address,
            city: testData.NZ.paymentMethods.creditCard.city,
            postalCode: testData.NZ.paymentMethods.creditCard.postalCode,
            mobileNumber: testData.NZ.paymentMethods.creditCard.mobileNumber
        };
        await kingBilly.depModal.selectDateFromDatePicker()
        await kingBilly.depModal.clickOnDepMethod('creditCardNZ');
        // await kingBilly.depModal.selectDateFromDatePicker();
        await kingBilly.depModal.fillCreditCardFieldNZ(creditCardData);
        await kingBilly.depModal.clickOnDepositButton();
        await expect(page).toHaveScreenshot('nz_credit_card.png', {maxDiffPixels: 2000, maxDiffPixelRatio: 0.5});
        const nzCreditCardScreenshot = await page.screenshot({ fullPage: false });
        await test.info().attach('nz_credit_card.png', { body: nzCreditCardScreenshot, contentType: 'image/png' });
        await kingBilly.depModal.page.waitForTimeout(60000);
        expect(kingBilly.depModal.getDepModalError).toBeVisible({ timeout: 5000 });
        await context.close();
        
        // Disconnect VPN after test
        await vpnController.vpnDisconnect();
        await vpnController.sleepVPN(2000); // Wait for VPN to disconnect
    });

     test('Verify deposit flow NZ paysafecard', async ({ browser }) => {
        // Connect to New Zealand VPN
        await vpnController.vpnDisconnect(); // Ensure disconnected first
        await vpnController.vpnConnect(regionToVpnLocation.NZ);
        await vpnController.sleepVPN(5000); // Wait for VPN to connect
        
        // Create context with consistent user agent
        const context = await browser.newContext({ 
            userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) kingBillyleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
        });
        const page = await context.newPage();
        
        // Initialize page manager
        const kingBilly = new KingBilly(page);

        await kingBilly.mainPage.navTo('http://kingbillycasino.com');
        await kingBilly.mainPage.clickAcceptCookies();
        const signUpModal = await kingBilly.mainPage.header.clickCreateAccount();
        randomEmail = await kingBilly.methods.generateRandomEmail(12);
        await signUpModal.createAccount({ email: randomEmail, password });
        await kingBilly.depModal.clickOnDepMethod('paysafecard');
        await kingBilly.depModal.clickOnDepositButton();
        await kingBilly.depModal.page.waitForTimeout(60000);
        expect(kingBilly.depModal.getPaysafeCardModal).toBeVisible({ timeout: 5000 });
        await expect(page).toHaveScreenshot('nz_paysafecard.png', {maxDiffPixels: 2000, maxDiffPixelRatio: 0.5});
        const nzPaysafecardScreenshot = await page.screenshot({ fullPage: false });
        await test.info().attach('nz_paysafecard.png', { body: nzPaysafecardScreenshot, contentType: 'image/png' });
        await context.close();
        
        // Disconnect VPN after test
        await vpnController.vpnDisconnect();
        await vpnController.sleepVPN(2000); // Wait for VPN to disconnect
    });

    
    test('Verify deposit flow CA interact', async ({ browser }) => {
        // Connect to Canada VPN
        await vpnController.vpnDisconnect(); // Ensure disconnected first
        await vpnController.vpnConnect(regionToVpnLocation.CA);
        await vpnController.sleepVPN(5000); // Wait for VPN to connect
        
        // Create context with consistent user agent
        const context = await browser.newContext({ 
            userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) kingBillyleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
        });
        const page = await context.newPage();
        
        // Initialize page manager
        const kingBilly = new KingBilly(page);

        await kingBilly.mainPage.navTo('http://kingbillycasino.com');
        await kingBilly.mainPage.clickAcceptCookies();
        const signInModal = await kingBilly.mainPage.header.clickSignIn();
        await signInModal.fillEmail(testData.CA.credentials.email);
        await signInModal.fillPassword(testData.CA.credentials.password);
        await signInModal.clickSignIn();
        await kingBilly.mainPage.header.clickDepositButton()
        await kingBilly.depModal.clickOnDepMethod('interac');
        await kingBilly.depModal.clickOnDepositButton();
        await kingBilly.depModal.page.waitForTimeout(60000);
        expect(await kingBilly.mainPage.getPageUrl()).toContain('interac.express-connect.com');
        await expect(kingBilly.mainPage.page.locator('.otherPayments > p')).toContainText('Select your bank');
        await expect(page).toHaveScreenshot('ca_interac.png', {maxDiffPixels: 2000, maxDiffPixelRatio: 0.5});
        const caInteracScreenshot = await page.screenshot({ fullPage: false });
        await test.info().attach('ca_interac.png', { body: caInteracScreenshot, contentType: 'image/png' });
        await context.close();
        
        // Disconnect VPN after test
        await vpnController.vpnDisconnect();
        await vpnController.sleepVPN(2000); // Wait for VPN to disconnect
    });

    test('Verify deposit flow CA credit card', async ({ browser }) => {
        // Connect to Canada VPN
        await vpnController.vpnDisconnect(); // Ensure disconnected first
        await vpnController.vpnConnect(regionToVpnLocation.CA);
        await vpnController.sleepVPN(5000); // Wait for VPN to connect
        
        // Create context with consistent user agent
        const context = await browser.newContext({ 
            userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) kingBillyleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
        });
        const page = await context.newPage();
        
        // Initialize page manager
        const kingBilly = new KingBilly(page);

        await kingBilly.mainPage.navTo('http://kingbillycasino.com');
        await kingBilly.mainPage.clickAcceptCookies();
        const signInModal = await kingBilly.mainPage.header.clickSignIn();
        await signInModal.fillEmail(testData.CA.credentials.email);
        await signInModal.fillPassword(testData.CA.credentials.password);
        await signInModal.clickSignIn();
        await kingBilly.mainPage.header.clickDepositButton()
        await kingBilly.depModal.clickOnDepMethod('creditCardCA');
        await kingBilly.depModal.fillCreditCardField({
            cardNumber: testData.CA.paymentMethods.creditCard.cardNumber,
            cardHolderName: testData.CA.paymentMethods.creditCard.nameOnCard,
            expiryDate: testData.CA.paymentMethods.creditCard.expiryDate,
            cvv: testData.CA.paymentMethods.creditCard.cvv,
            isCA: true,
        });
        await kingBilly.depModal.clickOnDepositButton();
        await kingBilly.depModal.page.waitForTimeout(60000);
        await expect(kingBilly.depModal.getDepModalError).toBeVisible({ timeout: 5000 });
        await expect(page).toHaveScreenshot('ca_credit_card.png', {maxDiffPixels: 2000, maxDiffPixelRatio: 0.5});
        await context.close();
        
        // Disconnect VPN after test
        await vpnController.vpnDisconnect();
        await vpnController.sleepVPN(2000); // Wait for VPN to disconnect
    });
});
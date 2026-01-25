import {expect, test} from "@playwright/test";
import { VpnController } from "../../helpers/vpnController";
import KingBilly from "../../src/PageManager/KingBilly";
import { USERS_DEPOSIT_MODAL } from "../../src/Data/testDepositData/depositModalTestUsers";

for(const locale of Object.keys(USERS_DEPOSIT_MODAL)) {
    const {location, user} = USERS_DEPOSIT_MODAL[locale]

    for (const [type, creds] of Object.entries(user)) {
        const {email, password} = creds

        test.describe(`Check ${locale}, ${type}`, () => {
                let kingBilly: KingBilly
                let status: string
                const timeout = 30000;
                const interval = 1000;
                const startTime = Date.now();

                test.beforeEach(async ({page}) => {
                    kingBilly = new KingBilly(page)
                    const vpnController = new VpnController();

                    const currentStatus = await vpnController.vpnCheckStatus();
                    if (currentStatus === `connected to ${location}`) {
                        console.log('Correct location, proceeding to the test');
                    } else if (currentStatus === `Not connected`) {
                        console.log('Connecting...');
                        await vpnController.vpnConnect(location);
                    } else {
                        console.log('Changing location...')
                        await vpnController.vpnDisconnect();
                        await vpnController.sleepVPN(5000)
                        await vpnController.vpnConnect(location);
                        await vpnController.sleepVPN(5000)
                    }

                    do {
                        status = await vpnController.vpnCheckStatus();
                        console.log(`Current status: ${status}`);
                        if (status === `connected to ${location}`) {
                            console.log(`Successfully connected to ${location}`);
                            break;
                        }
                        await new Promise(resolve => setTimeout(resolve, interval));
                    } while (Date.now() - startTime < timeout);
        });



                test(`Visual comparison of dep modal ${locale}. ${type}`, async () => {
                    await kingBilly.mainPage.navTo('/')
                    await kingBilly.mainPage.header.signIn(email, password)
                    await kingBilly.mainPage.header.clickDepositButton()
                    await kingBilly.depModal.getDepModal.waitFor({state: 'visible'})
                    await kingBilly.page.waitForTimeout(15000)

                    await expect(kingBilly.depModal.paymentList).toHaveScreenshot({maxDiffPixels: 500, maxDiffPixelRatio: 0.1, threshold: 0.2})
                })
        })
    }
}
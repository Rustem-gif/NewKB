import { vpnController } from "../../helpers/vpnControllerInstance";
import { USERS_DEPOSIT_MODAL } from "../../src/Data/testDepositData/depositModalTestUsers";
import { expect, test } from "../../src/fixtures/testFixture";

for(const locale of Object.keys(USERS_DEPOSIT_MODAL)) {
    const {location, user} = USERS_DEPOSIT_MODAL[locale]

    for (const [type, creds] of Object.entries(user)) {
        const {email, password} = creds

        test.describe(`Check ${locale}, ${type}`, () => {
                let status: string
                const timeout = 30000;
                const interval = 1000;

                const startTime = Date.now();
                
                test.beforeEach(async () => {


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
                        if (status === `connected`) {
                            console.log(`Successfully connected to ${location}`);
                            break;
                        }
                        await new Promise(resolve => setTimeout(resolve, interval));
                    } while (Date.now() - startTime < timeout);
        });


                test(`Visual comparison of dep modal ${locale}. ${type}`, async ({kingBilly}) => {
                    await kingBilly.mainPage.navTo('/')
                    await kingBilly.mainPage.header.signIn(email, password)
                    await kingBilly.navTo('ProfileDeposit')
                  

                    await kingBilly.page.waitForTimeout(60000)
                    await kingBilly.profilePage.paymentTableDeposit.screenshot({ path: `screenshots/${locale}/depMethods-${locale}-${type}.png`})
                    await kingBilly.navTo('ProfileWithdraw')

                    await kingBilly.page.waitForTimeout(60000)
                    await kingBilly.profilePage.paymentTableWithdraw.screenshot({ path: `screenshots/${locale}/withdMethods-${locale}-${type}.png`})
                    await kingBilly.page.close()
            })
        })
    }
}


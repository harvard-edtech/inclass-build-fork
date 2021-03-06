require('dce-selenium');
const assert = require('assert');

describeS('end-to-end > install followed by uninstall', function () {
  itS('installs and immediately uninstalls app', async function (driver) {
    await driver.launchAppStore(true);
    // click into app page
    await driver.waitForElementVisible('#samsapp-app-title');
    await driver.click('#samsapp-app-title');
    // click the install button
    await driver.waitForElementVisible('#install-button');
    await driver.click('#install-button');
    // click okay button
    await driver.waitForElementVisible('.okay-button');
    await driver.click('.okay-button');
    // leave page
    await driver.waitForElementVisible('#backtoapplistbutton-button');
    await driver.click('#backtoapplistbutton-button');
    // click into another app
    await driver.waitForElementVisible('#gradeup-app-title');
    await driver.click('#gradeup-app-title');
    // click the screenshot tab of another app
    await driver.waitForElementVisible('#screenshots-tab-button');
    await driver.click('#screenshots-tab-button');
    // go back to app list
    await driver.waitForElementVisible('#backtoapplistbutton-button');
    await driver.click('#backtoapplistbutton-button');
    // go back into original app
    await driver.waitForElementVisible('#samsapp-app-title');
    await driver.click('#samsapp-app-title');
    // uninstall the app
    await driver.waitForElementVisible('#uninstall-button');
    await driver.click('#uninstall-button');
    // click okay button
    await driver.waitForElementVisible('.okay-button');
    await driver.click('.okay-button');
    await driver.wait(200);
    assert(await driver.elementExists('#install-button'), 'app was not uninstalled');
  });
});

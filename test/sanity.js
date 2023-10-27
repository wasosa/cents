const {By, Builder} = require('selenium-webdriver');
const assert = require("assert");

async function testElementExists(driver, id)
{
    assert(await driver.findElement(By.id(id)));
}

before(function() {
    let driver;
});

beforeEach(async function() {
    driver = await new Builder().forBrowser('chrome').build();
    await driver.manage().setTimeouts({ implicit: 1000 });
    await driver.get('http://127.0.0.1:5500/index.html');
});

afterEach(async function() {
    await driver.quit();
});

describe('Cent page', function() {
    it('has expected elements', async function() {
        let title = await driver.getTitle();
        assert.equal("Cents", title);
        await testElementExists(driver, 'transactions-file');
        await testElementExists(driver, 'load-transactions-button');
        await testElementExists(driver, 'clear-transactions-button');
        await testElementExists(driver, 'transactions-table');
    });
});

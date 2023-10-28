const {By, Builder} = require('selenium-webdriver');
const assert = require("assert");

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
        assert(await driver.findElement(By.id('transactions-file')));
        assert(await driver.findElement(By.id('load-transactions-button')));
        assert(await driver.findElement(By.id('clear-transactions-button')));
        assert(await driver.findElement(By.id('transactions-table')));
    });
});

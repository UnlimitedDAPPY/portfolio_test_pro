const { until } = require("selenium-webdriver");

class BasePage {
  constructor(driver) {
    this.driver = driver;
  }

  async waitForElement(locator, timeout = 10000) {
    await this.driver.wait(until.elementLocated(locator), timeout);
  }

  async waitForVisible(locator, timeout = 10000) {
    const element = await this.driver.findElement(locator);
    await this.driver.wait(until.elementIsVisible(element), timeout);
    return element;
  }

  async click(locator) {
    const element = await this.waitForVisible(locator);
    await element.click();
  }

  async type(locator, text, delay = 700) {
    const element = await this.waitForVisible(locator);
    await element.clear();
    await element.sendKeys(text);
  }

  async getText(locator) {
    const element = await this.waitForVisible(locator);
    return await element.getText();
  }

  async getUrl() {
    return await this.driver.getCurrentUrl();
  }

  async open(url) {
    await this.driver.get(url);
    await this.driver.manage().window().maximize();
  }
}

module.exports = BasePage;
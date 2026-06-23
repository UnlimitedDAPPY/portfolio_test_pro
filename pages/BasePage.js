// pages/BasePage.js
const { By, until } = require("selenium-webdriver");
const config = require("../utils/config");

class BasePage {
  constructor(driver, speed = config.speed) {
    this.driver = driver;
    
    this.speed = speed === 'slow' ? {
      typeDelay: 100,
      scrollDelay: config.wait.scroll,
      actionDelay: config.wait.action
    } : {
      typeDelay: 0,
      scrollDelay: 300,
      actionDelay: 200
    };
  }

  async waitForPageReady() {
    await this.driver.wait(async () => {
      return await this.driver.executeScript(
        "return document.readyState === 'complete'"
      );
    }, config.wait.pageLoad);
  }

  async waitForElement(locator, timeout = config.wait.element) {
    await this.driver.wait(until.elementLocated(locator), timeout);
  }

  async waitForVisible(locator, timeout = config.wait.element) {
    const element = await this.driver.findElement(locator);
    await this.driver.wait(until.elementIsVisible(element), timeout);
    return element;
  }

  async click(locator) {
    const element = await this.waitForVisible(locator);
    await this.driver.executeScript(
      "arguments[0].scrollIntoView({behavior: 'smooth', block: 'center'});",
      element
    );
    await this.driver.sleep(this.speed.actionDelay);
    await element.click();
  }

  async type(locator, text) {
    const element = await this.waitForVisible(locator);
    await element.clear();
    
    if (this.speed.typeDelay > 0) {
      for (let i = 0; i < text.length; i++) {
        await element.sendKeys(text[i]);
        await this.driver.sleep(this.speed.typeDelay);
      }
    } else {
      await element.sendKeys(text);
    }
  }

  async typeWithDelay(locator, text, delay = 100) {
    const element = await this.waitForVisible(locator);
    await element.clear();
    
    for (let i = 0; i < text.length; i++) {
      await element.sendKeys(text[i]);
      await this.driver.sleep(delay);
    }
  }

  async getText(locator) {
    const element = await this.waitForVisible(locator);
    return await element.getText();
  }

  async open(url) {
    await this.driver.get(url);
    await this.driver.manage().window().maximize();

    await this.driver.wait(async () => {
      return await this.driver.executeScript(
        "return document.readyState === 'complete'"
      );
    }, config.wait.pageLoad);

    await this.driver.wait(
      until.elementLocated(By.tagName("header")),
      config.wait.element
    );
  }
}

module.exports = BasePage;
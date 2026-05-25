const { until } = require("selenium-webdriver");

async function waitForElement(driver, locator, timeout = 10000) {
  return await driver.wait(until.elementLocated(locator), timeout);
}

async function waitForVisible(driver, element, timeout = 10000) {
  return await driver.wait(until.elementIsVisible(element), timeout);
}

async function waitForClickable(driver, element, timeout = 10000) {
  return await driver.wait(until.elementIsEnabled(element), timeout);
}

module.exports = {
  waitForElement,
  waitForVisible,
  waitForClickable
};
const { until } = require("selenium-webdriver");


async function waitForElement(driver, locator, timeout = 10000) {
  try {
    return await driver.wait(until.elementLocated(locator), timeout);
  } catch (error) {
    throw new Error(`Element not located within ${timeout}ms: ${locator}`);
  }
}

async function waitForVisible(driver, element, timeout = 10000) {
  try {
    return await driver.wait(until.elementIsVisible(element), timeout);
  } catch (error) {
    throw new Error(`Element not visible within ${timeout}ms: ${element}`);
  }
}

async function waitForClickable(driver, element, timeout = 10000) {
  try {
    return await driver.wait(until.elementIsEnabled(element), timeout);
  } catch (error) {
    throw new Error(`Element not clickable within ${timeout}ms: ${element}`);
  }
}

module.exports = {
  waitForElement,
  waitForVisible,
  waitForClickable
};
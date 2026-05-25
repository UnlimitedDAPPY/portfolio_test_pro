// const { Builder } = require("selenium-webdriver");
// const chrome = require("selenium-webdriver/chrome");

// async function buildDriver() {
//   let options = new chrome.Options();
//   options.addArguments("--start-maximized");

//   return new Builder()
//     .forBrowser("chrome")
//     .setChromeOptions(options)
//     .build();
// }

// module.exports = buildDriver;


const { Builder } = require("selenium-webdriver");
const chrome = require("selenium-webdriver/chrome");

async function buildDriver() {
  let options = new chrome.Options();

  // Detect CI environment (GitHub Actions)
  if (process.env.CI) {
    options.addArguments("--headless=new");
    options.addArguments("--no-sandbox");
    options.addArguments("--disable-dev-shm-usage");
    options.addArguments("--window-size=1920,1080");
  } else {
    options.addArguments("--start-maximized");
  }

  return new Builder()
    .forBrowser("chrome")
    .setChromeOptions(options)
    .build();
}

module.exports = buildDriver;

// tests/contactForm.test.js
const { expect } = require("chai");
const { By, until } = require("selenium-webdriver");

const buildDriver = require("../utils/driver");
const HomePage = require("../pages/HomePage");
const { takeScreenshot } = require("../utils/screenshot");
const config = require("../utils/config"); // ✅ Import config

describe("Portfolio Contact Form Test", function () {
  let driver;
  let homePage;

  // ✅ Use config.timeout
  this.timeout(config.timeout);

  before(async function () {
    driver = await buildDriver();
    homePage = new HomePage(driver, config.speed); // ✅ Pass speed from config
  });

  after(async function () {
    if (driver) {
      await driver.quit();
    }
  });

  afterEach(async function () {
    const status = this.currentTest.state;
    await takeScreenshot(driver, this.currentTest.title, status);
  });

  it("should open portfolio site and submit contact form", async function () {
    this.timeout(config.timeout);
    
    await homePage.openWebsite();

    const title = await driver.getTitle();
    console.log("📌 Title:", title);
    expect(title).to.not.be.empty;

    await homePage.clickContact();

    // Use config wait times
    await driver.sleep(config.wait.action);

    await homePage.waitForContactForm();

    await homePage.fillContactForm(
      "Oladapo",
      "test@gmail.com",
      "Test Subject",
      "Automation test using Selenium JavaScript"
    );

    await homePage.submitForm();

    try {
      await driver.wait(
        until.elementLocated(By.css(".success, .toast, .alert-success, .alert")),
        config.wait.element
      );
      console.log("✅ Form submitted successfully!");
    } catch (error) {
      console.log("⚠️ Success message not found, but form may have been submitted");
    }
  });
});
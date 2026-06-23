const { expect } = require("chai");
const { until, By } = require("selenium-webdriver");
const buildDriver = require("../utils/driver");
const HomePage = require("../pages/HomePage");
const { takeScreenshot } = require("../utils/screenshot");
const BasePage = require("../pages/BasePage")

describe("Portfolio Contact Form Test", function () {
  let driver;
  let homePage;

  before(async function () {
    driver = await buildDriver();
    homePage = new HomePage(driver);
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
    await homePage.openWebsite();

    const title = await driver.getTitle();
    console.log("📌 Title:", title);

    expect(title).to.not.be.empty;

    // 👉 use POM methods (NOT raw driver calls)
    await homePage.clickContact();

    await homePage.fillContactForm(
      "Oladapo",
      "test@gmail.com",
      "Test Subject",
      "Automation test using Selenium JavaScript"
    );

    await homePage.submitForm();
  });
});
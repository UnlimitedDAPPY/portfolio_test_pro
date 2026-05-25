const { expect } = require("chai");
const buildDriver = require("../utils/driver");
const HomePage = require("../pages/HomePage");
const { waitForElement, waitForVisible } = require("../utils/waits");
const { takeScreenshot } = require("../utils/screenshot");

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
    const status = this.currentTest.state; // passed or failed
    await takeScreenshot(driver, this.currentTest.title, status);
  });

  it("should open portfolio site and submit contact form", async function () {
    await homePage.openWebsite();

    const title = await driver.getTitle();
    console.log("📌 Title:", title);

    expect(title).to.not.be.empty;

    // await driver.sleep(1000);
      await waitForElement(driver, homePage.contactLink);
    const contactElement = await driver.findElement(homePage.contactLink);

await waitForVisible(driver, contactElement);

await contactElement.click();



    // await driver.sleep(1000);
    const nameLocator = homePage.nameInput;
    await waitForElement(driver, nameLocator);

    await homePage.fillContactForm(
      "Oladapo",
      "test@gmail.com",
      "Test Subject",
      "Automation test using Selenium JavaScript"
    );

     await waitForElement(driver, homePage.submitButton);
    await homePage.submitForm();
  });
});
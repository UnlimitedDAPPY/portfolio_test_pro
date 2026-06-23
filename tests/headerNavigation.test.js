const { expect } = require("chai");
const { until, By } = require("selenium-webdriver");
const buildDriver = require("../utils/driver");
const HomePage = require("../pages/HomePage");
const HeaderPage = require("../pages/HeaderPage");
const { takeScreenshot } = require("../utils/screenshot"); 
const { waitForElement, waitForVisible, waitForClickable } = require("../utils/waits")

describe("Header Navigation", function () {
  let driver;
  let homePage;
  let headerPage;

  before(async () => {
    driver = await buildDriver();
    homePage = new HomePage(driver);
    headerPage = new HeaderPage(driver);
  });

  after(async () => {
    await driver.quit();
  });

  it("should navigate to about page", async () => {
    await homePage.openWebsite();
    await headerPage.clickAbout();

    await driver.wait(until.urlContains("/about"), 10000);

    const url = await driver.getCurrentUrl();
    expect(url).to.include("/about");
  });

  it("should navigate to impact page", async () => {
    await homePage.openWebsite();
    await headerPage.clickImpact();

    await driver.wait(until.urlContains("/impact"), 10000);

    const url = await driver.getCurrentUrl();
    expect(url).to.include("/impact");
  });

  it("should navigate to service page", async () => {
    await homePage.openWebsite();
    await headerPage.clickService();

    await driver.wait(until.urlContains("/service"), 10000);

    const url = await driver.getCurrentUrl();
    expect(url).to.include("/service");
  });

  it("should navigate to projects page", async () => {
    await homePage.openWebsite();
    await headerPage.clickProjects();

    await driver.wait(until.urlContains("/projects"), 10000);

    const url = await driver.getCurrentUrl();
    expect(url).to.include("/projects");
  });

  it("should navigate to contact page", async () => {
    await homePage.openWebsite();
    await headerPage.clickContact();

    await driver.wait(until.urlContains("/contact"), 10000);

    const url = await driver.getCurrentUrl();
    expect(url).to.include("/contact");
  });
});
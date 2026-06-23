const { expect } = require("chai");
const { until } = require("selenium-webdriver");

const buildDriver = require("../utils/driver");
const HomePage = require("../pages/HomePage");
const HeaderPage = require("../pages/HeaderPage");
const { takeScreenshot } = require("../utils/screenshot");



// describe("Header Navigation", function () {

//   let driver;
//   let homePage;
//   let headerPage;

//   before(async () => {
//     driver = await buildDriver();
//     homePage = new HomePage(driver);
//     headerPage = new HeaderPage(driver);
//   });

//   after(async () => {
//     await driver.quit();
//   });

//   it("should navigate to about page", async () => {
//     await homePage.openWebsite();
//     await headerPage.clickAbout();

//     await driver.wait(until.urlContains("about"), 10000);

//     const url = await driver.getCurrentUrl();
//     expect(url).to.include("#about");
//   });

//   it("should navigate to impact page", async () => {
//     await homePage.openWebsite();
//     await headerPage.clickImpact();

//     await driver.wait(until.urlContains("impact"), 10000);

//     const url = await driver.getCurrentUrl();
//     expect(url).to.include("#impact");
//   });

//   it("should navigate to service page", async () => {
//     await homePage.openWebsite();
//     await headerPage.clickService();

//     await driver.wait(until.urlContains("/#service"), 10000);

//     const url = await driver.getCurrentUrl();
//     expect(url).to.include("/#service");
//   });

//   it("should navigate to projects page", async () => {
//     await homePage.openWebsite();
//     await headerPage.clickProjects();

//     await driver.wait(until.urlContains("/#projects"), 10000);

//     const url = await driver.getCurrentUrl();
//     expect(url).to.include("/#projects");
//   });

//   it("should navigate to contact page", async () => {
//     await homePage.openWebsite();
//     await headerPage.clickContact();

//     await driver.wait(until.urlContains("/#contact"), 10000);

//     const url = await driver.getCurrentUrl();
//     expect(url).to.include("/#contact");
//   });
// });


describe("Header Navigation", function () {
  let driver;
  let homePage;
  let headerPage;

  this.timeout(60000);

  before(async function() {
    driver = await buildDriver();
    homePage = new HomePage(driver, 'normal');
    headerPage = new HeaderPage(driver, 'normal');
  });

  after(async function() {
    if (driver) {
      await driver.quit();
    }
  });

  beforeEach(async function() {
    await homePage.openWebsite();
  });

   it("should navigate to home page", async function() {
    await headerPage.clickHome();
    const url = await driver.getCurrentUrl();
    expect(url).to.include("/#home");
  });

 it("should navigate to about page", async function () {
    await headerPage.clickAbout();
    const url = await driver.getCurrentUrl();
    expect(url).to.include("/#about");
  });

 it("should navigate to impact page", async function () {
    await headerPage.clickImpact();
    const url = await driver.getCurrentUrl();
    expect(url).to.include("/#impact");
  });

  it("should navigate to services page", async function() {
    await headerPage.clickServices();
    const url = await driver.getCurrentUrl();
    expect(url).to.include("/#services");
  });

  it("should navigate to projects page", async function() {
    await headerPage.clickProjects();
    const url = await driver.getCurrentUrl();
    expect(url).to.include("/#projects");
  });

  it("should navigate to contact page", async function() {
    await headerPage.clickContact();
    const url = await driver.getCurrentUrl();
    expect(url).to.include("/#contact");
  });
});
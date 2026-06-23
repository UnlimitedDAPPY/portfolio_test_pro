const { By, until } = require("selenium-webdriver");
// const { waitForElement, waitForVisible } = require("../utils/waits");
const BasePage = require("./BasePage");

class HeaderPage extends BasePage {
  constructor(driver) {
    super(driver);

    this.about = By.linkText("About");
    this.impact = By.linkText("Impact");
    this.service = By.linkText("Service");
    this.projects = By.linkText("Projects");
    this.contact = By.linkText("Contact");

    this.headerContainer = By.tagName("header");
  }

  async waitForHeader() {
    await this.driver.wait(until.elementLocated(this.headerContainer), 10000);
  }

  async clickAbout() {
    await this.waitForHeader();
    await this.click(this.about);
  }

  async clickImpact() {
    await this.waitForHeader();
    await this.click(this.impact);
  }

  async clickService() {
    await this.waitForHeader();
    await this.click(this.service);
  }

  async clickProjects() {
    await this.waitForHeader();
    await this.click(this.projects);
  }

  async clickContact() {
    await this.waitForHeader();
    await this.click(this.contact);
  }
}

module.exports = HeaderPage;
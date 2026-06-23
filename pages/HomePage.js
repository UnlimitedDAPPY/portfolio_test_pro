const { until, By } = require("selenium-webdriver");
const BasePage = require("./BasePage");
const config = require("../utils/config");

class HomePage extends BasePage {
  constructor(driver, speed = config.speed) {
    super(driver, speed);

    this.url = config.url;
    // "https://my-portfolio-black-iota-atxsufcgdd.vercel.app";

    this.contactLink = By.linkText("Contact");
    this.nameInput = By.name("name");
    this.emailInput = By.name("email");
    this.subjectInput = By.name("subject");
    this.messageInput = By.name("message");
    this.submitButton = By.linkText("Send Message");
  }

  async openWebsite() {
    await this.open(this.url);
  }

  async clickContact() {
    await this.click(this.contactLink);
  }

async waitForContactForm() {
    try {
      await this.driver.wait(until.elementLocated(this.nameInput), config.wait.element);
      const nameField = await this.driver.findElement(this.nameInput);
      await this.driver.wait(until.elementIsVisible(nameField), config.wait.element);
      console.log("✅ Contact form loaded successfully");
    } catch (error) {
      console.log("❌ Contact form not found, trying alternative...");
      await this.driver.wait(until.elementLocated(By.css("input, textarea")), config.wait.element);
    }
  }

  async fillContactForm(name, email, subject, message) {
    await this.type(this.nameInput, name);
    await this.type(this.emailInput, email);
    await this.type(this.subjectInput, subject);
    await this.type(this.messageInput, message);
  }

  // async submitForm() {
  //   await this.click(this.submitButton);
  // }
}

module.exports = HomePage;
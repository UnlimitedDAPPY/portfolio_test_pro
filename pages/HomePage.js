const { By } = require("selenium-webdriver");
const BasePage = require("./BasePage");

class HomePage extends BasePage {
  constructor(driver) {
    super(driver);

    this.url = "http://localhost:5173";
    // "https://my-portfolio-black-iota-atxsufcgdd.vercel.app";

    this.contactLink = By.xpath("//a[contains(text(),'Contact')]");
    this.nameInput = By.name("name");
    this.emailInput = By.name("email");
    this.subjectInput = By.name("subject");
    this.messageInput = By.name("message");
    this.submitButton = By.xpath("//*[@id='contact']/div/div[2]/form/button");
  }

  async openWebsite() {
    await this.open(this.url);
  }

  async clickContact() {
    await this.click(this.contactLink);
  }

  async fillContactForm(name, email, subject, message) {
    await this.type(this.nameInput, name);
    await this.type(this.emailInput, email);
    await this.type(this.subjectInput, subject);
    await this.type(this.messageInput, message);
  }

  async submitForm() {
    await this.click(this.submitButton);
  }
}

module.exports = HomePage;
const { By } = require("selenium-webdriver");
const { waitForVisible } = require("../utils/waits");


class HomePage {
  constructor(driver) {
    this.driver = driver;

    this.contactLink = By.xpath("//a[contains(text(),'Contact')]");
    this.nameInput = By.name("name");
    this.emailInput = By.name("email");
    this.subjectInput = By.name("subject");
    this.messageInput = By.name("message");
    this.submitButton = By.xpath("//*[@id='contact']/div/div[2]/form/button");
  }

  async openWebsite() {
    await this.driver.get("https://my-portfolio-black-iota-atxsufcgdd.vercel.app");
    await this.driver.manage().window().maximize();

  }

  async clickContact() {
    const contactElement = await this.driver.findElement(this.contactLink);

    await waitForVisible(this.driver, contactElement);
    
    await contactElement.click();
  }

  async fillContactForm(name, email, subject, message) {
    await this.driver.findElement(this.nameInput).sendKeys(name);
    await this.driver.findElement(this.emailInput).sendKeys(email);
    await this.driver.findElement(this.subjectInput).sendKeys("Test Subject");
    await this.driver.findElement(this.messageInput).sendKeys(message);
  }

  async submitForm() {
    await this.driver.findElement(this.submitButton).click();
  }
}

module.exports = HomePage;
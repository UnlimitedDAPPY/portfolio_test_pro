const {expect} = require("chai");
const { By, until } = require("selenium-webdriver");
const BasePage = require("./BasePage");
const config = require("../utils/config");

// class HeaderPage extends BasePage {
//   constructor(driver) {
//     super(driver);

//     this.about = By.linkText("About");
//     this.impact = By.linkText("Impact");
//     this.service = By.linkText("Service");
//     this.projects = By.linkText("Projects");
//     this.contact = By.linkText("Contact");

//     this.headerContainer = By.tagName("header");
//   }

//   async waitForHeader() {
//     await this.driver.wait(until.elementLocated(this.headerContainer), 10000);

//      await this.driver.wait(
//       until.elementIsVisible(header),
//       10000
//     );
//   }

//   // async clickNav(locator, urlPart) {
//   //   await this.waitForHeader();
//   //   await this.click(locator);

//   //   await this.driver.wait(async () => {
//   //     const url = await this.driver.getCurrentUrl();
//   //     return url.includes(urlPart);
//   //   }, 10000);
//   // }

//   async clickAndWait(locator, urlPart, anchorSelector) {
//   await this.click(locator);

//   await this.driver.wait(until.urlContains(urlPart), 10000);

//   const element = await this.driver.findElement(anchorSelector);

//   await this.driver.wait(until.elementIsVisible(element), 10000);
// }

// async clickAbout() {
//   await this.click(this.about);

//   const section = By.css("#about, section.about");

//   await this.driver.wait(
//     until.elementLocated(section),
//     10000
//   );

//   await this.driver.wait(
//     until.elementIsVisible(await this.driver.findElement(section)),
//     10000
//   );
// }

//   // async clickImpact() {
//   //   await this.clickNav(this.impact, "/impact");
//   // }

// async clickImpact() {
//   await this.click(this.impact);

//   const section = By.css("#impact, section.impact");

//   await this.driver.wait(
//     until.elementLocated(section),
//     10000
//   );

//   await this.driver.wait(
//     until.elementIsVisible(await this.driver.findElement(section)),
//     10000
//   );
// }

// async clickService() {
//   await this.click(this.service);

//   const section = By.css("#service, section.service");

//   await this.driver.wait(
//     until.elementLocated(section),
//     10000
//   );

//   await this.driver.wait(
//     until.elementIsVisible(await this.driver.findElement(section)),
//     10000
//   );
// }

// async clickProjects() {
//   await this.click(this.projects);

//   const section = By.css("#projects, section.projects");

//   await this.driver.wait(
//     until.elementLocated(section),
//     10000
//   );

//   await this.driver.wait(
//     until.elementIsVisible(await this.driver.findElement(section)),
//     10000
//   );
// }

// async clickContact() {
//   await this.click(this.contact);

//   const section = By.css("#contact, section.contact");

//   await this.driver.wait(
//     until.elementLocated(section),
//     10000
//   );

//   await this.driver.wait(
//     until.elementIsVisible(await this.driver.findElement(section)),
//     10000
//   );
// }
// }

  // async clickContact() {
  //   await this.clickNav(this.contact, "/contact");
  // }

  // async clickContact() {
  //   await this.waitForHeader();
  //   await this.click(this.contact);
  // }


  
class HeaderPage extends BasePage {
  constructor(driver, speed = config.speed) {
    super(driver, speed);

    this.home = By.linkText("Home");
    this.about = By.linkText("About");
    this.impact = By.linkText("Impact");
    this.services = By.linkText("Services");
    this.projects = By.linkText("Projects");
    this.contact = By.linkText("Contact");

    this.headerContainer = By.tagName("header");
  }

   async clickAndScrollToSection(linkLocator, sectionId, sectionSelector) {
    await this.click(linkLocator);

    // ✅ MUST use lowercase
    const sectionIdLower = sectionId.toLowerCase();
    await this.driver.wait(until.urlContains(`/#${sectionIdLower}`), config.wait.element);
   }

  async waitForHeader() {
    await this.driver.wait(until.elementLocated(this.headerContainer), config.wait.element);
    
    // ✅ Fixed: Define 'header' variable
    const header = await this.driver.findElement(this.headerContainer);
    await this.driver.wait(until.elementIsVisible(header), config.wait.element);
  }

  // ✅ Generic method to click and scroll to section
  async clickAndScrollToSection(linkLocator, sectionId, sectionSelector) {
    // Click the navigation link
    await this.click(linkLocator);

    // Wait for URL to include the section
    await this.driver.wait(until.urlContains(`/#${sectionId}`), config.wait.element);

    // Wait for section to be located
    const section = By.css(sectionSelector);
    await this.driver.wait(until.elementLocated(section), config.wait.element);
    
    // Wait for section to be visible
    const element = await this.driver.findElement(section);
    await this.driver.wait(until.elementIsVisible(element), config.wait.element);

    // ✅ Scroll to the section
    await this.driver.executeScript(
      `arguments[0].scrollIntoView({behavior: 'smooth', block: 'start'});`,
      element
    );

    // Wait for scroll animation to complete
    await this.driver.sleep(1000);

    // ✅ Verify URL contains the section
    const url = await this.driver.getCurrentUrl();
    if (!url.includes(`/#${sectionId}`)) {
      throw new Error(`URL does not contain /#${sectionId}`);
    }
  }

  // ✅ Navigation methods using the generic method
   async clickHome() {
    await this.clickAndScrollToSection(
      this.home,
      "Home",
      "#home, section.home"
    );
  }
  
  async clickAbout() {
    await this.clickAndScrollToSection(
      this.about,
      "About",
      "#about, section.about"
    );
  }

  async clickImpact() {
    await this.clickAndScrollToSection(
      this.impact,
      "Impact",
      "#impact, section.impact"
    );
  }

  async clickServices() {
    await this.clickAndScrollToSection(
      this.services,
      "Services",
      "#services, section.services"
    );
  }

  async clickProjects() {
    await this.clickAndScrollToSection(
      this.projects,
      "Projects",
      "#projects, section.projects"
    );
  }

  async clickContact() {
    await this.clickAndScrollToSection(
      this.contact,
      "contact",
      "#contact, section.contact"
    );
  }
}


module.exports = HeaderPage;
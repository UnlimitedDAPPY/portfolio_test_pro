const fs = require("fs");
const path = require("path");

async function takeScreenshot(driver, testName, status = "unknown") {
  const screenshotsDir = path.join(__dirname, "../screenshots");

  if (!fs.existsSync(screenshotsDir)) {
    fs.mkdirSync(screenshotsDir);
  }

  const cleanName = testName.replace(/ /g, "_");
  const fileName = `${cleanName}_${status}_${Date.now()}.png`;

  const filePath = path.join(screenshotsDir, fileName);

  const image = await driver.takeScreenshot();
  fs.writeFileSync(filePath, image, "base64");

  console.log(`📸 Screenshot saved: ${fileName}`);
}

module.exports = { takeScreenshot };
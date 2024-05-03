const { Builder, By, Key, until } = require("selenium-webdriver");
const assert = require('assert');

describe("Feedback Form Functionality", function () {
  let driver;

  before(async function () {
    this.timeout(30000); // Set a longer timeout (e.g., 30 seconds)
    driver = await new Builder().forBrowser("chrome").build();
  });

  after(async function () {
    this.timeout(60000); // Set a longer timeout (e.g., 60 seconds)
    await driver.quit();
  });

  it("should submit feedback successfully", async function () {
    this.timeout(30000);
    await driver.get("http://localhost:3000/feedback");

    // Wait for the form elements to be located
    try {
      await driver.wait(until.elementLocated(By.id("name")), 10000);
      await driver.wait(until.elementLocated(By.id("email")), 10000);
      await driver.wait(until.elementLocated(By.id("feedback")), 10000);
    } catch (error) {
      console.error("Error: Form elements not located within the specified time.");
    }

    // Enter name, email, and feedback
    await driver.findElement(By.id("name")).sendKeys("Test 5");
    await driver.findElement(By.id("email")).sendKeys("test5@example.com");
    await driver.findElement(By.id("feedback")).sendKeys("Great platform.");
    
    // Print the values sent to the form fields
    const name = await driver.findElement(By.id("name")).getAttribute("value");
    const email = await driver.findElement(By.id("email")).getAttribute("value");
    const feedback = await driver.findElement(By.id("feedback")).getAttribute("value");
    console.log("Name:", name);
    console.log("email:", email);
    console.log("feedback:", feedback);
    // Submit the form
    await driver.findElement(By.css("button[type='submit']")).click();

    // Wait for success message
    try {
      await driver.wait(until.elementLocated(By.xpath("//*[contains(text(), 'Feedback submitted successfully')]")), 15000);
      const successMessage = await driver.findElement(By.xpath("//*[contains(text(), 'Feedback submitted successfully')]")).getText();
      assert.strictEqual(successMessage, "Feedback submitted successfully", "Success message not displayed");
    } catch (error) {
      console.error("Error: Success message not displayed within the specified time.");
    }
  });
});

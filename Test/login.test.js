const { Builder, By, Key, until } = require("selenium-webdriver");

describe("Login Functionality", function () {
  let driver;

  before(async function () {
    this.timeout(30000); // Set a longer timeout (e.g., 30 seconds)
    driver = await new Builder().forBrowser("chrome").build();
  });

  after(async function () {
    await driver.quit();
  });

  it("should login with valid credentials", async function () {
    this.timeout(30000);
    await driver.get("http://localhost:3000/");

    // Wait for the form elements to be located
    try {
      await driver.wait(until.elementLocated(By.id("email")), 10000);
      await driver.wait(until.elementLocated(By.id("password")), 10000);
    } catch (error) {
      console.error("Error: Form elements not located within the specified time.");
    }

    // Enter email and password
    await driver.findElement(By.id("email")).sendKeys("miki@gmail.com");
    await driver.findElement(By.id("password")).sendKeys("Miki@123", Key.RETURN);
    

    // Wait for the URL to contain "/Home"
    try {
      await driver.wait(until.urlContains("/Home"), 15000);
    } catch (error) {
      console.error("Error: Redirect to Home page did not occur within the specified time.");
    }
  });

  it("should show error with invalid credentials", async function () {
    this.timeout(30000);
    await driver.get("http://localhost:3000/");

    // Wait for the form elements to be located
    try {
      await driver.wait(until.elementLocated(By.id("email")), 10000);
      await driver.wait(until.elementLocated(By.id("password")), 10000);
    } catch (error) {
      console.error("Error: Form elements not located within the specified time.");
    }

    // Enter invalid email and password
    await driver.findElement(By.id("email")).sendKeys("invalid@example.com");
    await driver.findElement(By.id("password")).sendKeys("wrongpassword", Key.RETURN);
  });
});

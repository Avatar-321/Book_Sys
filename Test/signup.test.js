const { Builder, By, Key, until } = require("selenium-webdriver");

describe("Signup Functionality", function () {
  let driver;

  before(async function () {
    this.timeout(30000); // Set a longer timeout (e.g., 30 seconds)
    driver = await new Builder().forBrowser("chrome").build();
  });

  after(async function () {
    this.timeout(60000); // Set a longer timeout (e.g., 60 seconds)
    await driver.quit();
  });

  it("should signup with valid credentials", async function () {
    this.timeout(30000);
    await driver.get("http://localhost:3000/signup"); 
    try {
      await driver.wait(until.elementLocated(By.id("form1")), 10000);
      await driver.wait(until.elementLocated(By.id("form2")), 10000);
      await driver.wait(until.elementLocated(By.id("form3")), 10000);
    } catch (error) {
      console.error("Error: Form elements not located within the specified time.");
    }

    // Enter username, email, and password
    await driver.findElement(By.id("form1")).sendKeys("test 5");
    await driver.findElement(By.id("form2")).sendKeys("test5@gmail.com");
    await driver.findElement(By.id("form3")).sendKeys("Test5@123", Key.RETURN);

    // Print the values sent to the form fields
    const username = await driver.findElement(By.id("form1")).getAttribute("value");
    const email = await driver.findElement(By.id("form2")).getAttribute("value");
    const password = await driver.findElement(By.id("form3")).getAttribute("value");
    console.log("Username:", username);
    console.log("Email:", email);
    console.log("Password:", password);

    try {
      await driver.wait(until.urlContains("/"), 15000);
    } catch (error) {
      console.error("Error: Redirect to Home page did not occur within the specified time.");
    }
  });
});

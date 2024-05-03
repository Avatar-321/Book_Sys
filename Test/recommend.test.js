// test.js

const { Builder, By, until } = require("selenium-webdriver");
const axios = require('axios');

describe("Recommendations Functionality", function () {
  let driver;

  before(async function () {
    this.timeout(30000); // Set a longer timeout (e.g., 30 seconds)
    driver = await new Builder().forBrowser("chrome").build();
  });

  after(async function () {
    await driver.quit();
  });

  it("should fetch recommendations when form is submitted", async function () {
    this.timeout(30000);
    await driver.get("http://localhost:3000/recommend"); // Assuming the recommendations page URL is http://localhost:3000/recommendations

    // Wait for the form element to be located
    try {
      await driver.wait(until.elementLocated(By.id("user_input")), 10000);
    } catch (error) {
      console.error("Error: Form element not located within the specified time.");
    }

    // Enter book title
    await driver.findElement(By.id("user_input")).sendKeys("1984");

    // Submit form
    await driver.findElement(By.css("button[type='submit']")).click();

    // Fetch recommendations from Flask server
    try {
        const response = await axios.post('http://localhost:5000/recommend', {
            user_input: "1984"
        });

        const recommendations = response.data;

        // Use recommendations as needed in your test
        console.log(recommendations);
    } catch (error) {
        console.error("Error fetching recommendations:", error);
    }

    // ... rest of the test code
  });
});

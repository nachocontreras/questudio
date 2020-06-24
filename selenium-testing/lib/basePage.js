const {Builder, By, until, promise} = require('selenium-webdriver');

const firefox = require('selenium-webdriver/firefox');
let options = new firefox.Options();

options.addArguments('disable-infobars');

var Page = function () {
  this.driver = new Builder()
    .setFirefoxOptions(options)
    .forBrowser('firefox')
    .build();

  this.visit = async function(url) {
    return await this.driver.get(url);
  };

  this.quit = async function() {
    return await this.driver.quit();
  };

  this.findById = async function(id) {
    await this.driver.wait(until.elementLocated(By.id(id)), 15000, 'Looking for element');
    return await this.driver.findElement(By.id(id));
  };

  this.findByName = async function(name) {
    await this.driver.wait(until.elementLocated(By.name(name)), 15000, 'Looking for element');
    return await this.driver.findElement(By.name(name));
  };

  this.findByTagName = async function(name) {
    await this.driver.wait(until.elementLocated(By.tagName(name)), 15000, 'Looking for element');
    return await this.driver.findElement(By.tagName(name));
  };

  this.findByLinkText = async function(text) {
    await this.driver.wait(until.elementLocated(By.linkText(text)), 15000, 'Looking for element');
    return await this.driver.findElement(By.linkText(text));
  };

  this.findLinksByHref = async function(hrefLink) {
    const anchors = await this.driver.findElements(By.tagName('a'));

    let found = await promise.filter(anchors, async (anchor) => {
      let value = await anchor.getAttribute("href");

      return value ? value.includes(hrefLink) : false;
    });

    return found;
  };

  this.findInputsByName = async function(inputName) {
    const inputs = await this.driver.findElements(By.tagName('input'));

    let found = await promise.filter(inputs, async (input) => {
      let name = await input.getAttribute("name");
      return name.includes(inputName);
    });

    return found;

  }

  this.write = async function(elem, text) {
    return await elem.sendKeys(text);
  };
};

module.exports = Page;

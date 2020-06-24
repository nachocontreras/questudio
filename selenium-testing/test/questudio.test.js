const URL = 'https://questudio-cl.herokuapp.com';

const { describe, it, after, before } = require('mocha');
const chai = require('chai');
const expect = chai.expect;
const chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);

const Page = require('../lib/questudioPage');

process.on('unhandlerejection', () => {});

(
  async function TestSuite() {
    try {
      describe ('User navegation', async function () {
        this.timeout(50000);
        let driver, page;

        beforeEach (async () => {
          page = new Page();
          driver = page.driver;
          await page.visit(URL);
        });

        afterEach (async () => {
          await page.quit();
        });

        it ('Anonymous user: Find the university box and browse to a career', async () => {
          let result = await page.browseUniversitiesAndCarrers();
          expect(result.success).to.equal(true);
        });

        it ('Anonymous user: Log in using seed email and password', async () => {
          const result = await page.logIn();
          expect(result.success).to.equal(true);
        });

        it ('Logged user: Log in using seed email and password and then post experience', async () => {
          const result = await page.postExperience();
          expect(result.success).to.equal(true);
        });
      });
    } catch (e) {
      console.log(new Error(e.message));
    } finally {

    }
  }
)();

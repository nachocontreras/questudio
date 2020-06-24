let Page = require('./basePage');

const {
  logInLink,
  userEmail,
  userPassword,
  universityHomeLinkName,
  someUniversityName,
  someCarrerName,
  someQuestionText,
  searchInputSelectorId,
  searchButtonSelectorName,
  resultConfirmationSelectorId,
} = require('../data');


Page.prototype.browseUniversitiesAndCarrers = async function () {
    let link = await this.findByLinkText(universityHomeLinkName);
    link.click();
    link = await this.findByLinkText(someUniversityName);
    await link.click();
    link = await this.findByLinkText(someCarrerName);
    await link.click();

    const result = await this.driver.wait(async function () {
        return {
            success: true,
        }
    }, 5000);
    return result;
};

Page.prototype.logIn = async function () {
  const logInLinks = await this.findLinksByHref(logInLink);
  try {
    await logInLinks[0].click();
  } catch (e) {
    throw new Error(`No se encontró el link del log in: ${logInLink}`,);
  };

  const emailInputs = await this.findInputsByName('email');
  await this.write(emailInputs[0], userEmail);

  const passwordsInputs = await this.findInputsByName('password');
  await this.write(passwordsInputs[0], userPassword);

  const loginButtons = await this.findInputsByName('sign-in');
  await loginButtons[0].click();

  const profileLinks = await this.findLinksByHref('profile');
  await profileLinks[0].click();

  return await this.driver.wait(async function() {
    return {
      success: true,
    }
  }, 5000);
}

Page.prototype.postExperience = async function () {
  await this.logIn();
  await this.browseUniversitiesAndCarrers();

  const questionInputs = await this.findInputsByName('description');
  await this.write(questionInputs[0], someQuestionText);

  const createInputs = await this.findInputsByName('create');
  await createInputs[0].click();

  return await this.driver.wait(async function() {
    return {
      success: true,
    }
  }, 5000);
}


module.exports = Page;

require('dotenv').config();

module.exports = {
  userEmail: process.env.TEST_USER_EMAIL,
  userPassword: process.env.TEST_USER_PASSWORD,

  universityHomeLinkName: 'Universidades',
  someUniversityName: 'Universidad de Chile',
  someCarrerName: 'Ingeniería',
  someQuestionText: 'Alguno sabe que becas se pueden obtener para esta carrera?',

  logInLink: 'account/signin',
}

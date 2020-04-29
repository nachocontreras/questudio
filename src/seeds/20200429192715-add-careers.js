'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('Person', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */
    const careersData = [
      {
        name: "Ingeniería",
        area: "Ciencias",
        vacancies: 893,
        minScore: 710,
        duration: 11,
        universityId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Derecho",
        area: "Humanidades",
        vacancies: 635,
        minScore: 710,
        duration: 10,
        universityId: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Kinesiología",
        area: "Salud",
        vacancies: 231,
        minScore: 690,
        duration: 10,
        universityId: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Educación Parvularia",
        area: "Educación",
        vacancies: 114,
        minScore: 680,
        duration: 8,
        universityId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Astrofísica",
        area: "Física",
        vacancies: 50,
        minScore: 674,
        duration: 8,
        universityId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Ingeniería",
        area: "Física",
        vacancies: 50,
        minScore: 674,
        duration: 8,
        universityId: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]

    return queryInterface.bulkInsert('careers', careersData);
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
    */
    return queryInterface.bulkDelete('careers', null, {});
  }
};

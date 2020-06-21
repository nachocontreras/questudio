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
        mathScore: 0.35,
        lengScore: 0.1,
        scienceScore: 0.15,
        histScore: null,
        nemScore: 0.2,
        rankScore: 0.2,
        corte: 735,
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
        mathScore: 0.1,
        lengScore: 0.25,
        scienceScore: null,
        histScore: 0.25,
        nemScore: 0.2,
        rankScore: 0.2,
        corte: 710,
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
        mathScore: 0.1,
        lengScore: 0.1,
        scienceScore: 0.3,
        histScore: null,
        nemScore: 0.1,
        rankScore: 0.4,
        corte: 644.8,
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
        mathScore: 0.2,
        lengScore: 0.2,
        scienceScore: 0.2,
        histScore: 0.2,
        nemScore: 0.2,
        rankScore: 0.2,
        corte: 600.6,
        minScore: 600.6,
        duration: 8,
        universityId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Astrofísica",
        area: "Física",
        vacancies: 50,
        mathScore: 0.35,
        lengScore: 0.1,
        scienceScore: 0.15,
        histScore: null,
        nemScore: 0.2,
        rankScore: 0.2,
        corte: 721.85,
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
        mathScore: 0.45,
        lengScore: 0.1,
        scienceScore: 0.15,
        histScore: null,
        nemScore: 0.1,
        rankScore: 0.2,
        corte: 727,
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

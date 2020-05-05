'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    const vocationalTests = [
      {
        createdAt: new Date(),
        updatedAt: new Date(),
        description: "¿Aceptarías trabajar escribiendo artículos en la sección económica de un diario?",
        vocationalTestId: 1,
        allowMultiple: false,
        questionType: "true-false"
      },
      {
        createdAt: new Date(),
        updatedAt: new Date(),
        description: "¿Te ofrecerías para organizar la despedida de soltero de uno de tus amigos?",
        vocationalTestId: 1,
        allowMultiple: false,
        questionType: "true-false"
      },
      {
        createdAt: new Date(),
        updatedAt: new Date(),
        description: "¿Te gustaría dirigir un proyecto de urbanización en tu provincia?",
        vocationalTestId: 1,
        allowMultiple: false,
        questionType: "true-false"
      },
      {
        createdAt: new Date(),
        updatedAt: new Date(),
        description: "¿A una frustración siempre opones un pensamiento positivo?",
        vocationalTestId: 1,
        allowMultiple: false,
        questionType: "true-false"
      },
      {
        createdAt: new Date(),
        updatedAt: new Date(),
        description: "¿Te dedicarías a socorrer a personas accidentadas o atacadas por asaltantes?",
        vocationalTestId: 1,
        allowMultiple: false,
        questionType: "true-false"
      }
    ]
    return queryInterface.bulkInsert('questions', vocationalTests);
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('Person', null, {});
    */
  }
};

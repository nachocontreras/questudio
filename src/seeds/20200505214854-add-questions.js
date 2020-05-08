'use strict';

var fs = require('fs');

let questionsChaside = []

fs.readFileSync(__dirname + '/chaside.txt', 'utf-8').split(/\r?\n/).forEach(function(line){
  questionsChaside.push(line);
});

module.exports = {
  up: (queryInterface, Sequelize) => {
    let vocationalTests = [];
    let _position = 1;
    let body = null;
    questionsChaside.forEach(question => {
      body = {
        createdAt: new Date(),
        updatedAt: new Date(),
        description: question,
        vocationalTestId: 1,
        allowMultiple: false,
        questionType: "true-false",
        position: _position
      };
      vocationalTests.push(body);
      _position += 1;
    });
    // const vocationalTests = [
    //   {
    //     createdAt: new Date(),
    //     updatedAt: new Date(),
    //     description: "¿Aceptarías trabajar escribiendo artículos en la sección económica de un diario?",
    //     vocationalTestId: 1,
    //     allowMultiple: false,
    //     questionType: "true-false",
    //     position: 1
    //   },
    //   {
    //     createdAt: new Date(),
    //     updatedAt: new Date(),
    //     description: "¿Te ofrecerías para organizar la despedida de soltero de uno de tus amigos?",
    //     vocationalTestId: 1,
    //     allowMultiple: false,
    //     questionType: "true-false",
    //     position: 2
    //   },
    //   {
    //     createdAt: new Date(),
    //     updatedAt: new Date(),
    //     description: "¿Te gustaría dirigir un proyecto de urbanización en tu provincia?",
    //     vocationalTestId: 1,
    //     allowMultiple: false,
    //     questionType: "true-false",
    //     position: 3
    //   },
    //   {
    //     createdAt: new Date(),
    //     updatedAt: new Date(),
    //     description: "¿A una frustración siempre opones un pensamiento positivo?",
    //     vocationalTestId: 1,
    //     allowMultiple: false,
    //     questionType: "true-false",
    //     position: 4
    //   },
    //   {
    //     createdAt: new Date(),
    //     updatedAt: new Date(),
    //     description: "¿Te dedicarías a socorrer a personas accidentadas o atacadas por asaltantes?",
    //     vocationalTestId: 1,
    //     allowMultiple: false,
    //     questionType: "true-false",
    //     position: 5
    //   }
    // ]
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

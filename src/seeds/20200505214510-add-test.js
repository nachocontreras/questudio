'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    const vocationalTests = [
      {
        createdAt: new Date(),
        updatedAt: new Date(),
        name: "CHASIDE- Test de orientación vocacional",
        description: `Este test facilita la adecuada elección de una carrera, por lo que deberán interpretar la misma como un instrumento autoevaluable.
Esta prueba que se puede denominar -Movilizadora-Reflexiva- considero es el punto de partida para esclarecer la orientación vocacional.`
      }
    ]
    return queryInterface.bulkInsert('vocationalTests', vocationalTests);
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('Person', null, {});
    */
    return queryInterface.bulkDelete('vocationalTests', null, {});
  }
};

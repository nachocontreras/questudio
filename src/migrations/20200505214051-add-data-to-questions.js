'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn(
        'questions',
        'allowMultiple',
        Sequelize.BOOLEAN
      ),
      queryInterface.addColumn(
        'questions',
        'questionType',
        Sequelize.STRING
      )
    ]);
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */
  }
};

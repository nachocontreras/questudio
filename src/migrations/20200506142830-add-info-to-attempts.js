'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn(
        'vocationalTestResults',
        'additionalInfo',
        Sequelize.TEXT
      ),
      queryInterface.addColumn(
        'vocationalTestResults',
        'vocationalTestId',
        Sequelize.INTEGER
      ),
    ]);
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */
    return queryInterface.dropTable('vocationalTestResults');
  }
};

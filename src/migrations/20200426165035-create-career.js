'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('careers', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      area: {
        type: Sequelize.STRING
      },
      vacancies: {
        type: Sequelize.INTEGER
      },
      minScore: {
        type: Sequelize.INTEGER
      },
      mathScore: {
        type: Sequelize.FLOAT,
        allowNull: false
      },
      lengScore: {
        type: Sequelize.FLOAT,
        allowNull: false
      },
      scienceScore: {
        type: Sequelize.FLOAT,
        allowNull: true
      },
      histScore: {
        type: Sequelize.FLOAT,
        allowNull: true,
      },
      nemScore: {
        type: Sequelize.FLOAT,
        allowNull: false
      },
      rankScore: {
        type: Sequelize.FLOAT,
        allowNull: false
      },
      corte: {
        type: Sequelize.FLOAT,
        allowNull: false
      },
      duration: {
        type: Sequelize.INTEGER
      },
      universityId: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('careers');
  }
};
'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('universitymedia', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      universityId: {
        type: Sequelize.INTEGER
      },
      url: {
        type: Sequelize.STRING
      },
      mediaType: {
        type: Sequelize.INTEGER
      }, // (1 = imagen, 2 = video, 3 = meme pagina)
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
    return queryInterface.dropTable('universitymedia');
  }
};
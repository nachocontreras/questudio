'use strict';
module.exports = (sequelize, DataTypes) => {
  const simulation = sequelize.define('simulation', {
    userId: DataTypes.INTEGER,
    careerId: DataTypes.INTEGER,
    ponderation: DataTypes.FLOAT
  }, {});
  simulation.associate = function (models) {
    // associations can be defined here
    simulation.belongsTo(models.career, { foreignKey: 'careerId' });
  };

  return simulation;
};
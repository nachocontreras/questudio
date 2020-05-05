'use strict';
module.exports = (sequelize, DataTypes) => {
  const vocationalTestResult = sequelize.define('vocationalTestResult', {
    userId: DataTypes.INTEGER,
    careerId: DataTypes.INTEGER,
    attempt: DataTypes.INTEGER
  }, {});
  vocationalTestResult.associate = function(models) {
    // associations can be defined here
  };
  return vocationalTestResult;
};
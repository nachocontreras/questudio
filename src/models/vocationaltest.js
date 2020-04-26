'use strict';
module.exports = (sequelize, DataTypes) => {
  const vocationalTest = sequelize.define('vocationalTest', {
    description: DataTypes.STRING,
    name: DataTypes.STRING
  }, {});
  vocationalTest.associate = function(models) {
    // associations can be defined here
    vocationalTest.hasMany(models.question);
  };
  return vocationalTest;
};
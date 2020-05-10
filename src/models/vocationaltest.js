'use strict';
module.exports = (sequelize, DataTypes) => {
  const vocationalTest = sequelize.define('vocationalTest', {
    description: DataTypes.TEXT,
    name: DataTypes.STRING
  }, {});
  vocationalTest.associate = function(models) {
    // associations can be defined here
    vocationalTest.hasMany(models.question);
  };
  return vocationalTest;
};
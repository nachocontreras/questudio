'use strict';
module.exports = (sequelize, DataTypes) => {
  const career = sequelize.define('career', {
    name: DataTypes.STRING,
    area: DataTypes.STRING,
    vacancies: DataTypes.INTEGER,
    minScore: DataTypes.INTEGER,
    duration: DataTypes.INTEGER,
    universityId: DataTypes.INTEGER
  }, {});
  career.associate = function(models) {
    // associations can be defined here
    career.hasMany(models.vocationalTestResult);
    career.hasMany(models.experience);
    career.hasMany(models.comment);
    career.belongsTo(models.university);
  };
  return career;
};
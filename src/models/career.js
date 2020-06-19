'use strict';
module.exports = (sequelize, DataTypes) => {
  const career = sequelize.define('career', {
    name: DataTypes.STRING,
    area: DataTypes.STRING,
    vacancies: DataTypes.INTEGER,
    minScore: DataTypes.INTEGER,
    duration: DataTypes.INTEGER,
    universityId: DataTypes.INTEGER,
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 500,
    }
  }, {});
  career.associate = function(models) {
    // associations can be defined here
    career.hasMany(models.vocationalTestResult);
    career.hasMany(models.experience, {onDelete: 'CASCADE', hooks:true});
    career.hasMany(models.comment, {onDelete: 'CASCADE', hooks:true});
    career.belongsTo(models.university);
  };
  return career;
};
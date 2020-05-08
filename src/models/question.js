'use strict';
module.exports = (sequelize, DataTypes) => {
  const question = sequelize.define('question', {
    description: DataTypes.STRING,
    vocationalTestId: DataTypes.INTEGER,
    allowMultiple: DataTypes.BOOLEAN,
    questionType: DataTypes.STRING,
    position: DataTypes.INTEGER,
  }, {});
  question.associate = function(models) {
    // associations can be defined here
    question.hasMany(models.option);
  };
  return question;
};
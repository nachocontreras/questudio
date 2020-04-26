'use strict';
module.exports = (sequelize, DataTypes) => {
  const option = sequelize.define('option', {
    description: DataTypes.STRING,
    questionId: DataTypes.INTEGER
  }, {});
  option.associate = function(models) {
    // associations can be defined here
    option.belongsTo(models.question);
  };
  return option;
};
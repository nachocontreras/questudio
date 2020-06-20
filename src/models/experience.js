'use strict';
module.exports = (sequelize, DataTypes) => {
  const experience = sequelize.define('experience', {
    description: DataTypes.STRING,
    userId: DataTypes.INTEGER,
    careerId: DataTypes.INTEGER
  }, {});
  experience.associate = function(models) {
    experience.belongsTo(models.user);
    experience.belongsTo(models.career);
  };
  return experience;
};

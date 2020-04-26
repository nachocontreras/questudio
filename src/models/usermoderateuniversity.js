'use strict';
module.exports = (sequelize, DataTypes) => {
  const userModerateUniversity = sequelize.define('userModerateUniversity', {
    userId: DataTypes.INTEGER,
    universityId: DataTypes.INTEGER
  }, {});
  userModerateUniversity.associate = function(models) {
    // associations can be defined here
  };
  return userModerateUniversity;
};
'use strict';
module.exports = (sequelize, DataTypes) => {
  const university = sequelize.define('university', {
    name: DataTypes.STRING,
    address: DataTypes.STRING,
    description: DataTypes.STRING
  }, {});
  university.associate = function(models) {
    // associations can be defined here
    university.hasMany(models.career);  // university.getCareers() => entrega las carreras.
    university.belongsToMany(models.user, { through: models.userModerateUniversity, foreignKey: 'userId' }); // moderate
  };
  return university;
};
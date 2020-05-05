'use strict';
const universityModel = require('../models/university'); 

const bcrypt = require('bcrypt');

const PASSWORD_SALT = 10;

async function buildPasswordHash(instance) {
  if (instance.changed('password')) {
    const hash = await bcrypt.hash(instance.password, PASSWORD_SALT);
    instance.set('password', hash);
  }
}

module.exports = (sequelize, DataTypes) => {
  const user = sequelize.define('user', {
    name: DataTypes.STRING,
    lastname: DataTypes.STRING,
    userType: DataTypes.INTEGER,
    password: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    imageUrl: DataTypes.STRING,
    universityId: DataTypes.INTEGER,
    careerId: DataTypes.INTEGER
  }, {});
  user.associate = function(models) {
    user.hasMany(models.experience);
    user.hasMany(models.comment);
    user.belongsToMany(models.university, { through: models.userModerateUniversity, foreignKey: 'universityId' }); // moderate
    user.hasMany(models.vocationalTestResult);
    user.prototype.getUniversity = async function getUniversity() {
      if (this.universityId != null) {
        return await models.university.findById(this.universityId);
      }
    }
  };

  user.beforeUpdate(buildPasswordHash);
  user.beforeCreate(buildPasswordHash);

  user.prototype.checkPassword = function checkPassword(password) {
    return bcrypt.compare(password, this.password);
  };

  user.prototype.getType = function getType() {
    if (this.userType == '0') {
      return "Estudiante enseñanza media";
    } else if (this.userType == '1') {
      return "Estudiante universitario";
    } else {
      return "Este tipo no está definido";
    }
  };

  return user;
};
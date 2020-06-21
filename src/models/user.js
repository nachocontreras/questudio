'use strict';
const universityModel = require('../models/university');

const bcrypt = require('bcryptjs');

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
      unique: true,
      allowNull: false,
      validate: {
        isEmail: true,
        isUnique: function (value, next) {

          user.find({
            where: { email: value },
            attributes: ['id']
          })
            .done(function (error, user) {

              if (error)
                // Some unexpected error occured with the find method.
                return next(error);

              if (user)
                // We found a user with this email address.
                // Pass the error to the next method.
                return next('Email address already in use!');

              // If we got this far, the email address hasn't been used yet.
              // Call next with no arguments when validation is successful.
              next();

            });

        }
      }
    },
    imageUrl: DataTypes.STRING,
    universityId: DataTypes.INTEGER,
    careerId: DataTypes.INTEGER,
  }, {
    indexes: [
      {
        unique: true,
        fields: ['email']
      }
    ]
  });
  user.associate = function (models) {
    user.hasMany(models.experience, { onDelete: 'CASCADE', hooks: true });
    user.hasMany(models.comment, { onDelete: 'CASCADE', hooks: true });
    user.belongsToMany(models.university, { through: models.userModerateUniversity, foreignKey: 'userId' }); // moderate
    user.hasMany(models.vocationalTestResult, { onDelete: 'CASCADE', hooks: true });
    user.belongsToMany(models.career, { through: models.simulation, as: 'simulations' });
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

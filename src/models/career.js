'use strict';
module.exports = (sequelize, DataTypes) => {
  const career = sequelize.define('career', {
    name: DataTypes.STRING,
    area: DataTypes.STRING,
    vacancies: DataTypes.INTEGER,
    minScore: DataTypes.INTEGER,
    mathScore: DataTypes.FLOAT,
    lengScore: DataTypes.FLOAT,
    scienceScore: DataTypes.FLOAT,
    histScore: DataTypes.FLOAT,
    nemScore: DataTypes.FLOAT,
    rankScore: DataTypes.FLOAT,
    corte: DataTypes.FLOAT,
    duration: DataTypes.INTEGER,
    universityId: DataTypes.INTEGER,
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 500,
    }
  }, {});
  career.associate = function (models) {
    // associations can be defined here
    career.hasMany(models.vocationalTestResult);
    career.hasMany(models.experience, { onDelete: 'CASCADE', hooks: true });
    career.hasMany(models.comment, { onDelete: 'CASCADE', hooks: true });
    career.belongsTo(models.university);
    career.belongsToMany(models.user, { through: models.simulation, as: 'simulators' });
  };
  return career;
};

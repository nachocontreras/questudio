
module.exports = (sequelize, DataTypes) => {
  const passwordRecovery = sequelize.define('passwordRecovery', {
    userId: DataTypes.INTEGER,
    token: DataTypes.INTEGER,
  }, {});
  passwordRecovery.associate = function(models) {
    
  };
  return passwordRecovery;
};


module.exports = (sequelize, DataTypes) => {
  const verification = sequelize.define('verification', {
    userId: DataTypes.INTEGER,
    token: DataTypes.INTEGER,
  }, {});
  verification.associate = function(models) {
    
  };
  return verification;
};

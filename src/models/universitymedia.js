
module.exports = (sequelize, DataTypes) => {
  const universitymedia = sequelize.define('universitymedia', {
    universityId: DataTypes.INTEGER,
    url: DataTypes.STRING,
    mediaType: DataTypes.INTEGER,
  }, {});
  universitymedia.associate = function(models) {
    
  };
  return universitymedia;
};

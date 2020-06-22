'use strict';
module.exports = (sequelize, DataTypes) => {
  const comment = sequelize.define('comment', {
    description: DataTypes.STRING,
    userId: DataTypes.INTEGER,
    careerId: DataTypes.INTEGER,
    previousCommentId: DataTypes.INTEGER
  }, {});
  comment.associate = function(models) {
    // associations can be defined here
    comment.belongsTo(models.user);
    comment.belongsTo(models.career);
    comment.hasMany(models.comment, {foreignKey: 'previousCommentId', as: "comments"}); // getComments();
  };
  return comment;
};
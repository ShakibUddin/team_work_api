"use strict";
const { Model, DataTypes } = require("sequelize");
module.exports = (sequelize) => {
  class Comment extends Model {
    static associate(models) {
      Comment.belongsTo(models.Task, { foreignKey: "taskId" });
    }
  }
  Comment.init(
    {
      comment: DataTypes.STRING,
      userId: DataTypes.INTEGER,
      taskId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Comment",
    }
  );
  return Comment;
};

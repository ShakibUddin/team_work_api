"use strict";
const { Model } = require("sequelize");
const { DataTypes } = require("sequelize");
module.exports = (sequelize) => {
  class Task extends Model {
    static associate(models) {
      Task.belongsTo(models.Project, { foreignKey: "projectId" });
    }
  }
  Task.init(
    {
      title: DataTypes.STRING,
      description: DataTypes.STRING,
      projectId: DataTypes.INTEGER,
      statusId: DataTypes.STRING,
      developers: DataTypes.STRING,
      priorityId: DataTypes.INTEGER,
      dueDate: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "Task",
    }
  );
  return Task;
};

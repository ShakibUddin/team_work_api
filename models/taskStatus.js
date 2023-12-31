"use strict";
const { Model } = require("sequelize");
const { DataTypes } = require("sequelize");
module.exports = (sequelize) => {
  class TaskStatus extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {}
  }
  TaskStatus.init(
    {
      title: DataTypes.STRING,
      color: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "TaskStatus",
      freezeTableName: true, // This is because Sequelize, automatically pluralizes the name of the model for the corresponding database table.
      //freezeTableName is used to use automatic pluralization
    }
  );
  return TaskStatus;
};

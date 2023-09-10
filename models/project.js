"use strict";
const { Model } = require("sequelize");
const { DataTypes } = require("sequelize");
module.exports = (sequelize) => {
  class Project extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.Project.hasMany(models.Task, {
        foreignKey: "projectId",
      });
      models.Task.belongsTo(models.Project);
    }
  }
  Project.init(
    {
      title: DataTypes.STRING,
      description: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Project",
    }
  );
  return Project;
};

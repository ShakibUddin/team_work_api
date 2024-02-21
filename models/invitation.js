"use strict";
const { Model } = require("sequelize");
const { DataTypes } = require("sequelize");
module.exports = (sequelize) => {
  class Invitation extends Model {
    static associate(models) {
      Invitation.belongsTo(models.Project, { foreignKey: "projectId" });
    }
  }
  Invitation.init(
    {
      projectId: DataTypes.INTEGER,
      userId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Invitation",
    }
  );
  return Invitation;
};

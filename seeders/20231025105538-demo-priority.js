"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert("TaskPriority", [
      {
        title: "High",
        color: "#FF0000",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: "Medium",
        color: "#FFFF00",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: "Low",
        color: "#00FF00",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete("TaskPriority", null, {});
  },
};

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
        color: "#0A7BDA",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: "Low",
        color: "#DCC417",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete("TaskPriority", null, {});
  },
};

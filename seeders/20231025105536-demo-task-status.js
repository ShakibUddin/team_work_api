"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert("TaskStatus", [
      {
        title: "Pending",
        color: "#FFA500",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: "In progress",
        color: "#0000FF",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: "In review",
        color: "#FFFF00",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: "Rejected",
        color: "#FF0000",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: "Complete",
        color: "#008000",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete("TaskStatus", null, {});
  },
};

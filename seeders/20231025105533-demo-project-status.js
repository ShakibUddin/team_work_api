"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert("ProjectStatus", [
      {
        title: "Pending",
        color: "#FFB600",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: "Ongoing",
        color: "#FFB600",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: "Complete",
        color: "#0B7A00",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete("ProjectStatus", null, {});
  },
};

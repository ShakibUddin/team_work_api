"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert("ProjectStatus", [
      {
        title: "Pending",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: "Ongoing",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: "Complete",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete("ProjectStatus", null, {});
  },
};

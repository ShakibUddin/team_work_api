"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert("Projects", [
      {
        title: "Project A",
        description: "Project Desc A",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: "Project B",
        description: "Project Desc B",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete("Projects", null, {});
  },
};

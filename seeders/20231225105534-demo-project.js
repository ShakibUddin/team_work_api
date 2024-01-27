"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert("Projects", [
      {
        title: "Project A",
        description: "Project Desc A",
        ownerId: 1,
        statusId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: "Project B",
        ownerId: 2,
        statusId: 2,
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

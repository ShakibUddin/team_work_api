"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert("Tasks", [
      {
        title: "Task A",
        description: "Task Desc A",
        projectId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: "Task B",
        description: "Task Desc B",
        projectId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: "Task C",
        description: "Task Desc C",
        projectId: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete("Tasks", null, {});
  },
};

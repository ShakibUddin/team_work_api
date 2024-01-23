"use strict";

const dayjs = require("dayjs");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert("Tasks", [
      {
        title: "Task A",
        description: "Task Desc A",
        projectId: 1,
        statusId: 1,
        priorityId: 1,
        dueDate: dayjs().add(7, "days").format("YYYY-MM-DD"),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: "Task B",
        description: "Task Desc B",
        projectId: 1,
        statusId: 2,
        priorityId: 2,
        dueDate: dayjs().add(3, "days").format("YYYY-MM-DD"),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: "Task C",
        description: "Task Desc C",
        projectId: 2,
        statusId: 3,
        priorityId: 3,
        dueDate: dayjs().add(5, "days").format("YYYY-MM-DD"),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete("Tasks", null, {});
  },
};

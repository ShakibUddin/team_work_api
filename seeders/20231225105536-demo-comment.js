"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert("Comments", [
      {
        comment: "Please make sure UI is responsive",
        userId: 1,
        taskId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        comment: "Please make sure is browser compatible",
        userId: 2,
        taskId: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        comment: "Write proper unit testing",
        userId: 2,
        taskId: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete("Comments", null, {});
  },
};

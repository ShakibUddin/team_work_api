"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn("Tasks", "projectId", {
      type: Sequelize.STRING,
      defaultValue: "INPROGRESS",
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn("Tasks", "complete");
  },
};

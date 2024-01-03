"use strict";
const bcrypt = require("bcryptjs");
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert("Users", [
      {
        firstName: "John",
        lastName: "Doe",
        email: "john.doe@test.com",
        password: await bcrypt.hash("123456", 10),
        avatar: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        firstName: "Jane",
        lastName: "Smith",
        email: "jane.smith@test.com",
        password: await bcrypt.hash("123456", 10),
        avatar: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        firstName: "Robert",
        lastName: "Johnson",
        email: "robert.johnson@test.com",
        password: await bcrypt.hash("123456", 10),
        avatar: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        firstName: "Michael",
        lastName: "Williams",
        email: "michael.williams@test.com",
        password: await bcrypt.hash("123456", 10),
        avatar: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        firstName: "Sarah",
        lastName: "Jones",
        email: "sarah.jones@test.com",
        password: await bcrypt.hash("123456", 10),
        avatar: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        firstName: "Jessica",
        lastName: "Brown",
        email: "jessica.brown@test.com",
        password: await bcrypt.hash("123456", 10),
        avatar: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        firstName: "Jacob",
        lastName: "Davis",
        email: "jacob.davis@test.com",
        password: await bcrypt.hash("123456", 10),
        avatar: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        firstName: "Mohammed",
        lastName: "Miller",
        email: "mohammed.miller@test.com",
        password: await bcrypt.hash("123456", 10),
        avatar: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        firstName: "Sophia",
        lastName: "Wilson",
        email: "sophia.wilson@test.com",
        password: await bcrypt.hash("123456", 10),
        avatar: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        firstName: "Lucas",
        lastName: "Moore",
        email: "lucas.moore@test.com",
        password: await bcrypt.hash("123456", 10),
        avatar: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete("Users", null, {});
  },
};

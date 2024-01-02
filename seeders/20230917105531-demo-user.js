"use strict";
const bcrypt = require("bcryptjs");
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert("Users", [
      {
        firstName: "User1",
        lastName: "Test",
        email: "user1@test.com",
        password: await bcrypt.hash("123456", 10),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        firstName: "User2",
        lastName: "Test",
        email: "user2@test.com",
        password: await bcrypt.hash("123456", 10),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        firstName: "User3",
        lastName: "Test",
        email: "user3@test.com",
        password: await bcrypt.hash("123456", 10),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        firstName: "User4",
        lastName: "Test",
        email: "user4@test.com",
        password: await bcrypt.hash("123456", 10),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        firstName: "User5",
        lastName: "Test",
        email: "user5@test.com",
        password: await bcrypt.hash("123456", 10),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        firstName: "User6",
        lastName: "Test",
        email: "user6@test.com",
        password: await bcrypt.hash("123456", 10),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        firstName: "User7",
        lastName: "Test",
        email: "user7@test.com",
        password: await bcrypt.hash("123456", 10),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        firstName: "User8",
        lastName: "Test",
        email: "user8@test.com",
        password: await bcrypt.hash("123456", 10),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        firstName: "User9",
        lastName: "Test",
        email: "user9@test.com",
        password: await bcrypt.hash("123456", 10),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        firstName: "User10",
        lastName: "Test",
        email: "user10@test.com",
        password: await bcrypt.hash("123456", 10),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete("Users", null, {});
  },
};

"use strict";
const bcrypt = require("bcryptjs");

let options = {};
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA; // define your schema in options object
}

module.exports = {
  up: async (queryInterface, Sequelize) => {
    options.tableName = "Users";
    return queryInterface.bulkInsert(
      options,
      [
        {
          email: "demo@user.io",
          firstName: "demo",
          lastName: "user",
          username: "Demo-lition",
          hashedPassword: bcrypt.hashSync("password"),
        },
        {
          email: "user1@user.io",
          firstName: "user",
          lastName: "1",
          username: "FakeUser1",
          hashedPassword: bcrypt.hashSync("password2"),
        },
        {
          email: "user2@user.io",
          firstName: "fakeUser",
          lastName: "2",
          username: "FakeUser2",
          hashedPassword: bcrypt.hashSync("password3"),
        },
        {
          email: "user3@user.io",
          firstName: "fakeUs3R",
          lastName: "3",
          username: "FakeUser3",
          hashedPassword: bcrypt.hashSync("password3"),
        },
        {
          email: "user4@user.io",
          firstName: "fak3Us3R",
          lastName: "4",
          username: "FakeUser4",
          hashedPassword: bcrypt.hashSync("password3"),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    options.tableName = "Users";
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(
      options,
      {
        username: { [Op.in]: ["Demo-lition", "FakeUser1", "FakeUser2", "FakeUser3", "FakeUser4"] },
      },
      {}
    );
  },
};

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
          email: "christy@user.io",
          firstName: "Christy",
          lastName: "Lee",
          username: "CwistyLee",
          hashedPassword: bcrypt.hashSync("password"),
        },
        {
          email: "justin@user.io",
          firstName: "Justin",
          lastName: "Bieber",
          username: "JBieber",
          hashedPassword: bcrypt.hashSync("password"),
        },
        {
          email: "jay@user.io",
          firstName: "Jay",
          lastName: "Park",
          username: "JPark",
          hashedPassword: bcrypt.hashSync("password"),
        },
        {
          email: "eunice@user.io",
          firstName: "Eunice",
          lastName: "Park",
          username: "evnxprk",
          hashedPassword: bcrypt.hashSync("password"),
        },
        {
          email: "BTS@user.io",
          firstName: "BTS",
          lastName: "Lovers",
          username: "BT21",
          hashedPassword: bcrypt.hashSync("password"),
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

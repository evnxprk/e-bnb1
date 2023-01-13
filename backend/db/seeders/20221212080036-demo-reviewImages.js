'use strict';
let options = {};
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA; // define your schema in options object
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    options.tableName = "ReviewImages";
    return queryInterface.bulkInsert(
      options,
      [
        {
          reviewId: 1,
          url: "www.fakeURL.com",
        },
        {
          reviewId: 2,
          url: "www.fakeURL2.com",
        },
        {
          reviewId: 3,
          url: "www.fakeURL3.com",
        },
        {
          reviewId: 4,
          url: "www.fakeURL4.com",
        },
        {
          reviewId: 5,
          url: "www.fakeURL5.com",
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    options.tableName = "ReviewImages";
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(
      options,
      {
        url: {
          [Op.in]: [
            "www.fakeURL.com",
            "www.fakeURL2.com",
            "www.fakeURL3.com",
            "www.fakeURL4.com",
            "www.fakeURL5.com",
          ],
        },
      },
      {}
    );
  },
};

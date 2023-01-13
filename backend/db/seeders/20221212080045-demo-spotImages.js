'use strict';
let options = {};
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA; // define your schema in options object
}
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    options.tableName = "SpotImages";
    return queryInterface.bulkInsert(
      options,
      [
        {
          spotId: 1,
          url: "www.fakeURL.com/1",
          preview: true,
        },
        {
          spotId: 2,
          url: "www.fakeURL.com/2",
          preview: true,
        },
        {
          spotId: 3,
          url: "www.fakeURL.com/3",
          preview: true,
        },
        {
          spotId: 4,
          url: "www.fakeURL.com/4",
          preview: true,
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    options.tableName = "SpotImages";
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(
      options,
      {
        url: {
          [Op.in]: [
            "www.fakeURL.com/1",
            "www.fakeURL.com/2",
            "www.fakeURL.com/3",
            "www.fakeURL.com/4",
          ],
        },
      },
      {}
    );
  },
};

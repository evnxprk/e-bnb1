'use strict';
let options = {};
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA; // define your schema in options object
}
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    options.tableName = "Bookings";
    return queryInterface.bulkInsert(
      options,
      [
        {
          spotId: 1,
          userId: 1,
          startDate: "2023-01-05",
          endDate: "2023-01-11",
        },
        {
          spotId: 2,
          userId: 2,
          startDate: "2023-02-14",
          endDate: "2023-02-20",
        },
        {
          spotId: 3,
          userId: 3,
          startDate: "2023-03-03",
          endDate: "2023-03-21",
        },
        {
          spotId: 4,
          userId: 4,
          startDate: "2023-05-29",
          endDate: "2023-06-12",
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    options.tableName = "Bookings";
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(
      options,
      {
        spotId: { [Op.in]: [1, 2, 3, 4] },
      },
      {}
    );
  },
};


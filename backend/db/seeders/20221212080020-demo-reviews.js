'use strict';
let options = {};
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA; // define your schema in options object
}
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    options.tableName = "Reviews";
    return queryInterface.bulkInsert(
      options,
      [
        {
          spotId: 1,
          userId: 1,
          review:
            "This place has such great vibes and I cannot wait to stay here again!",
          stars: 4,
        },
        {
          spotId: 2,
          userId: 2,
          review:
            "The owner of this house was a great host and am recommending her.",
          stars: 5,
        },
        {
          spotId: 3,
          userId: 3,
          review: "This house is fire",
          stars: 4
        },
        {
          spotId: 4,
          userId: 2,
          review: "The place was cozy, small, and great for intimate settings.",
          stars: 4,
        },
        {
          spotId: 5,
          userId: 1,
          review: "I enjoyed my stay at the house and the host was superb.",
          stars: 5,
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    options.tableName = "Reviews";
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(
      options,
      {
        spotId: { [Op.in]: [1,2,3,4,5] },
      },
      {}
    );
  },
};

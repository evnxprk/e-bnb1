'use strict';
let options = {};
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA; // define your schema in options object
}
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    options.tableName = "Spots";
    return queryInterface.bulkInsert(
      options,
      [
        {
          ownerId: 1,
          address: "101 Fake Address Blvd",
          city: "Fake City",
          state: "CA",
          country: "USA",
          lat: "01.01",
          lng: "1.00",
          name: "Fake User",
          description: "Great spot for getaway from the real world for a bit.",
          price: 103,
        },
        {
          ownerId: 2,
          address: "102 Fake Address Street",
          city: "Fake City",
          state: "CA",
          country: "USA",
          lat: "01.02",
          lng: "1.01",
          name: "Shabalaba Dingdong",
          description:
            "Awesome spot for sightseeing the city and its near public transportation",
          price: 300,
        },

        {
          ownerId: 3,
          address: "103 Sherman Way",
          city: "Las Vegas",
          state: "NV",
          country: "USA",
          lat: "01.03",
          lng: "1.02",
          name: "Finding Nemo",
          description: "At the top of the mountain that overlooks the city.",
          price: 45,
        },
        {
          ownerId: 3,
          address: "3000 Palos Verdes Blvd",
          city: "Palos Verdes",
          state: "CA",
          country: "USA",
          lat: "01.04",
          lng: "1.04",
          name: "Sherman Oaks",
          description:
            "Can't wait to see the beach? This is it, it's next to the beach!",
          price: 50,
        },
        {
          ownerId: 3,
          address: "4000 Palos Verdes Blvd",
          city: "Palos Verdes",
          state: "CA",
          country: "USA",
          lat: "01.05",
          lng: "1.02",
          name: "BTS Lovers",
          description:
            "Love BTS? Well this is it.",
          price: 150,
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    options.tableName = "Spots";
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(
      options,
      {
        name: {
          [Op.in]: ["Sherman Oaks", "Finding Nemo", "Shabalaba Dingdong", "Fake User, BTS Lovers"],
        },
      },
      {}
    );
  },
};
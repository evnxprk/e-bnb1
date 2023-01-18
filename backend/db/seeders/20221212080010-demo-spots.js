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
          city: "Valorant",
          state: "CA",
          country: "USA",
          lat: "01.01",
          lng: "1.00",
          name: "Lotus",
          description: "Great spot for getaway from the real world for a bit.",
          price: 103,
        },
        {
          ownerId: 2,
          address: "102 Fake Address Street",
          city: "Valo",
          state: "NV",
          country: "USA",
          lat: "01.02",
          lng: "1.01",
          name: "Haven",
          description:
            "Awesome spot for sightseeing the city and its near public transportation",
          price: 300,
        },

        {
          ownerId: 3,
          address: "103 Sherman Way",
          city: "Riot Games",
          state: "CA",
          country: "USA",
          lat: "01.03",
          lng: "1.02",
          name: "Breeze",
          description: "At the top of the mountain that overlooks the city.",
          price: 45,
        },
        {
          ownerId: 4,
          address: "3000 Palos Verdes Blvd",
          city: "Torrance",
          state: "CA",
          country: "USA",
          lat: "01.04",
          lng: "1.04",
          name: "Pearl",
          description:
            "Can't wait to see the beach? This is it, it's next to the beach!",
          price: 50,
        },
        {
          ownerId: 5,
          address: "4000 Palos Verdes Blvd",
          city: "New York City",
          state: "NY",
          country: "USA",
          lat: "01.05",
          lng: "1.02",
          name: "Icebox",
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
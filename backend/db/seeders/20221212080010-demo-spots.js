'use strict';

const { INET } = require('sequelize');

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
          city: "Palos Verdes",
          state: "CA",
          country: "USA",
          lat: "01.01",
          lng: "1.00",
          name: "Sea Turtle Suite",
          description:
            "Step through the gates of paradise and experience true luxury at Rancho Magdalena.",
          price: 3000,
        },
        {
          ownerId: 2,
          address: "102 Fake Address Street",
          city: "Las Vegas",
          state: "NV",
          country: "USA",
          lat: "01.02",
          lng: "1.01",
          name: "Casa Vinedo Estate",
          description:
            "This is the retreat that you see on TV or in the movies. Come and enjoy one of the most unique and spectacular properties in the country.",
          price: 4300,
        },

        {
          ownerId: 3,
          address: "103 Sherman Way",
          city: "La Jolla",
          state: "CA",
          country: "USA",
          lat: "01.03",
          lng: "1.02",
          name: "Sunset Paradise",
          description:
            "Private, gated French country chateau-inspired home sits at the end of a cul de sac ",
          price: 2390,
        },
        {
          ownerId: 4,
          address: "3000 Palos Verdes Blvd",
          city: "Torrance",
          state: "CA",
          country: "USA",
          lat: "01.04",
          lng: "1.04",
          name: "Luxury Tuscan Resort",
          description:
            "Unwind in 12 themed bedrooms, each with a full bathroom, plus 3 half bathrooms.",
          price: 3300,
        },
        {
          ownerId: 5,
          address: "4000 Palos Verdes Blvd",
          city: "New York City",
          state: "NY",
          country: "USA",
          lat: "01.05",
          lng: "1.02",
          name: "Las Ventanas 113",
          description:
            "If you love the original Orlando Theme Home, but need a few more bedrooms, we’ve got you covered with Orlando Theme Home 2.",
          price: 1300,
        },
        {
          ownerId: 5,
          address: "123 Main St",
          city: "Anaheim",
          state: "CA",
          country: "USA",
          lat: "01.0",
          lng: "1.1",
          name: "Sandy Beach Estate",
          description:
            "Feel like a VIP with our dedicated concierge who is always on call to help you with any extra services or reservations you may need such as a yacht, night club, restaurants, private chef, massage therapist etc.",
          price: 2900,
        },
        {
          ownerId: 1,
          address: "900 Minecraft Blvd",
          city: "Seattle",
          state: "WA",
          country: "USA",
          lat: "01.1",
          lng: "1.3",
          name: "15 Acre Luxury Estate",
          description:
            "The home is located between the most attractive areas on the coveted East end of 30A.",
          price: 8000,
        },
        {
          ownerId: 3,
          address: "190 Beachshore Blvd",
          city: "Los Angeles",
          state: "CA",
          country: "USA",
          lat: "01.2",
          lng: "1.9",
          name: "The Cape Coral Mansion",
          description:
            "Do you like fallen cities? This has a view that overlooks one",
          price: 4380,
        },
        {
          ownerId: 2,
          address: "789 Seaside Blvd",
          city: "New York City",
          state: "NY",
          country: "USA",
          lat: "01.05",
          lng: "1.02",
          name: "Old-World Italian Resort Villa",
          description:
            "This 7BD 5BA mansion comes with two very spacious living rooms, plenty of lounge space, and two fully equipped kitchen. Not to mention an air hockey table.",
          price: 5000,
        },
        {
          ownerId: 4,
          address: "300 Squishmallows Lane",
          city: "Orlando",
          state: "FL",
          country: "USA",
          lat: "01.05",
          lng: "1.02",
          name: "The Mansion at Reunion",
          description:
            "Welcome to The Mansion at Reunion, a luxury vacation pool home overlooking the 14th Hole of the signature Jack Nicklaus golf course.",
          price: 2350,
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
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
          url: "https://a0.muscache.com/im/pictures/3d391e5a-e594-4aed-9421-62153d3016de.jpg?im_w=1200",
          preview: true,
        },
        {
          spotId: 2,
          url: "https://a0.muscache.com/im/pictures/616bc395-644d-4089-b2c1-13c6c11c50fd.jpg?im_w=1200",
          preview: true,
        },
        {
          spotId: 3,
          url: "https://a0.muscache.com/im/pictures/prohost-api/Hosting-33043667/original/9c9a4e9d-a781-437e-8d82-0dd6813535b0.jpeg?im_w=1200",
          preview: true,
        },
        {
          spotId: 4,
          url: "https://a0.muscache.com/im/pictures/miso/Hosting-6122648/original/7d1816d6-e2ab-4053-ae59-9d09c577cfde.jpeg?im_w=1200",
          preview: true,
        },
        {
          spotId: 5,
          url: "https://a0.muscache.com/im/pictures/miso/Hosting-12427317/original/f26a8663-fbad-48c7-9992-22eaf93b3a98.jpeg?im_w=1200",
          preview: true,
        },
        {
          spotId: 6,
          url: "https://a0.muscache.com/im/pictures/prohost-api/Hosting-52991512/original/17739141-c832-4e64-8efa-e8818cd471aa.jpeg?im_w=1200",
          preview: true,
        },
        {
          spotId: 7,
          url: "https://a0.muscache.com/im/pictures/miso/Hosting-15951279/original/13e7ab39-f89a-4c8c-8685-89915ecf1957.jpeg?im_w=1200",
          preview: true,
        },
        {
          spotId: 8,
          url: "https://a0.muscache.com/im/pictures/prohost-api/Hosting-645949816519904365/original/077e14bb-3c59-4436-ac54-24dcb2d5f00d.jpeg?im_w=1200",
          preview: true,
        },
        {
          spotId: 9,
          url: "https://a0.muscache.com/im/pictures/66526778/a45cd4a4_original.jpg?im_w=1200",
          preview: true,
        },
        {
          spotId: 10,
          url: "https://a0.muscache.com/im/pictures/f3e42ca3-6d2a-47e5-af3a-481ec297cf54.jpg?im_w=1200",
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

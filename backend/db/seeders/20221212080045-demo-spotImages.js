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
          url: "https://a0.muscache.com/im/pictures/b4db5900-b90e-4cc3-b12b-6d17953d0079.jpg?im_w=1200",
          preview: true,
        },
        // {
        //   spotId: 1,
        //   url: "https://a0.muscache.com/im/pictures/64986466-734d-4c39-ab52-69f6b9c1059b.jpg?im_w=1200",
        //   preview: false,
        // },
        // {
        //   spotId: 1,
        //   url: "https://a0.muscache.com/im/pictures/abd1ddb2-33bb-48d8-8000-d10015d52a7c.jpg?im_w=1200",
        //   preview: false,
        // },
        // {
        //   spotId: 1,
        //   url: "https://a0.muscache.com/im/pictures/25b829e2-0967-4ab1-8144-32a36e3b6a71.jpg?im_w=1200",
        //   preview: false,
        // },
        // {
        //   spotId: 1,
        //   url: "https://a0.muscache.com/im/pictures/33aed92d-ef62-4f49-8f0e-dcc190311692.jpg?im_w=720",
        //   preview: false,
        // },
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
          url: "https://a0.muscache.com/im/pictures/prohost-api/Hosting-578287662374491744/original/4bbe3da8-7c7c-4f1f-bf29-2c8548f1ad56.jpeg?im_w=1440",
          preview: true,
        },
        {
          spotId: 6,
          url: "https://a0.muscache.com/im/pictures/miso/Hosting-48272221/original/b2991099-0d0b-443c-83df-ca6694b14a65.jpeg?im_w=1440",
          preview: true,
        },
        {
          spotId: 7,
          url: "https://a0.muscache.com/im/pictures/miso/Hosting-15951279/original/13e7ab39-f89a-4c8c-8685-89915ecf1957.jpeg?im_w=1200",
          preview: true,
        },
        {
          spotId: 8,
          url: "https://a0.muscache.com/im/pictures/prohost-api/Hosting-654241066704423744/original/1a6cb0ba-3312-4ca7-aaeb-08c303dfc6d5.jpeg?im_w=1200",
          preview: true,
        },
        {
          spotId: 9,
          url: "https://a0.muscache.com/im/pictures/66526778/a45cd4a4_original.jpg?im_w=1200",
          preview: true,
        },
        {
          spotId: 10,
          url: "https://a0.muscache.com/im/pictures/28b3cb18-2fd1-4148-a463-119b8694d363.jpg?im_w=1200",
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

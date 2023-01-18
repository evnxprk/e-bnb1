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
          url: "https://imageio.forbes.com/specials-images/imageserve/63b832373ef2ae3a6b84da4f/0x0.jpg?format=jpg&width=1200",
          preview: true,
        },
        {
          spotId: 2,
          url: "https://images.adsttc.com/media/images/6250/5200/3e4b/315d/6d00/0012/newsletter/haven1.jpg?1649431036",
          preview: true,
        },
        {
          spotId: 3,
          url: "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/breeze-screenshot-map-02-1619538189.png",
          preview: true,
        },
        {
          spotId: 4,
          url: "https://www.pcgamesn.com/wp-content/sites/pcgamesn/2022/09/valorant-map-pearl-players-divided.jpg",
          preview: true,
        },
        {
          spotId: 5,
          url: "https://www.pcinvasion.com/wp-content/uploads/2020/10/Valorant-Act-III-new-map-Icebox.jpg",
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

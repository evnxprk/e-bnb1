'use strict';

let options = {};
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA; // define your schema in options object
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(
      "Bookings",
      {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER,
        },
        spotId: {
          references: {
            model: "Spots",
          },
          onDelete: "CASCADE",
          type: Sequelize.INTEGER,
        },
        userId: {
          references: {
            model: "Users",
          },
          type: Sequelize.INTEGER,
        },
        startDate: {
          type: Sequelize.DATEONLY,
        },
        endDate: {
          type: Sequelize.DATEONLY,
        },
        createdAt: {
          allowNull: false,
          defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
          type: Sequelize.DATE,
        },
        updatedAt: {
          defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
          allowNull: false,
          type: Sequelize.DATE,
        },
      },
      options
    );
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Bookings');
  }
};
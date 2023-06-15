"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Candidates", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      full_name: {
        type: Sequelize.STRING,
      },
      dob: {
        type: Sequelize.STRING,
      },
      pob: {
        type: Sequelize.STRING,
      },
      gender: {
        type: Sequelize.STRING,
      },
      year_exp: {
        type: Sequelize.STRING,
      },
      last_salary: {
        type: Sequelize.STRING,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Candidates");
  },
};

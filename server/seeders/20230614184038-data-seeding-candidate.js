"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert("Candidates", [
      {
        full_name: "John Doe",
        dob: "1990-01-01",
        pob: "New York",
        gender: "M",
        year_exp: "5",
        last_salary: "5000",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        full_name: "Jane Smith",
        dob: "1992-05-15",
        pob: "Los Angeles",
        gender: "F",
        year_exp: "3",
        last_salary: "4000",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        full_name: "Michael Johnson",
        dob: "1988-11-20",
        pob: "Chicago",
        gender: "M",
        year_exp: "7",
        last_salary: "6000",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        full_name: "Emily Davis",
        dob: "1995-03-10",
        pob: "Houston",
        gender: "F",
        year_exp: "4",
        last_salary: "4500",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        full_name: "David Wilson",
        dob: "1987-08-05",
        pob: "Seattle",
        gender: "M",
        year_exp: "9",
        last_salary: "7000",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        full_name: "Olivia Thompson",
        dob: "1993-07-18",
        pob: "San Francisco",
        gender: "F",
        year_exp: "6",
        last_salary: "5500",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        full_name: "Andrew Miller",
        dob: "1991-09-25",
        pob: "Dallas",
        gender: "M",
        year_exp: "4",
        last_salary: "4200",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        full_name: "Sophia Martinez",
        dob: "1994-06-12",
        pob: "Miami",
        gender: "F",
        year_exp: "2",
        last_salary: "3800",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        full_name: "James Brown",
        dob: "1989-02-28",
        pob: "Atlanta",
        gender: "M",
        year_exp: "8",
        last_salary: "6500",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        full_name: "Isabella Garcia",
        dob: "1996-04-08",
        pob: "Phoenix",
        gender: "F",
        year_exp: "5",
        last_salary: "5200",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Candidates", null, {});
  },
};

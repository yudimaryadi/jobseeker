"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Candidate extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Candidate.init(
    {
      full_name: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      dob: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      pob: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      gender: {
        allowNull: false,
        type: DataTypes.STRING,
        validate: {
          isIn: [["M", "F"]],
        },
      },
      year_exp: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      last_salary: {
        type: DataTypes.STRING,
      },
    },
    {
      sequelize,
      modelName: "Candidate",
    }
  );
  return Candidate;
};

"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User.init(
    {
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            args: true,
            msg: "username cannot be empty",
          },
          notEmpty: {
            args: true,
            msg: "username cannot be empty",
          },
        },
      },
      email: {
        type: DataTypes.STRING,
        allowNull:false,
        unique: {
          args: true,
          msg: "Email is already existsed",
        },
        validate: {
          notNull: {
            args: true,
            msg: "Email cannot be empty",
          },
          notEmpty: {
            args: true,
            msg: "Email cannot be empty",
          },
          isEmail: {
            msg: "Email is not valid",
          },
        },
      },
      role: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            args: true,
            msg: "role cannot be empty",
          },
          notEmpty: {
            args: true,
            msg: "role cannot be empty",
          },
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { args: true, msg: "Password cannot be empty" },
          passwordLengthValidation(value) {
            if (value.length < 8) {
              throw new Error(
                "Password length must be at least 8 characters long"
              );
            }
          },
        },
      },
    },
    {
      sequelize,
      modelName: "User",
    }
  );
  return User;
};

'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Product.init({
    brand: DataTypes.STRING,
    model: DataTypes.STRING,
    storage: DataTypes.STRING,
    ram: DataTypes.STRING,
    screen_size: DataTypes.STRING,
    camera: DataTypes.STRING,
    battery: DataTypes.INTEGER,
    price: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};
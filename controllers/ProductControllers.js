const { Op } = require("sequelize");
const { Product } = require("../models/index");

class ProductControllers {
  // Read Controllers Section
  static async getProducts(req, res, next) {
    try {
      const products = await Product.findAll();
      res.send(products);
    } catch (error) {
      next(error);
    }
  }
  static async getProductsByQuery(req, res, next) {
    try {
      const products = !req.query?.search
        ? await Product.findAll()
        : await Product.findAll({
            where: {
              [Op.or]: [
                { brand: { [Op.iLike]: `%${req.query.search}%` } },
                { model: { [Op.iLike]: `%${req.query.search}%` } },
              ],
            },
          });
      if (products) res.send(products);
      else res.status(404).send("Product not found");
    } catch (error) {
      next(error);
    }
  }
  static async getProductsDetails(req, res, next) {
    try {
      const { id } = req.params;
      const product = await Product.findByPk(id);
      if (!product) {
        res.status(404).send({message:"Product not found"});
      }
      res.status(200).send(product);
    } catch (error) {
      next(error);
    }
  }

  // Create Controllers Section
  static async createProduct(req, res, next) {
    try {
      if (!req.body)
        res.status(400).send({ message: "Insert at least One Field" });

      if (!req.body.brand || !req.body.price || !req.body.model)
        res
          .status(400)
          .send({
            message: `${req.body.brand ? "" : "Brand "}${
              req.body.price ? "" : "Price "
            }${req.body.model ? "" : "Model "}is required`,
          });

      const data = {
        ...req.body,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      const product = await Product.create(data);
      res.status(201).send({ message: "Product Created" });
    } catch (error) {
      next(error);
    }
  }

  // Update Controllers Section
  static async updateProduct(req, res, next) {
    try {
      const { id } = req.params;
      const search = await Product.findByPk(id);
      if (!search) {
        res.status(404).send({message:"Product not found"});
      }
      const data = { ...req.body, updatedAt: new Date(),id:id };
      const product = await Product.update(data, {
        where: {
          id: id,
        },
      });
      if (product) {
        res.status(201).send({ message: "Update Successfully" });
      } else {
        res.status(500).send({message:"Product Update Failed"});
      }
    } catch (error) {
      next(error);
    }
  }

  // Delete Product Section
  static async deleteProduct(req, res, next) {
    try {
      const { id } = req.params;
      const product = await Product.destroy({
        where: {
          id: id,
        },
      });
      if (product) {
        res.send({ msg: "Delete Successfully" });
      } else {
        res.status(404).send("Product not found");
      }
    } catch (error) {
      next(error);
    }
  }
}

module.exports = ProductControllers;

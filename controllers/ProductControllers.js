const {Product}= require('../models/index');

class ProductControllers{
    // Read Controllers Section
    static async getProducts(req,res){
        try{
            const products = await Product.findAll();
            res.send(products);
        }
        catch(error){
            res.status(500).send(error);
        }
    }
    static async getProductsByBrand(req,res){
        try {
            const {brand} = req.body
            const products = await Product.findAll({
                where:{
                    brand:brand
                }
            })
            if(products) res.send(products)
            else res.status(404).send("Product not found")
        } catch (error) {
            res.status(500).send(error)
        }
    }
    static async getProductsDetails(req,res){
        try {
            const {id} = req.params
            const product = await Product.findByPk(id);
            res.send(product);
        } catch (error) {
            res.status(500).send(error);
        }
    }

    // Create Controllers Section
    static async createProduct(req,res){
        try {
            const data = {...req.body,createdAt:new Date(),updatedAt:new Date()}
            const product = await Product.create(data);
        } catch (error) {
            res.status(500).send(error);
        }
    }

    // Update Controllers Section
    static async updateProduct(req,res){
        try {
            const {id} = req.params
            const data = {...req.body,updatedAt:new Date()}
            const product = await Product.update(data,{
                where:{
                    id:id
                }
            })
            if(product){
                res.send({"msg":"Update Successfully"})
            }
            else{
                res.status(404).send("Product not found")
            }

        } catch (error) {
            res.status(500).send(error)
        }
    }

    // Delete Product Section
    static async deleteProduct(req,res){
        try {
            const {id} = req.params
            const product = await Product.destroy({
                where:{
                    id:id
                }
            })
            if(product){
                res.send({"msg":"Delete Successfully"})
            }
            else{
                res.status(404).send("Product not found")}
        } catch (error) {
            res.status(500).send(error)
        }
    }
}

module.exports = ProductControllers;
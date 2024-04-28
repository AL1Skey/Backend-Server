const {Product}= require('../models/index');

class ProductControllers{
    // Read Controllers Section
    static async getProducts(req,res,next){
        try{
            const products = await Product.findAll();
            res.send(products);
        }
        catch(error){
           next(error);
        }
    }
    static async getProductsByBrand(req,res,next){
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
           next(error)
        }
    }
    static async getProductsDetails(req,res,next){
        try {
            const {id} = req.params
            const product = await Product.findByPk(id);
            res.send(product);
        } catch (error) {
           next(error);
        }
    }

    // Create Controllers Section
    static async createProduct(req,res,next){
        try {
            const data = {...req.body,createdAt:new Date(),updatedAt:new Date()}
            const product = await Product.create(data);
        } catch (error) {
           next(error);
        }
    }

    // Update Controllers Section
    static async updateProduct(req,res,next){
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
           next(error)
        }
    }

    // Delete Product Section
    static async deleteProduct(req,res,next){
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
           next(error)
        }
    }
}

module.exports = ProductControllers;
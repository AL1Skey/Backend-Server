const express = require('express')
const productRouter = express.Router()
const ProductControllers = require('../controllers/ProductControllers')
const UserAuth = require('../middleware/UserAuth')

// Public Product Endpoints
productRouter.post('/pubs/products',ProductControllers.createProduct)
productRouter.get('/pubs/products',ProductControllers.getProducts)
productRouter.get('/pubs/products/search',ProductControllers.getProductsByQuery)
productRouter.get('/pubs/products/:id',ProductControllers.getProductsDetails)
productRouter.put('/pubs/products/:id',ProductControllers.updateProduct)
productRouter.delete('/pubs/products/:id',ProductControllers.deleteProduct)
productRouter.use(UserAuth.JWTAuth)
// Restful Section
productRouter.post('/products',ProductControllers.createProduct)
productRouter.get('/products',ProductControllers.getProducts)
productRouter.get('/products/:id',ProductControllers.getProductsDetails)
productRouter.put('/products/:id',ProductControllers.updateProduct)
productRouter.delete('/products/:id',ProductControllers.deleteProduct)

module.exports = productRouter;
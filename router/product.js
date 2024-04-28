const express = require('express')
const productRouter = express.Router()
const ProductControllers = require('../controllers/ProductControllers')
const UserAuth = require('../middleware/UserAuth')

// Public Product Endpoints
productRouter.use(UserAuth.JWTAuth)
// Restful Section
productRouter.get('/products',ProductControllers.getProducts)
productRouter.get('/products/:id',ProductControllers.getProductsDetails)
productRouter.put('/product/:id',ProductControllers.updateProduct)
productRouter.delete('/product/:id',ProductControllers.deleteProduct)

module.exports = productRouter;
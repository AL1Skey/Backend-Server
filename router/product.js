const express = require('express')
const productRouter = express.Router()
const ProductControllers = require('../controllers/ProductControllers')
const UserAuth = require('../middleware/UserAuth')

// Public Product Endpoints
productRouter.use(UserAuth.JWTAuth)
// Restful Section
productRouter.post('/products',ProductControllers.createProduct)
productRouter.get('/products',ProductControllers.getProducts)
productRouter.get('/products/:id',ProductControllers.getProductsDetails)
productRouter.put('/products/:id',ProductControllers.updateProduct)
productRouter.delete('/products/:id',ProductControllers.deleteProduct)

module.exports = productRouter;
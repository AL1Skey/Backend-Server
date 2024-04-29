const express = require('express');
const userRouter = express.Router();
const AdminControllers = require('../controllers/AdminControllers')
const UserControllers = require('../controllers/UserControllers')
const UserAuth = require('../middleware/UserAuth')

// User Endpoints
userRouter.post('/register',UserControllers.register)
userRouter.post('/login',UserControllers.login)

// Admin Endpoints
userRouter.use(UserAuth.JWTAuth)
userRouter.use(UserAuth.AdminAuth)
userRouter.post('/users',AdminControllers.createUsers)
userRouter.get('/users',AdminControllers.getUsers)
userRouter.put('/users/:id',AdminControllers.updateUser)
userRouter.delete('/users/:id',AdminControllers.deleteUser)

module.exports = userRouter;
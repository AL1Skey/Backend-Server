const express = require('express');
const userRouter = express.Router();
const AdminControllers = require('../controllers/AdminControllers')
const UserControllers = require('../controllers/UserControllers')
const UserAuth = require('../middleware/UserAuth')

// User Endpoints
userRouter.post('/register',UserControllers.register)
userRouter.post('/login',UserControllers.login)
userRouter.post('/logout',UserAuth.JWTAuth,UserControllers.logout)

// Admin Endpoints
userRouter.post('/users',UserAuth.JWTAuth,UserAuth.AdminAuth,AdminControllers.createUsers)
userRouter.get('/users',UserAuth.JWTAuth,UserAuth.AdminAuth,AdminControllers.getUsers)
userRouter.put('/users/:id',UserAuth.JWTAuth,UserAuth.AdminAuth,AdminControllers.updateUser)
userRouter.delete('/users/:id',UserAuth.JWTAuth,UserAuth.AdminAuth,AdminControllers.deleteUser)

module.exports = userRouter;
const express = require('express');
const userRouter = express.Router();
const UserControllers = require('../controllers/UserControllers')
const UserAuth = require('../middleware/UserAuth')

// User Endpoints
userRouter.post('/register',UserControllers.register)
userRouter.post('/login',UserControllers.login)
userRouter.post('/logout',UserAuth.JWTAuth,UserControllers.logout)

// Admin Endpoints
userRouter.post('/users',UserAuth.JWTAuth,UserAuth.RoleAuth,UserControllers.createUsers)
userRouter.get('/users',UserAuth.JWTAuth,UserAuth.RoleAuth,UserControllers.getUsers)
userRouter.put('/users/:id',UserAuth.JWTAuth,UserAuth.RoleAuth,UserControllers.updateUser)
userRouter.delete('/users/:id',UserAuth.JWTAuth,UserAuth.RoleAuth,UserControllers.deleteUser)

module.exports = userRouter;
const {User} = require('../models/index');

class AdminControllers{
    /**
     * Get all users endpoint
     * 
     * This endpoint returns all users in the database.
     * 
     * @param {Request} req - Express request object
     * @param {Response} res - Express response object
     */
    static async getUsers(req,res){
        try {
            const users = await User.findAll(); // Find all users in database
            if(users) res.send(users); // Send users as response if found
            else res.status(404).send({message:"No users found"}); // Send not found status and message if users not found
        } catch (error) {
            res.status(500).send(error) // Log error and send error response
        }
    }

    /**
     * Create users endpoint
     * 
     * This endpoint creates a new user in the database.
     * 
     * @param {Request} req - Express request object
     * @param {Response} res - Express response object
     */
    static async createUsers(req,res){
        try {
            // Check if request body contains required fields
            if(!req.body.username || !req.body.email || !req.body.password){
                res.status(401).send({message:"Username, Email and Password can't be empty"});
            }

            const data = {
                // Get data from request body
                ...req.body,
                // Set created and updated timestamps
                createdAt: new Date(),
                updatedAt: new Date()
            };
            const user = await User.create(data); // Create new user in database
            res.send(user); // Send user as response
        } catch (error) {
            res.status(500).send(error); // Log error and send error response
        }
    }


    /**
     * Update user endpoint
     * 
     * This endpoint updates an existing user in the database.
     * 
     * @param {Request} req - Express request object
     * @param {Response} res - Express response object
     */
    static async updateUser(req,res){
        try {
            const {id} = req.params // Get user id from request params
            const data = {...req.body,updatedAt:new Date()} // Create new user data
            const user = await User.update(data,{ // Update user in database
                where:{ // Find user by id
                    id:id
                }
            })

            if(user) res.send("Successfully Update User") // Send success message if user found and updated
            else res.status(404).send({message:"User not found"}) // Send not found status and message if user not found

        } catch (error) {
            res.status(500).send(error) // Log error and send error response
        }
    }


    /**
     * Delete user endpoint
     * 
     * This endpoint deletes an existing user from the database.
     * 
     * @param {Request} req - Express request object
     * @param {Response} res - Express response object
     */
    static async deleteUser(req,res){
        try {
            const {id} = req.params // Get user id from request params
            const user = await User.destroy({ // Delete user from database
                where:{ // Find user by id
                    id:id
                }
            })
    
            if(user) res.send("Successfully Delete User") // Send success message if user found and deleted
            else res.status(404).send({message:"User not found"}) // Send not found status and message if user not found
            
        } catch (error) {
            res.status(500).send(error) // Log error and send error response
        }
    }
}

module.exports = AdminControllers;
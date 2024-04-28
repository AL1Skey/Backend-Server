const { User } = require("../models/index.js");
const { hashPassword, comparePassword } = require("../helpers/bcrypt.js");
const { signToken } = require("../helpers/jwt.js");

class UserControllers {
  /**
   * Register user endpoint
   * 
   * @param {Request} req - Request object
   * @param {Response} res - Response object
   */
  static async register(req, res) {
    try {
      // Check if request body contains required fields
      if(!req.body.username || !req.body.email || !req.body.password){
        res.status(401).send({message:"Username, Email and Password can't be empty"})
      }

      // Create user data
      const data = {
        // Get data from request body
        ...req.body,
        // Hash user password
        password: hashPassword(req.body.password),
      };
      // Create new user in database
      const user = await User.create(data);
      // Send success response
      res.send({
        message: {
          // Send user details
          username: user.username,
          email: user.email,
        },
      });
    } catch (error) {
      // Log error
      console.log(error);
      // Send error response
      res.status(500).send(error);
    }
  } // End register
  /**
   * Login user endpoint
   * 
   * This endpoint logs in an existing user and generates a JSON Web Token (JWT) that will be used to authenticate
   * the user on future requests.
   * 
   * @param {Request} req - Request object
   * @param {Response} res - Response object
   */
  static async login(req, res) {
    try {
      // Check if request body contains required fields
      if(!req.body.email || !req.body.password) {  
        res.status(401).send({message:"Email and Password can't be empty"});
      }

      // Get user from database
      const user = await User.findOne({
        where: {
          username: req.body.username,
        },
      });
      if (user) {
        // Check if password is correct
        const data = comparePassword(req.body.password, user.password)
          ? {
              // Send user details if password is correct
              username: user.username,
              email: user.email,
            }
          : null;
        if (data) {
          // Generate JWT token and send it to client
          res.send({
            ...data,
            access_token: signToken({ id: user.id }),
          });
        } else {
          // Send error message if password is wrong
          res.status(401).send({
            message: "username or password is wrong",
          });
        }
      }
    } catch (error) {
      // Log error and send error response
      console.log(error);
      res.status(500).send(error);
    }
  }

  /**
   * Logout user endpoint
   * 
   * This endpoint logs the user out by deleting the user from the request object.
   * If the user is already logged out, the endpoint will send a success message.
   * 
   * @param {Request} req - Request object
   * @param {Response} res - Response object
   */
  static async logout(req, res) {
    try {
      // Check if user is logged in
      if (req.user) {
        // Delete user from request object if logged in
        delete req.user;
      } else {
        // Send success message if user not logged in
        res.send({ message: "User Already Logged Out" });
      }

      // Send success message
      res.send({ message: "Logout Success" });
    } catch (error) {
      // Log error and send error response
      console.log(error);
      res.status(500).send(error);
    }
  }
  }

module.exports = UserControllers;

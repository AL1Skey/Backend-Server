const { User } = require("../models/index.js");
const { hashPassword, comparePassword } = require("../helpers/bcrypt.js");
const { signToken } = require("../helpers/jwt.js");
const validator = require("validator");

class UserControllers {
  /**
   * Register user endpoint
   *
   * @param {Request} req - Request object
   * @param {Response} res - Response object
   */
  static async register(req, res, next) {
    try {
      
      // Check if request body contains required fields
      if (!req.body.username || !req.body.email || !req.body.password) {
        if(!req.body.username && !req.body.email && !req.body.password){
          res.status(400).send({ message: "Fields can't be empty" });
        }
        res
          .status(400)
          .send({
            message: `${req.body.username ? "" : "Username "}${
              req.body.email ? "" : "Email "
            }${req.body.password ? "" : "Password "}Fields can't be empty`,
          });
      }

      // Check if request email is valid email format
      if (!validator.isEmail(req.body.email))
        res.status(400).send({ message: "Invalid email format" });

      // Check if user already exists
      if (await User.findOne({ where: { username: req.body.username } })) {
        res.status(409).send({ message: "username already exists" });
      }
      if (await User.findOne({ where: { email: req.body.email } })) {
        res.status(409).send({ message: "email already exists" });
      }

      // Create user data
      const data = {
        // Get data from request body
        ...req.body,
        // Hash user password
        password: hashPassword(req.body.password),
        // Add role to user
        role: "user",
      };

      console.log(data);
      // Create new user in database
      const user = await User.create(data);
      // Send success response
      res.status(201).send({
        message: "User created",
      });
    } catch (error) {
      // Log error
      console.log(error);
      // Send error response
      next(error);
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
  static async login(req, res, next) {
    try {
      // Check if request body contains required fields
      if (!req.body.email || !req.body.password) {
        res.status(400).send({ message: `${req.body.email?"":"Email "}${req.body.password?"":"Password "}Fields can't be empty` });
      }

      // Check if request email is valid email format
      if (!validator.isEmail(req.body.email))
        res.status(400).send({ message: "Invalid email format" });

      // Get user from database
      const user = await User.findOne({
        where: {
          email: req.body.email,
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
            access_token: signToken({ id: user.id }),
          });
        } else {
          // Send error message if password is wrong
          res.status(404).send({
            message: "Email or Password is either wrong or not existed",
          });
        }
      } else {
        res.status(404).send({
          message: "Email or Password is either wrong or not existed",
        });
      }
    } catch (error) {
      // Log error and send error response
      console.log(error);
      next(error);
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
  static async logout(req, res, next) {
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
      next(error);
    }
  }
}

module.exports = UserControllers;

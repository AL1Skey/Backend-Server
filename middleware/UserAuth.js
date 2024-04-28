const { signToken, verifyToken } = require("../helpers/jwt");
const { User } = require("../models/index");

module.exports = class UserAuth {

  /**
   * JWT Verification middleware
   * This middleware is responsible for verifying the JWT token
   * sent in the request Authorization Header.
   *
   * @param {Request} req - Express request object
   * @param {Response} res - Express response object
   * @param {NextFunction} next - Next middleware function
   */
  static async JWTAuth(req, res, next) {
    try {
      // Get Authorization Header
      const { authorization } = req.headers;
      // If Authorization Header is not found
      if (!authorization) {
        throw new Error("Invalid authorization");
      }

      // Get Token and type of token
      const [type, token] = authorization.split(" ");

      // If token type is not Bearer
      if (type !== "Bearer") {
        throw new Error("Invalid authorization Type");
      }

      // Verify the token and get user id
      const { id } = verifyToken(token);
      const user = await User.findByPk(id);

      // If user is not found
      if (!user) {
        throw new Error("User not found");
      }

      // Store user in request
      req.user = {
        id: user.id,
        username: user.username,
        email: user.email,
        role: user.role,
      };

      // Go to next Controllers
      next();
    } catch (error) {
      next(error);
    }
  }

  
  static async AdminAuth(req, res, next) {
    try {
      // If user is admin
      if (req.user.role === "admin") next(); // If user is not admin
      else res.status(403).send("User is not Admin"); // Send Forbidden response
    } catch (error) {
      next(error); // Log error and send to next middleware
    }
  }
  };

const { signToken, verifyToken } = require("../helpers/jwt");
const { User } = require("../models/user");
module.exports = class UserAuth {

  // JWT Verification
  static async JWTAuth(req, res, next) {
    try {
      // Get Authorization Header
      const { authorization } = req.headers;
      // If Authorization Header is not found
      if (!authorization) throw new Error("Invalid authorization");
      
      // Get Token and type of token
      const [type, token] = authorization.split(" ");
      
      // If token type is not Bearer
      if (type !== "Bearer") throw new Error("Invalid authorization Type");

      // Verify the token and get user id
      const { id } = verifyToken(token);
      const user = await User.findByPk(id);

      // If user is not found
      if (!user) throw new Error("User not found");

      // Store user in request
      req.user = {
        id: user.id,
        username: user.username,
        email: user.email,
        role:user.role
      };

      // Go to next Controllers
      next();
    } catch (error) {
      next(error);
    }
  }

  // Role Verification
  static async RoleAuth(req,res,next){
    try {
      // If user is admin
      if(req.user.role === 'admin') next()
      // If user is not admin
      else res.status(403).send("User is not Admin")
    } catch (error) {
      next(error)
    }
  }
};
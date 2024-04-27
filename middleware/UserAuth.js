const { signToken, verifyToken } = require("../helpers/jwt");
const { User } = require("../models/user");
module.exports = class UserAuth {
  static async JWTAuth(req, res, next) {
    try {
      const { authorization } = req.headers;
      if (!authorization) throw new Error("Invalid authorization");

      const [type, token] = authorization.split(" ");
      if (type !== "Bearer") throw new Error("Invalid authorization Type");
      
      const { id } = verifyToken(token);
      const user = await User.findByPk(id);

      if (!user) throw new Error("User not found");
      req.user = {
        id: user.id,
        username: user.username,
        email: user.email,
      };
      next();
    } catch (error) {
      next(error);
    }
  }
};

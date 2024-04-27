const { User } = require("../models/index.js");

class Controllers {
  static async register(req, res, next) {
    try {
      const user = await User.create(req.body);
      res.send({
        message: {
          username: user.username,
          password: user.password,
          email: user.email,
        },
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
  static async login(req, res, next) {
    try {
      console.log(req.body);
      const user = await User.findOne({
        where: {
          username: req.body.username,
        },
      });
      if (user) {
        const data =
          user.password === req.body.password
            ? {
                username: user.username,
                email: user.email,
              }
            : null;
            console.log(data)
        if (data) {
          res.send(data);
        } else {
          res.status(401).send({
            message: "username or password is wrong",
          });
        }
      }
    } catch (error) {
      next(error);
    }
  }
}

module.exports = Controllers;

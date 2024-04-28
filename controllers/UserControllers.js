const { User } = require("../models/index.js");
const { hashPassword, comparePassword } = require("../helpers/bcrypt.js");
const { signToken } = require("../helpers/jwt.js");

class UserControllers {
  static async register(req, res) {
    try {
      const data = {
        ...req.body,
        password: hashPassword(req.body.password),
      };
      const user = await User.create(data);
      res.send({
        message: {
          username: user.username,
          password: user.password,
          email: user.email,
        },
      });
    } catch (error) {
      console.log(error);
      res.status(500).send(error);
    }
  }
  static async login(req, res) {
    try {
      console.log(req.body);
      const user = await User.findOne({
        where: {
          username: req.body.username,
        },
      });
      if (user) {
        const data = comparePassword(req.body.password, user.password)
          ? {
              username: user.username,
              email: user.email,
            }
          : null;
        if (data) {
          res.send({ ...data, access_token: signToken({ id: user.id }) });
        } else {
          res.status(401).send({
            message: "username or password is wrong",
          });
        }
      }
    } catch (error) {
      res.status(500).send(error);
    }
  }

  static async logout(req, res) {
    try {
      if (req.user) delete req.user;
      
      else res.send({ message: "User Already Logged Out" });

      res.send({ message: "Logout Success" });
    } catch (error) {
      res.status(500).send(error);
    }
  }
}

module.exports = UserControllers;

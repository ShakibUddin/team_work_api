require("dotenv").config();
const { sequelize } = require("../models");
const User = require("../models/user")(sequelize);
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

module.exports = {
  createUser: async (req, res) => {
    try {
      const { firstName, lastName, email, password } = req.body;

      if (!(email && password && firstName && lastName)) {
        return res.status(400).send({
          error: true,
          message: "Input fields are required",
          data: null,
        });
      } else {
        const user = await User.findOne({ where: { email } });
        if (!user) {
          const encryptedUserPassword = await bcrypt.hash(password, 10);
          const newUser = await User.create({
            firstName,
            lastName,
            email: email.toLowerCase(),
            password: encryptedUserPassword,
          });
          const token = jwt.sign(
            { user_id: newUser.id, email, firstName, lastName },
            process.env.TOKEN_KEY,
            {
              expiresIn: "1h",
            }
          );
          delete newUser.password;
          return res.status(201).json({
            error: false,
            message: "Registration is successful",
            data: { id: newUser.id, firstName, lastName, email, token },
          });
        } else {
          return res.status(409).send({
            error: true,
            message: "Email already exists",
            data: null,
          });
        }
      }
    } catch (err) {
      return res.status(500).send({
        error: true,
        message: err.message,
        data: null,
      });
    }
  },
  loginUser: async (req, res) => {
    try {
      const { email, password } = req.body;
      if (!(email && password)) {
        return res.status(400).send({
          error: true,
          message: "Input fields are required",
          data: null,
        });
      } else {
        const user = await User.findOne({ where: { email } });
        if (user) {
          if (user && (await bcrypt.compare(password, user.password))) {
            const token = jwt.sign(
              {
                id: user.id,
                email: user.email,
                firstName: user.firstName,
                lastName: user.lastName,
              },
              process.env.TOKEN_KEY,
              {
                expiresIn: "20s",
              }
            );
            return res.status(201).json({
              error: false,
              message: "Login is successful",
              data: {
                id: user.id,
                email: user.email,
                firstName: user.firstName,
                lastName: user.lastName,
                token,
              },
            });
          } else {
            return res.status(400).send({
              error: true,
              message: "Invalid credentials",
              data: null,
            });
          }
        } else {
          return res.status(400).send({
            error: true,
            message: "Invalid credentials",
            data: null,
          });
        }
      }
    } catch (err) {
      return res.status(500).send({
        error: true,
        message: err.message,
        data: null,
      });
    }
  },
};

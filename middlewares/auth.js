const jwt = require("jsonwebtoken");
const db = require("../models");
const { User } = db;

const config = process.env;

const verifyToken = async (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(403).send({
      error: true,
      message: "Unauthorized request",
      data: null,
    });
  }
  try {
    const decoded = jwt.verify(token.split(" ")[1], config.TOKEN_KEY);
    const userInDB = await User.findOne({ where: { id: decoded.id } });
    if (
      decoded &&
      Object.keys(decoded).length > 0 &&
      userInDB.dataValues.token &&
      userInDB.dataValues.token === token.split(" ")[1]
    ) {
      req.user = decoded;
    } else {
      return res.status(401).send({
        error: true,
        message: "Unauthorized access",
        data: null,
      });
    }
  } catch (err) {
    console.log("error", err);
    return res.status(401).send({
      error: true,
      message: "Unauthorized access",
      data: null,
    });
  }
  return next();
};

module.exports = verifyToken;

const jwt = require("jsonwebtoken");

const config = process.env;

const verifyToken = (req, res, next) => {
  const token =
    req.body.token || req.query.token || req.headers["Authorization"];
  if (!token) {
    return res.status(403).send({
      error: true,
      message: "Unauthorized request",
      data: null,
    });
  }
  try {
    const decoded = jwt.verify(token, config.TOKEN_KEY);
    req.user = decoded;
  } catch (err) {
    return res.status(401).send({
      error: true,
      message: "Invalid token",
      data: null,
    });
  }
  return next();
};

module.exports = verifyToken;

const jwt = require("jsonwebtoken");
const { key } = require("../key");
module.exports = (req, res, next) => {
  let auth = req.get("Authorization");

  const token = auth;
  let decoded;
  try {
    decoded = jwt.verify(token, key.jwtSecret);
    req.userId = decoded.userId;
    next();
  } catch (err) {
    err.StatusCode = 500;
    throw err;
  }
};

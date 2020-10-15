const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
  const token = req.header("auth-token");

  if (!token) {
    res.send("Token not Found");
  }

  try {
    const validate = jwt.verify(token, process.env.TOKEN_SECRET);
    req.user = validate;
    next();
  } catch (error) {
    res.send(error.message);
  }
};

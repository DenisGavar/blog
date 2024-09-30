const jwt = require("jsonwebtoken");

const authenticate = (req, res, next) => {
  const token = req.cookies.jwt; // TODO: check it (sessions!)

  if (!token) {
    return res.status(401).json({
      status: "fail",
      message: "Not authenticated",
    });
  }

  try {
    secret = process.env.JWT_SECRET;
    const decoded = jwt.verify(token, secret);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({
      status: "fail",
      message: "Invalid token",
    });
  }
};

module.exports = authenticate;

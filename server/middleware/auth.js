const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  try {
    const token = req.header("x-auth-token");
    if (!token) {
      return res.status(401).json({
        status: false,
        message: "No authentication token. Access denied.",
      });
    }

    const verified = jwt.verify(token, process.env.JWT_SECRET);
    if (!verified) {
      return res.status(401).json({
        status: false,
        message: "Unauthorized access. Access denied.",
      });
    }

    req.user = verified.id;
    next();
  } catch (error) {
    console.error(`${error.message}`.red);
    res.status(500).json({
      status: false,
      message: "Something went wrong!",
    });
  }
};

module.exports = auth;

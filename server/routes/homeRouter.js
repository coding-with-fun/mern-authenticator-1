const router = require("express").Router();
const User = require("../models/userModel");

/**
 * @route       GET /
 * @description Home Page
 * @access      Public
 */
router.get("/", (req, res) => {
  try {
    res.status(200).json({
      status: true,
      message: "Welcome user...",
    });
  } catch (error) {
    console.error(`${error.message}`.red);
    res.status(500).json({
      status: false,
      message: "Something went wrong!",
      error: error.message,
    });
  }
});

module.exports = router;

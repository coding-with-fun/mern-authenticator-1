const router = require("express").Router();
const auth = require("../middleware/auth");
const User = require("../models/userModel");

/**
 * @route       GET /fetchDetails
 * @description Home Page
 * @access      Public
 */
router.get("/fetchDetails", auth, async (req, res) => {
  try {
    const userID = req.user;

    const user = await User.findById(userID);
    console.info(user);

    res.status(200).json({
      status: true,
      message: "Fetched details successfully.",
      body: {
        displayName: user.displayName,
        email: user.email,
      },
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

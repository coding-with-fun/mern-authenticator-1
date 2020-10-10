const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../models/userModel");

/**
 * @route       POST user/signup
 * @description Sign Up
 * @access      Public
 */
router.post("/signup", async (req, res) => {
  try {
    const { displayName, email, password, confirmPassword } = req.body;

    // Check empty fields
    if (!displayName || !email || !password || !confirmPassword) {
      // Check empty Display name
      if (!displayName) {
        return res.status(400).json({
          status: false,
          message: "Please enter display name.",
        });
      } else {
        // Check empty email address
        if (!email) {
          return res.status(400).json({
            status: false,
            message: "Please enter email address.",
          });
        } else {
          // Check empty password
          return res.status(400).json({
            status: false,
            message: "Please enter password.",
          });
        }
      }
    } else {
      // Check password length
      if (password.length < 5 || confirmPassword.length < 5) {
        return res.status(400).json({
          status: false,
          message: "Password needs to be at least 5 characters long.",
        });
      } else {
        // Compare password
        if (password !== confirmPassword) {
          return res.status(400).json({
            status: false,
            message: "Please match passwords.",
          });
        } else {
          // If all checks pass

          const existingUser = await User.findOne({
            email: email,
          });

          // Check for existing user
          if (existingUser) {
            return res.status(400).json({
              status: false,
              message: "User with this email address already exists.",
            });
          } else {
            const salt = await bcrypt.genSalt(10);
            const hashpass = await bcrypt.hash(password, salt);

            const newUser = new User({
              displayName: displayName,
              email: email,
              password: hashpass,
            });

            const savedUser = await newUser.save();

            const token = jwt.sign(
              {
                id: savedUser._id,
              },
              process.env.JWT_SECRET
            );

            return res.status(200).json({
              status: true,
              message: "New user created successfully.",
              token: token,
            });
          }
        }
      }
    }
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

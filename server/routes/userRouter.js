const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const validateEmail = require("../../shared/validateEmail");
const User = require("../models/userModel");
const auth = require("../middleware/auth");
const { findByIdAndUpdate } = require("../models/userModel");

/**
 * @route       POST user/signup
 * @description Sign Up
 * @access      Public
 */
router.post("/signup", async (req, res) => {
  try {
    const { displayName, email, password, confirmPassword } = req.body;

    if (!displayName || !email || !password || !confirmPassword) {
      if (!displayName) {
        return res.status(400).json({
          status: false,
          message: "Please enter display name.",
        });
      } else {
        if (!email) {
          return res.status(400).json({
            status: false,
            message: "Please enter email address.",
          });
        } else {
          return res.status(400).json({
            status: false,
            message: "Please enter password.",
          });
        }
      }
    } else {
      if (!validateEmail(email)) {
        return res.status(400).json({
          status: false,
          message: "Please enter a valid email address.",
        });
      } else {
        if (password.length < 5 || confirmPassword.length < 5) {
          return res.status(400).json({
            status: false,
            message: "Password needs to be at least 5 characters long.",
          });
        } else {
          if (password !== confirmPassword) {
            return res.status(400).json({
              status: false,
              message: "Please match passwords.",
            });
          }
        }
      }
    }

    const existingUser = await User.findOne({
      email: email,
    });

    if (existingUser) {
      return res.status(400).json({
        status: false,
        message: "User with this email address already exists.",
      });
    }

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
  } catch (error) {
    console.error(`${error.message}`.red);
    res.status(500).json({
      status: false,
      message: "Something went wrong!",
    });
  }
});

/**
 * @route       POST user/signin
 * @description Sign In
 * @access      Public
 */
router.post("/signin", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      if (!email) {
        return res.status(400).json({
          status: false,
          message: "Please enter email address.",
        });
      } else {
        return res.status(400).json({
          status: false,
          message: "Please enter password.",
        });
      }
    } else {
      if (!validateEmail(email)) {
        return res.status(400).json({
          status: false,
          message: "Please enter a valid email address.",
        });
      } else {
        if (password.length < 5) {
          return res.status(400).json({
            status: false,
            message: "Password needs to be at least 5 characters long.",
          });
        }
      }
    }

    const user = await User.findOne({
      email: email,
    });

    if (!user) {
      return res.status(400).json({
        status: false,
        message: "User with this email address does not exist.",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({
        status: false,
        message: "Invalid credentials.",
      });
    }

    const token = jwt.sign(
      {
        id: user._id,
      },
      process.env.JWT_SECRET
    );

    return res.status(200).json({
      status: true,
      message: "Logged in successfully.",
      token: token,
    });
  } catch (error) {
    console.error(`${error.message}`.red);
    res.status(500).json({
      status: false,
      message: "Something went wrong!",
    });
  }
});

/**
 * @route       PATCH user/update
 * @description Update account
 * @access      Private
 */
router.patch("/update", auth, async (req, res) => {
  try {
    const userID = req.user;
    const updates = req.body;
    const options = {
      new: true,
    };

    const updatedUser = await User.findByIdAndUpdate(userID, updates, options);

    res.status(200).json({
      status: true,
      message: "User updated successfully.",
      body: {
        displayName: updatedUser.displayName,
        email: updatedUser.email,
      },
    });
  } catch (error) {
    console.error(`${error.message}`.red);
    res.status(500).json({
      status: false,
      message: "Something went wrong!",
    });
  }
});

/**
 * @route       DELETE user/delete
 * @description Delete account
 * @access      Private
 */
router.delete("/delete", auth, async (req, res) => {
  try {
    const userID = req.user;
    const deletedUser = await User.findByIdAndDelete(userID);

    if (!deletedUser) {
      return res.status(400).json({
        status: false,
        message: "User does not exist.",
      });
    }

    res.status(200).json({
      status: true,
      message: "User deleted successfully.",
    });
  } catch (error) {
    console.error(`${error.message}`.red);
    res.status(500).json({
      status: false,
      message: "Something went wrong!",
    });
  }
});

module.exports = router;

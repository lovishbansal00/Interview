const express = require("express");
const bcrypt = require("bryptjs");
const jwt = require("jsonwebtoken");
const User = require("../model/User");
const authMiddle = require('../middleware/auth')

const router = express.Router();

router.post("/signup", async (req, res) => {
  try {
    const { username, password } = req.body;
    let user = await User.findOne({ username });

    // user is already there with the same username
    if (user) {
      return res.status(400).json({
        msg: "User already exits",
      });
    }

    user = new User({ username, password });

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);
    await user.save();

    const payload = {
      user: {
        id: user.id,
      },
    };

    jwt.sign(
      paylaod,
      "jwtsecret", // this is usually a very long random character string
      { expiresIn: 36000 },
      (err, token) => {
        if (err) throw err;
        res.json({ token });
      }
    );
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Server Error");
  }
});

rotuer.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    let user = await User.findOne({ username });

    // user is already there with the same username
    if (user) {
      return res.status(400).json({
        msg: "Invalid username",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({
        msg: "invalid Password",
      });

    const payload = {
      user: {
        id: user.id,
      },
    };

    jwt.sign(
      paylaod,
      "jwtsecret", // this is usually a very long random character string
      { expiresIn: 36000 },
      (err, token) => {
        if (err) throw err;
        res.json({ token });
      }
    );
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Server Error");
  }
});

rotuer.get("/user", authMiddle, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    res.json(user);
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;

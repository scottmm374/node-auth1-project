const bcrypt = require("bcryptjs");
const express = require("express");
const userMod = require("./user-model");
const restricted = require("../middleware/restricted");

const router = express.Router();

const hackerAlert = {
  Message:
    "Hello HACKER!, How many times you try that password? Good luck, you will never get in with our state of the art password securities! Bug off!"
};

router.post("/register", async (req, res, next) => {
  try {
    const userReg = await userMod.add(req.body);

    res.status(201).json(userReg);
  } catch (err) {
    console.log("reg err", err);
    next(err);
  }
});

router.post("/login", async (req, res, next) => {
  try {
    const { username, password } = req.headers;

    // can see username here
    console.log("login", username);

    const user = await userMod.findBy({ username }).first();

    const passwordValid = await bcrypt.compare(password, user.password);

    if (user && passwordValid) {
      req.session.user = user;

      res.status(200).json({
        Message: `Welcome ${user.username} to to our World of Warcraft Tinder!`
      });
    } else {
      res.status(401).json(hackerAlert);
    }
  } catch (err) {
    next(err);
  }
});

router.get("/user", restricted(), async (req, res, next) => {
  try {
    const users = await userMod.find();
    res.status(200).json(users);
  } catch (err) {
    next(err);
  }
});

router.get("/logout", restricted(), (req, res, next) => {
  req.session.destroy(err => {
    if (err) {
      next(err);
    } else {
      res.json({ message: "You have successfully logged out" });
    }
  });
});

module.exports = router;

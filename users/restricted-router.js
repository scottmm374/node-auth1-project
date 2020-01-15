const bcrypt = require("bcryptjs");
const express = require("express");
const userMod = require("./user-model");

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
    const { userName, password } = req.body;

    const userInfo = await userMod.findBy({ userName }).first();

    const passwordValid = await bcrypt.compare(password, userInfo.password);

    if (userInfo && passwordValid) {
      res.status(200).json({
        Message: `Welcome ${userInfo.userName} to to our World of Warcraft Tinder!`
      });
    } else {
      res.status(401).json(hackerAlert);
    }
  } catch (err) {
    next(err);
  }
});

module.exports = router;

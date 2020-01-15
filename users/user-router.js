const bcrypt = require("bcryptjs");
const express = require("express");
const um = require("./user-model");

const router = express.Router();

const hackerAlert = {
  Message:
    "Hello HACKER!, How many times you try that password? Good luck, you will never get in with our state of the art password securities! Bug off!"
};

router.get("/", resticted(), async (req, res, next) => {
  try {
    const user = await um.find();
    res.status(200).json(user);
  } catch (err) {
    next(err);
  }
});

router.post("/register", async (req, res, next) => {
  try {
    const userReg = await um.add(req.body);
    res.status(201).json(userReg);
  } catch (err) {
    console.log("reg err", err);
    next(err);
  }
});

router.post("/login", async (req, res, next) => {
  try {
    const { userName, password } = req.body;
    const userInfo = await um.findBy({ userName }).first();

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

function resticted() {
  return async (req, res, next) => {
    try {
      const { userName, password } = req.headers;
      if (!userName || !password) {
        return res.staus(401).json(hackerAlert);
      }

      const user = await um.findBy({ userName }).first();
      if (!user) {
        return res.staus(401).json(hackerAlert);
      }

      const passwordValid = await bcrypt.compare(password, user.password);
      if (!passwordValid) {
        return res.staus(401).json(hackerAlert);
      }
      next();
    } catch (err) {
      next();
    }
  };
}

module.exports = router;

const bcrypt = require("bcryptjs");
const express = require("express");
const um = require("./user-model");

const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const user = await um.find();
    res.json(user);
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

    if (user) {
      res.status(200).json({
        Message: `Welcome ${userInfo.userName} to to our World of Warcraft Dating app!`
      });
    } else {
      res.status(401).json({
        Message:
          "Hello HACKER!, How many times you try that password? Good luck, you will never get in with our state of the art password securities! Bug off!"
      });
    }
  } catch (err) {
    next(err);
  }
});

module.exports = router;

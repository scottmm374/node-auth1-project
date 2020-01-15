const bcrypt = require("bcryptjs");
const express = require("express");
const userMod = require("./user-model");

const router = express.Router();

const hackerAlert = {
  Message:
    "Hello HACKER!, How many times you try that password? Good luck, you will never get in with our state of the art password securities! Bug off!"
};

function restricted() {
  return async (req, res, next) => {
    try {
      const { userName, password } = req.headers;
      if (!userName || !password) {
        return res.status(401).json({ Message: "invalid credentials" });
      }

      const user = await userMod.findBy({ userName }).first();
      if (!user) {
        return res.status(401).json(hackerAlert);
      }

      const passwordValid = await bcrypt.compare(password, user.password);
      if (!passwordValid) {
        return res.status(401).json(hackerAlert);
      }
      next();
    } catch (err) {
      next(err);
    }
  };
}

router.get("/", restricted(), async (req, res, next) => {
  try {
    const user = await userMod.find();
    res.status(200).json(user);
  } catch (err) {
    next(err);
  }
});

module.exports = router;

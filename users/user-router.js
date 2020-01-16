const bcrypt = require("bcryptjs");
const express = require("express");
const userMod = require("./user-model");

const router = express.Router();

function restricted() {
  const hackerAlert = {
    Message:
      "Hello HACKER!, How many times you try that password? Good luck, you will never get in with our state of the art password securities! Bug off!"
  };
  return async (req, res, next) => {
    try {
      const { password, userName } = req.body;
      if (!password || !userName) {
        console.log(userName, password);

        return res.status(401).json({ message: "invalid credentials" });
      }

      const user = await userMod.findBy({ userName }).first();
      console.log("user", user);
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
    const users = await userMod.find();
    res.status(200).json(users);
  } catch (err) {
    next(err);
  }
});

module.exports = router;

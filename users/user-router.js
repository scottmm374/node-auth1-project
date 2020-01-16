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
      const { password, username } = req.headers; // ! Will NOT work as req.headers returns userName as undefined Cannot have caps in header.
      console.log("Req-body", username, password);
      if (!password || !username) {
        return res.status(401).json({ message: "invalid credentials" });
      }

      const user = await userMod.findBy({ username }).first();
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

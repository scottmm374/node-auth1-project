module.exports = () => {
  return (req, res, next) => {
    if (!req.session || !req.session.user) {
      return res.status(401).json({
        Message: "You are not Authorized"
      });
    }
    next();
  };
};

// Before sessions and cookies
// function restricted() {
//   const hackerAlert = {
//     Message:
//       "Hello HACKER!, How many times you try that password? Good luck, you will never get in with our state of the art password securities! Bug off!"
//   };
//   return async (req, res, next) => {
//     try {
//       const { password, username } = req.headers;
//       console.log("Req-body", username, password);
//       if (!password || !username) {
//         return res.status(401).json({ message: "invalid credentials" });
//       }

//       const user = await userMod.findBy({ username }).first();
//       console.log("user", user);
//       if (!user) {
//         return res.status(401).json(hackerAlert);
//       }

//       const passwordValid = await bcrypt.compare(password, user.password);
//       if (!passwordValid) {
//         return res.status(401).json(hackerAlert);
//       }
//       next();
//     } catch (err) {
//       next(err);
//     }
//   };
// }

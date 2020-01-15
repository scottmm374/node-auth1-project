const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const userRouter = require("./users/user-router.js");
const restrictedRouter = require("./users/restricted-router.js");

const server = express();
const port = process.env.PORT || 5000;

server.use(helmet());
server.use(cors());
server.use(express.json());

server.use("/api/user", userRouter);
server.use("/api/restricted", restrictedRouter);

server.get("/", (req, res, next) => {
  res.json({
    message: "Welcome to our World of Warcraft Dating app"
  });
});

server.use((err, req, res, next) => {
  console.log("Error:", err);

  res.status(500).json({
    message: "What did you do? Did you push the wrong button?"
  });
});

server.listen(port, () => {
  console.log(`\n** Running on http://localhost:${port} **\n`);
});

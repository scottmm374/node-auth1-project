const express = require("express");
const session = require("express-session");

const dbConfig = require("./data/db.config");
// const userRouter = require("./users/user-router.js");
const restrictedRouter = require("./users/restricted-router.js");
const KnexSessionStore = require("connect-session-knex")(session);

const server = express();
const port = process.env.PORT || 5000;

server.use(express.json());
server.use(
  session({
    resave: false,
    saveUninitialized: false,
    secret: "For the Horde",
    cookie: {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 3,
      secure: false
    },
    store: new KnexSessionStore({
      knex: dbConfig,
      createtable: true
    })
  })
);

// server.use("/api/user", userRouter);
server.use("/api/restricted", restrictedRouter);

server.get("/", (req, res, next) => {
  res.json({
    message: "Welcome to Sessions and Cookies"
  });
});

server.use((err, req, res, next) => {
  console.log("Error:", err);

  res.status(500).json({
    message: "Something went wrong"
  });
});

server.listen(port, () => {
  console.log(`\n** Running on http://localhost:${port} **\n`);
});

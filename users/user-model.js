const db = require("../data/db.config.js");
const bcrypt = require("bcryptjs");

module.exports = {
  add,
  find,
  findById,
  findBy
};

function find() {
  return db("user as u").select(
    "u.userName",
    "u.age",
    "u.race",
    "u.class",
    "u.faction"
  );
}

async function add(user) {
  user.password = await bcrypt.hash(user.password, 8);
  const [id] = await db("user").insert(user);
  return findById(id);
}

function findById(id) {
  return db("user")
    .where({ id })
    .first("id", "userName");
}

function findBy(filter) {
  return db("user")
    .where(filter)
    .select("id", "userName", "password");
}

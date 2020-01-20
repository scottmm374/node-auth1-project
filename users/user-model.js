const db = require("../data/db.config.js");
const bcrypt = require("bcryptjs");

module.exports = {
  add,
  find,
  findById,
  findBy
};

function find() {
  return db("users").select("id", "username");
}

async function add(user) {
  user.password = await bcrypt.hash(user.password, 8);
  const [id] = await db("users").insert(user);
  return findById(id);
}

function findById(id) {
  return db("users")
    .where({ id })
    .first("id", "username");
}

function findBy(filter) {
  return db("users")
    .where(filter)
    .select("id", "username", "password");
}

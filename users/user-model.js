const db = require("../data/db.config.js");
const bcrypt = require("bcryptjs");

module.exports = {
  add,
  find,
  findById
  //   findBy
};

function find() {
  return db("user").select();
}

async function add(user) {
  const [id] = await db("user").insert(user);
  return findById(id);
}

function findById(id) {
  return db("user")
    .where({ id })
    .first("id", "userName");
}

// function findBy(filter) {
//   return db("user")
//     .where(filter)
//     .select("id", "userName", "password");
// }

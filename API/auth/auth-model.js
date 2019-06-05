const db = require("../../data/dbConfig");

module.exports = {
  createUser,
  getUserByUsername,
  googleFindUserById,
  googleCreateUser
};

function createUser(user) {
  return db("users")
    .insert(user)
    .returning("*");
}

function getUserByUsername(username) {
  return db("users")
    .where({ username })
    .returning("*");
}

function googleFindUserById(profileId) {
  return db("users")
    .select()
    .where({ auth_id: profileId })
    .first();
}

function googleCreateUser(user) {
  return db("users").insert(user);
}

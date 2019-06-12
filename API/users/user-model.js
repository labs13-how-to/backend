const db = require("../../data/dbConfig.js");

module.exports = {
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
  getUserPosts,
  createUser
};

function getAllUsers() {
  return db("users");
}

function getUserById(id) {
  return db("users")
    .where({ id })
    .first();
}

function getUserPosts(userId) {
  return db("posts as p")
    .join("users as u", "u.id", "p.created_by")
    .select(
      "u.username",
      "p.img_url",
      "p.description",
      "p.difficulty",
      "p.duration",
      "p.skills",
      "p.supplies",
      "p.created_at"
    )
    .where("p.created_by", userId);
}

function createUser(user) {
  return db("users")
    .insert(user)
    .returning("*");
}

function updateUser(id, changes) {
  return db("users")
    .where({ id })
    .update(changes)
    .then(count => {
      if (count > 0) {
        return getUserById(id);
      } else {
        return null;
      }
    });
}

function deleteUser(id) {
  return db("users")
    .where({ id })
    .first()
    .del();
}

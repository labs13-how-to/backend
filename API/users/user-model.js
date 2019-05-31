const db = require("../../data/dbConfig.js");

module.exports = {
    getAllUsers,
    getUserById
};

function getAllUsers() {
    return db("users")
};

function getUserById(id) {
    return db("users")
    .where({ id })
    .first()
};
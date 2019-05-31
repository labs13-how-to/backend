const db = require("../../data/dbConfig.js");

module.exports = {
    getAllPosts,
    getPostById
}

function getAllPosts() {
    return db("posts")
};

function getPostById(id) {
    return db("posts")
    .where({ id })
    .first()
};
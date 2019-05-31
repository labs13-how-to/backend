const db = require("../../data/dbConfig.js");

module.exports = {
    getAllPosts
}

function getAllPosts() {
    return db("posts")
};
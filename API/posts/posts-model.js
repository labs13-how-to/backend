const db = require("../../data/dbConfig.js");

module.exports = {
    getAllPosts,
    getPostById,
    addNew,
    remove,
}

function getAllPosts() {
    return db("posts")
};

function getPostById(id) {
    return db("posts")
    .where({ id })
    .first()
};

function addNew(post) {
    return db("posts")
    .insert(post)
    .then(id => {
        return getPostById(id[0])
    });
};

function remove(id) {
    return db("posts")
    .where({ id })
    .first()
    .del()
};
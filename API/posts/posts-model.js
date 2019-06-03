const db = require("../../data/dbConfig.js");

module.exports = {
    getAllPosts,
    getPostById,
    addNew,
    remove,
    update,
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

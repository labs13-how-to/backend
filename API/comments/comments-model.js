const db = require("../../data/dbConfig.js");

module.exports = {
    getByUser,
    getByPost,
    getById,
    getId,
    addNew,
    remove
};

function getByUser(id) {
    return db("user_post_comments")
        .where({ user_id: id })
}

function getByPost(id) {
    return db("user_post_comments")
        .where({ post_id: id })
}
function getId(id) {
    return db("user_post_comments")
        .where({ id })
        .first()
}

function getById(userId, postId) {
    return db("user_post_comments")
        .where({ post_id: postId, user_id: userId })
}

function addNew(favorite) {
    return db("user_post_comments")
        .insert(favorite, "id")
        .then(([id]) => {
            return getId(id);
        });
}

function remove(id) {
    return null
}
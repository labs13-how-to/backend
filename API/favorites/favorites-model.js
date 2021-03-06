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
    return db("user_favorites")
        .where({ user_id: id })
}

function getByPost(id) {
    return db("user_favorites")
        .where({ post_id: id })
}
function getId(id) {
    return db("user_favorites")
        .where({ id })
        .first()
}

function getById(userId, postId) {
    return db("user_favorites")
        .where({ post_id: postId, user_id: userId })
        .first();
}

function addNew(favorite) {
    return getById(favorite.user_id, favorite.post_id).then(res => {
        if (!res) {
            return db("user_favorites")
                .insert(favorite, "user_id")
                .then(([user_id]) => {
                    return getByUser(user_id);
                });
        } else {
            return { message: 'that favorite already exists' };
        }
    })


}

function remove(id) {
    return db("user_favorites")
        .where({ id })
        .first()
        .del();
}
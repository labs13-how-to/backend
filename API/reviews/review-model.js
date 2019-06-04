const db = require("../../data/dbConfig.js");

module.exports = {
    get,
    getByUser,
    addNew,
    remove,
    update,
    getById
}

function get(id) {
    return db("user_post_reviews")
        .where({ post_id: id })
};

function getByUser(uId) {
    return db("user_post_reviews")
        .where({ user_id: uId })
};

function getById(id) {
    return db("posts")
        .where({ id })
        .first()
};

function addNew(reviewPost) {
    return db("user_post_reviews")
        .insert(reviewPost)
    // .then(id => {
    //     return getById(id[0])
    // });

};

function remove(id) {
    return null
};

function update(id, changes) {
    return null
};
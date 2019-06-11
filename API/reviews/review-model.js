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
    return db("user_post_reviews as upr")
        .select("upr.*", "u.username")
        .where({ "upr.post_id": id })
        .join("users as u", {"upr.user_id": "u.id"})
};

function getByUser(uId) {
    return db("user_post_reviews")
        .where({ user_id: uId })
};

function getById(id) {
    return db("user_post_reviews")
        .where({ id })
        .first()
};

function addNew(reviewPost) {
    return db("user_post_reviews")
        .insert(reviewPost)

};

function remove(id) {
    return db("user_post_reviews")
        .where({ id })
        .first()
        .del()
};

function update(id, changes) {
    return db("user_post_reviews")
        .where({ id })
        .update(changes)
        .then(count => {
            if (count > 0) {
                return getById(id)
            } else {
                return null;
            }
        })
};
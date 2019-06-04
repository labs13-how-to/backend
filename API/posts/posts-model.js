const db = require("../../data/dbConfig.js");

module.exports = {
    getAllPosts,
    getPostById,
    addNew,
    remove,
    update
}

function getAllPosts() {
    return db("posts")
};

async function getPostById(id) {
    return new Promise(async (resolve, reject) => {
        let post, steps;
        try {
            await db.transaction(async trx => {
                post = await db("posts")
                    .where({ id })
                    .first()
                    .returning('*')
                    .transacting(trx);
                steps = await db("post_steps")
                    .where({ post_id: id })
                    .transacting(trx);
            })
            !post
                ? resolve(null)
                : resolve({ ...post, steps });
        } catch(err) {
            reject(err);
        }
    })
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

function update(id, changes) {
    return db("posts")
    .where({ id })
    .update(changes)
    .then(count => {
        if(count > 0) {
            return getPostById(id)
        } else {
            return null;
        }
    })
};
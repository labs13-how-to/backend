const db = require("../../data/dbConfig.js");

module.exports = {
    getAllPosts,
    getPostById,
    createPost,
    removePost,
    updatePost
}

function getAllPosts() {
    return db("posts")
};

function getPostById(id) {
    // Use promise for router error handling
    return new Promise(async (resolve, reject) => {
        let post, steps;
        try {
            // Use knex transaction to only call to DB once
            await db.transaction(async trx => {
                // Grab the specified post
                post = await db("posts")
                    .where({ id })
                    .first()
                    .returning('*')
                    .transacting(trx);
                // Grab the steps for that post
                steps = await db("post_steps")
                    .where({ post_id: id })
                    .orderBy('step_num')
                    .transacting(trx);
            })
            !post
                ? resolve(null) // If post doesn't exist, return null to trigger 404
                : resolve({ ...post, steps });
        } catch(err) {
            reject(err);
        }
    })
};

function createPost(post) {
    let {steps, ...rest} = post;
    // rest = {...rest, created_by} // Insert user_id from JWT
    let post_id;
    // Use promise for router error handling
    return new Promise(async (resolve, reject) => {
        try {
            await db.transaction(async trx => {
                // Create new post and grab its ID
                [post_id] = await db("posts")
                    .insert(rest)
                    .returning('id')
                    .transacting(trx);
                // Create steps w/ ID of the post they're associated with
                steps = steps.map(step => ({...step, post_id}))
                console.log(steps)
                await db("post_steps")
                    .insert(steps)
                    .transacting(trx);
            })
            resolve(post_id);
        } catch(err) {
            reject(err)
        }
    })
};

function removePost(id) {
    return db("posts")
    .where({ id })
    .first()
    .del()
};

function updatePost(id, changes) {
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
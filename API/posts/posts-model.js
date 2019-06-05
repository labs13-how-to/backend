const db = require("../../data/dbConfig.js");

module.exports = {
  getAllPosts,
  getPostById,
  createPost,
  addPostTag,
  addPostStep,
  removePost,
  removePostTag,
  removePostStep,
  updatePost,
  updatePostTag,
  updatePostStep
};

function getAllPosts() {
  return db("posts");
}

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
          .returning("*")
          .transacting(trx);
        // Grab the tags for that post
        tags = await db("post_tags as pt")
          .where({ post_id: id })
          .join("tags as t", { "pt.tag_id": "t.id" })
          .transacting(trx);
        // Grab the steps for that post
        steps = await db("post_steps")
          .where({ post_id: id })
          .orderBy("step_num")
          .transacting(trx);
      });
      !post
        ? resolve(null) // If post doesn't exist, return null to trigger 404
        : resolve({ ...post, tags, steps });
    } catch (err) {
      reject(err);
    }
  });
}

async function createPost(post) {
    const [post_id] = await db("posts")
        .insert(post)
        .returning("id");
    return post_id;
}

function addPostTag(post_id, tag_id) {
    return db("post_tags")
        .insert({post_id, tag_id});
}

function addPostStep(post_id, step) {
    return db("post_steps")
        .insert({...step, post_id});
}

function removePost(id) {
  return new Promise(async (resolve, reject) => {
    try {
        await db.transaction(async trx => {
            // Delete the specified post's steps
            await db("post_steps")
                .where({post_id: id})
                .del()
                .transacting(trx);
            // Delete the specified post's tag associations
            await db("post_tags")
                .where({post_id: id})
                .del()
                .transacting(trx);
            // Delete the specified post itself
            const deleted = await db("posts")
                .where({id})
                .del()
                .transacting(trx);
            // Return with the number of posts deleted
            resolve(deleted);
        })
    } catch(err) {
        reject(err);
    }
  })
}

function removePostTag(post_id, tag_id) {
    return db("post_tags")
        .where({post_id, tag_id})
        .del();
}

function removePostStep(id) {
    return db("post_steps")
        .where({id})
        .del();
}

function updatePost(id, changes) {
    // Separate out arrays from post object
    let { tags, steps, ...rest } = changes;
    
    return new Promise(async (resolve, reject) => {
        try {
            await db.transaction(async trx => {
                if(rest.length) {
                    // Update top-level post data
                    await db("posts")
                        .where({id})
                        .update(rest)
                        .transacting(trx);
                }
            })
            resolve(id);
        } catch(err) {
            reject(err);
        }
    })
}

function updatePostTag(post_id, tag_id, changes) {
    return db("post_tags")
        .where({post_id, tag_id})
        .update(changes);
}

function updatePostStep(id, changes) {
    return db("post_steps")
        .where({id})
        .update(changes);
}

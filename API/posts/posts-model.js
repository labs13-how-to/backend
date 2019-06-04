const db = require("../../data/dbConfig.js");

module.exports = {
  getAllPosts,
  getPostById,
  createPost,
  removePost,
  updatePost
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

function createPost(post) {
  // Separate out arrays from post object
  let { tags, steps, ...rest } = post;
  // rest = {...rest, created_by} // Insert user_id from JWT
  let post_id;
  // Use promise for router error handling
  return new Promise(async (resolve, reject) => {
    try {
      await db.transaction(async trx => {
        // Create new post and grab its ID
        [post_id] = await db("posts")
          .insert(rest)
          .returning("id")
          .transacting(trx);

        // Find tags that already exist
        const existingTags = await db("tags")
          .whereIn("name", tags)
          .transacting(trx);
        const existingIDs = existingTags.map(tag => tag.id);
        const existingNames = existingTags.map(tag => tag.name);
        // Separate out tags that don't exist yet
        const newNames = tags.reduce((arr, name) => {
          return !existingNames.includes(name) ? [...arr, { name }] : arr;
        }, []);
        // Create any new tags
        let newIDs = [];
        if (newNames.length) {
          newIDs = await db("tags")
            .insert(newNames, "id")
            .transacting(trx);
        }
        // Associate new & existing tags with new post
        tagIDs = existingIDs.concat(newIDs);
        tags = tagIDs.map((tag_id, i) => ({ post_id, tag_id }));
        await db("post_tags")
          .insert(tags)
          .transacting(trx);

        // Create steps w/ ID of the post they're associated with
        steps = steps.map(step => ({ ...step, post_id }));
        await db("post_steps")
          .insert(steps)
          .transacting(trx);
      });
      resolve(post_id);
    } catch (err) {
      reject(err);
    }
  });
}

function removePost(id) {
  return db("posts")
    .where({ id })
    .first()
    .del();
}

function updatePost(id, changes) {
  return db("posts")
    .where({ id })
    .update(changes)
    .then(count => {
      if (count > 0) {
        return getPostById(id);
      } else {
        return null;
      }
    });
}

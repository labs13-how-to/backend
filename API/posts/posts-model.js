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

        if(!!tags) {
            // Find tags that already exist
            const existingTags = await db("tags")
              .whereIn("name", tags)
              .transacting(trx);
            const existingIDs = existingTags.map(tag => tag.id);
            const existingNames = existingTags.map(tag => tag.name);
            // Separate out tags that don't exist yet
            const newNames = tags.reduce((arr, name) => {
              return !existingNames.includes(name)
                ? [...arr, { name }]
                : arr;
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
        }

        if(!!steps) {
            // Create steps w/ ID of the post they're associated with
            steps = steps.map(step => ({ ...step, post_id }));
            await db("post_steps")
              .insert(steps)
              .transacting(trx);
        }
      });
      resolve(post_id);
    } catch (err) {
      reject(err);
    }
  });
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

function updatePost(id, changes) {
    // Separate out arrays from post object
    let { tags, steps, ...rest } = changes;
    steps = steps.sort((a, b) => a.step_num - b.step_num);
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

                if(!!tags) {
                    // Find associated tags
                    const mappedTags = await db("post_tags as pt")
                        .where({post_id: id})
                        .join("tags as t", {"pt.tag_id": "t.id"})
                        .transacting(trx);

                    // Find tags that shouldn't be associated with the post anymore
                    const oldTagIDs = mappedTags.reduce((arr, tag) => {
                        return !tags.includes(tag.name)
                            ? [...arr, tag.id]
                            : arr
                    }, []);
                    // Delete outdated tag associations
                    await db("post_tags")
                        .whereIn("tag_id", oldTagIDs)
                        .andWhere({post_id: id})
                        .del()
                        .transacting(trx);
                    // Find tags that already exist
                    const existingTags = await db("tags")
                        .whereIn("name", tags)
                        .transacting(trx);
                    const existingTagIDs = existingTags.map(tag => tag.id);
                    const existingTagNames = existingTags.map(tag => tag.name);
                    // Separate out tags that don't exist yet
                    const newTagNames = tags.reduce((arr, name) => {
                        return !existingTagNames.includes(name)
                            ? [...arr, { name }]
                            : arr;
                    }, []);
                    // Create any new tags
                    let newTagIDs = [];
                    if (newTagNames.length) {
                        newTagIDs = await db("tags")
                        .insert(newTagNames, "id")
                        .transacting(trx);
                    }
                    // Separate out tags that exist but aren't mapped to the post
                    const mappedTagIDs = mappedTags.map(tag => tag.id);
                    const unmappedTagIDs = existingTagIDs.filter(id => !mappedTagIDs.includes(id));
                    // Associate new & unmapped existing tags with the post
                    tagIDs = unmappedTagIDs.concat(newTagIDs);
                    tags = tagIDs.reduce((arr, tag_id) => ({ post_id: id, tag_id }), []);
                    await db("post_tags")
                        .insert(tags)
                        .transacting(trx);
                }

                if(!!steps) {
                    
                }
            })
            resolve(id);
        } catch(err) {
            reject(err);
        }
    })
}

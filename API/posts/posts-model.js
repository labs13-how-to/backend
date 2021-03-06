const db = require("../../data/dbConfig.js");

module.exports = {
  getAllPosts,
  getPostById,
  getStepsByPostId,
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
  return new Promise(async (resolve, reject) => {
    let posts, reviews;
    try {
      await db.transaction(async trx => {
        posts = await db("posts as p")
          .select("p.*", "u.username")
          .join("users as u", { "p.created_by": "u.auth_id" })
          .transacting(trx);
        reviews = await db("user_post_reviews")
          .select("post_id")
          .count("*")
          .avg("rating")
          .groupBy("post_id")
          .transacting(trx);
        comments = await db("user_post_comments")
          .select("post_id")
          .count("*")
          .groupBy("post_id")
          .transacting(trx);
        favorites = await db("user_favorites")
          .select("post_id")
          .count("*")
          .groupBy("post_id");
        tags = await db("post_tags as pt")
          .select("pt.*", "t.name")
          .join("tags as t", { "pt.tag_id": "t.id" })
          .transacting(trx);
      })
      posts = posts.map(post => {
        post.tags = [];
        tags.forEach(tagged => {
          if (tagged.post_id === post.id) {
            post.tags.push(tagged);
          }
        })
        post.review_count = 0;
        post.review_avg = 0;
        reviews.forEach(reviewed => {
          if (reviewed.post_id === post.id) {
            post.review_count = Number(reviewed.count);
            post.review_avg = Number(reviewed.avg);
          }
        })
        post.comments_count = 0;
        comments.forEach(commented => {
          if (commented.post_id === post.id) {
            post.comments_count = Number(commented.count);
          }
        })
        post.favorites_count = 0;
        favorites.forEach(favorited => {
          if (favorited.post_id === post.id) {
            post.favorites_count = Number(favorited.count);
          }
        })
        return post;
      })
      resolve(posts)
    } catch (err) {
      reject(err);
    }
  })
}

function getPostById(post_id) {
  // Use promise for router error handling
  return new Promise(async (resolve, reject) => {
    let post, steps;
    try {
      // Use knex transaction to only call to DB once
      await db.transaction(async trx => {
        // Grab the specified post
        post = await db("posts as p")
          .select("p.*", "u.username")
          .where({ "p.id": post_id })
          .join("users as u", { "p.created_by": "u.auth_id" })
          .first()
          .transacting(trx);
        // Grab the tags for that post
        tags = await db("post_tags as pt")
          .select("pt.*", "t.name")
          .where({ post_id })
          .join("tags as t", { "t.id": "pt.tag_id" })
          .transacting(trx);
        // Grab the steps for that post
        steps = await db("post_steps")
          .where({ post_id })
          .orderBy("step_num")
          .transacting(trx);
        reviews = await db("user_post_reviews")
          .where({ post_id });
        comments = await db("user_post_comments")
          .where({ post_id });
        favorites = await db("user_favorites")
          .where({ post_id });
      });
      !post
        ? resolve(null) // If post doesn't exist, return null to trigger 404
        : resolve({ ...post, tags, steps, reviews, comments, favorites });
    } catch (err) {
      reject(err);
    }
  });
}

function getStepsByPostId(post_id) {
  return new Promise(async (resolve, reject) => {
    let post, steps;
    try {
      // Use knex transaction to only call to DB once
      await db.transaction(async trx => {
        post = await db("posts")
          .where({ id: post_id })
          .transacting(trx);
        steps = await db("post_steps")
          .where({ post_id })
          .transacting(trx);
      })
      !post.length
        ? resolve(null)
        : resolve(steps);
    } catch (err) {
      reject(err);
    }
  })
}

async function createPost(post) {
  const [post_id] = await db("posts")
    .insert(post)
    .returning("id");
  return post_id;
}

function addPostTag(post_id, tag_id) {
  return db("post_tags")
    .insert({ post_id, tag_id })
    .returning("id");
}

function addPostStep(post_id, step) {
  return db("post_steps")
    .insert({ ...step, post_id })
    .returning("id");
}

function removePost(id) {
  return new Promise(async (resolve, reject) => {
    try {
      await db.transaction(async trx => {
        // Delete the specified post's steps
        await db("post_steps")
          .where({ post_id: id })
          .del()
          .transacting(trx);
        // Delete the specified post's tag associations
        await db("post_tags")
          .where({ post_id: id })
          .del()
          .transacting(trx);
        // Delete the favorites for the specified post
        await db("user_favorites")
          .where({ post_id: id })
          .del()
          .transacting(trx);
        // Delete the reviews for the specified post
        await db("user_post_reviews")
          .where({ post_id: id })
          .del()
          .transacting(trx);
        // Delete the comments for the specified post
        await db("user_post_comments")
          .where({ post_id: id })
          .del()
          .transacting(trx);
        // Delete the specified post itself
        const deleted = await db("posts")
          .where({ id })
          .del()
          .transacting(trx);
        // Return with the number of posts deleted
        resolve(deleted);
      })
    } catch (err) {
      reject(err);
    }
  })
}

function removePostTag(post_id, tag_id) {
  return db("post_tags")
    .where({ post_id, tag_id })
    .del();
}

function removePostStep(id) {
  return db("post_steps")
    .where({ id })
    .del();
}

function updatePost(id, changes) {
  return db("posts")
    .where({ id })
    .update(changes)
    .returning("id");
}

function updatePostTag(post_id, tag_id, changes) {
  return db("post_tags")
    .where({ post_id, tag_id })
    .update(changes);
}

function updatePostStep(id, changes) {
  return db("post_steps")
    .where({ id })
    .update(changes);
}

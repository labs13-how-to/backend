const faker = require("faker");

const generateSeeds = () => {
  const numOfComments = 20;
  let arr = [];
  for (let i = 0; i < numOfComments; i++) {
    arr.push({
      user_id: Math.ceil(Math.random() * 500),
      post_id: Math.ceil(Math.random() * 20),
      comment: faker.lorem.sentence()
    });
  }
  return arr;
}

exports.seed = async function(knex, Promise) {
  const comments = await generateSeeds();
  
  return knex
    .raw("TRUNCATE TABLE user_post_comments RESTART IDENTITY CASCADE")
    .then(function () {
      return knex("user_post_comments").insert(comments);
    });
};

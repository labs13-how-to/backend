const faker = require("faker");

const generateSeeds = () => {
  const numOfReviews = 20;
  let arr = [];
  for (let i = 0; i < numOfReviews; i++) {
    arr.push({
      user_id: Math.ceil(Math.random() * 500),
      post_id: Math.ceil(Math.random() * 20),
      rating: Math.ceil(Math.random() * 5),
      review: faker.lorem.paragraph()
    });
  }
  return arr;
}

exports.seed = async function(knex, Promise) {
  const reviews = await generateSeeds();
  
  return knex
    .raw("TRUNCATE TABLE user_post_reviews RESTART IDENTITY CASCADE")
    .then(function () {
      return knex("user_post_reviews").insert(reviews);
    });
};

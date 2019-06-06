const faker = require("faker");

const generateSeeds = () => {
  const numOfFavorites = 500;
  let arr = [];
  for (let i = 0; i < numOfFavorites; i++) {
    arr.push({
      user_id: i + 1,
      post_id: Math.ceil(Math.random() * 20),
    });
  }
  return arr;
}

exports.seed = async function(knex, Promise) {
  const favorites = await generateSeeds();
  
  return knex
    .raw("TRUNCATE TABLE user_favorites RESTART IDENTITY CASCADE")
    .then(function () {
      return knex("user_favorites").insert(favorites);
    });
};

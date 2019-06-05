const faker = require("faker");
const {genUniqueArr} = require("../helpers.js");

const generateSeeds = () => {
  const numOfTags = 20;
  const tagsUnique = genUniqueArr(numOfTags, faker.random.word);
  let arr = [];
  for (let i = 0; i < numOfTags; i++) {
    arr.push({
      name: tagsUnique[i]
    });
  }
  return arr;
}

exports.seed = async function(knex, Promise) {
  const tags = await generateSeeds();
  return knex.raw("TRUNCATE TABLE tags RESTART IDENTITY CASCADE")
    .then(function () {
      return knex('tags').insert(tags);
    });
};

const faker = require("faker");
const {genUniqueArr} = require("../helpers.js");

const generateSeeds = () => {
  const numOfPosts = 20;
  const post_idUnique = genUniqueArr(numOfPosts, () => Math.ceil(Math.random() * 20))
  let arr = [];
  for (let i = 0; i < numOfPosts; i++) {
    const post_id = post_idUnique[i];
    for (let j = 1; j < 4; j++) {
      arr.push({
        post_id,
        step_num: j,
        title: faker.lorem.sentence(),
        instruction: faker.lorem.paragraph(),
        img_url: faker.image.image()
      });
    }
  }
  return arr;
}

exports.seed = async function(knex, Promise) {
  const steps = await generateSeeds();
  
  return knex
    .raw("TRUNCATE TABLE post_steps RESTART IDENTITY CASCADE")
    .then(function () {
      return knex("post_steps").insert(steps);
    });
};

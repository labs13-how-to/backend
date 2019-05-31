const faker = require("faker");

const generatePosts = async () => {
  let arr = [];

  for (let i = 0; i <= 4; i++) {
    for (let x = 1; x <= 4; x++) {
      arr.push({
        user_id: x,
        title: faker.lorem.word(),
        img_url: faker.image.imageUrl(),
        description: faker.lorem.sentences(),
        difficulty: faker.lorem.word(),
        duration: faker.random.number(),
        skills: faker.lorem.words(),
        supplies: faker.lorem.words()
      });
    }
  }
};

exports.seed = async function(knex, Promise) {
  const posts = await generatePosts();

  return (
    knex
      // Deletes ALL existing entries for posts table
      .raw("TRUNCATE TABLE posts RESTART IDENTITY CASCADE")
      .then(function() {
        return knex("posts").insert(posts);
      })
  );
};

const faker = require("faker");

const generatePosts = async () => {
  const difficulty = ["easy", "intermediate", "advanced", "professional"];
  let arr = [];

  for (let i = 0; i <= 4; i++) {
    for (let x = 1; x <= 4; x++) {
      arr.push({
        created_by: x,
        title: faker.lorem.word(),
        img_url: faker.image.imageUrl(),
        description: faker.lorem.sentences(),
        difficulty: difficulty[Math.floor(Math.random() * difficulty.length)],
        duration: faker.random.number(),
        skills: faker.lorem.words(),
        supplies: faker.lorem.words()
      });
    }
  }
  return arr;
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

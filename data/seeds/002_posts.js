const faker = require("faker");

const httpsImgs = [
  "https://images.unsplash.com/photo-1551118947-62fdc66ad799?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80",
  "https://images.unsplash.com/photo-1415383552502-d44cf10dfc7e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1055&q=80",
  "https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80",
  "https://images.unsplash.com/photo-1517373116369-9bdb8cdc9f62?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80",
  "https://images.unsplash.com/photo-1555664424-778a1e5e1b48?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80",
  "https://images.unsplash.com/photo-1556093752-fe3f83f4ae0f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1048&q=80",
  "https://images.unsplash.com/photo-1534190239940-9ba8944ea261?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1189&q=80",
  "https://images.unsplash.com/photo-1503236641037-129adbdfb266?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80",
  "https://images.unsplash.com/photo-1496678518751-46244eef08c4?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80",
  "https://images.unsplash.com/photo-1491798456967-0f20aa2b60f6?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1266&q=80",
  "https://images.unsplash.com/photo-1472517990513-4f22ae253bd3?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1053&q=80",
  "https://images.unsplash.com/photo-1458829549177-e9a8f3db5b14?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80",
  "https://images.unsplash.com/photo-1494831906219-7efab78108d9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1266&q=80",
  "https://images.unsplash.com/photo-1475174767135-6d48cae73003?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80",
  "https://images.unsplash.com/photo-1446611720526-39d16597055c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80",
  "https://images.unsplash.com/photo-1475578749612-705fc64d0574?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80",
  "https://images.unsplash.com/photo-1505798577917-a65157d3320a?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80",
  "https://images.unsplash.com/photo-1536236155319-1edab471917c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1051&q=80",
  "https://images.unsplash.com/photo-1540103711724-ebf833bde8d1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1055&q=80",
  "https://images.unsplash.com/photo-1522065893269-6fd20f6d7438?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80"
]

const generatePosts = async () => {
  const difficulty = ["Very Easy", "Easy", "Moderate", "Hard", "Very Hard"];
  let arr = [];

  for (let i = 0; i <= 4; i++) {
    for (let x = 1; x <= 4; x++) {
      arr.push({
        created_by: `${90000000000 + x}`,
        title: faker.lorem.words(),
        img_url: httpsImgs[Math.floor(Math.random() * 20)],
        description: faker.lorem.sentences(),
        difficulty: difficulty[Math.floor(Math.random() * difficulty.length)],
        duration: `${Math.ceil(Math.random() * 12)} hours, ${Math.floor(Math.random() * 12) * 5} minutes`,
        skills: faker.lorem.words(),
        supplies: faker.lorem.words()
      });
    }
  }
  return arr;
};

exports.seed = async function (knex, Promise) {
  const posts = await generatePosts();

  return (
    knex
      // Deletes ALL existing entries for posts table
      .raw("TRUNCATE TABLE posts RESTART IDENTITY CASCADE")
      .then(function () {
        return knex("posts").insert(posts);
      })
  );
};

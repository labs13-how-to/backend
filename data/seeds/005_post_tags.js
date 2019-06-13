const generateSeeds = () => {
  const numOfReviews = 20;
  let arr = [];
  for (let i = 0; i < numOfReviews; i++) {
    arr.push({
      post_id: Math.ceil(Math.random() * 20),
      tag_id: Math.ceil(Math.random() * 15)
    });
  }
  return arr;
}

exports.seed = async function(knex, Promise) {
  const post_tags = await generateSeeds();
  
  return knex
    .raw("TRUNCATE TABLE post_tags RESTART IDENTITY CASCADE")
    .then(function () {
      return knex("post_tags").insert(post_tags);
    });
};

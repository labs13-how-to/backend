const generateSeeds = () => {
  const numOfFollowers = 500;
  let arr = [];
  for (let i = 0; i < numOfFollowers; i++) {
    arr.push({
      follower_id: i + 1,
      following_id: Math.ceil(Math.random() * 500)
    });
  }
  return arr;
}

exports.seed = async function(knex, Promise) {
  const followers = await generateSeeds();
  
  return knex
    .raw("TRUNCATE TABLE followers RESTART IDENTITY CASCADE")
    .then(function () {
      return knex("followers").insert(followers);
    });
};

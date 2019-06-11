const faker = require("faker");
const {genUniqueArr} = require("../helpers.js");

const generateSeeds = () => {
  const numOfUsers = 500;
  const usernameUnique = genUniqueArr(numOfUsers, faker.name.findName);
  const auth_idUnique = genUniqueArr(numOfUsers, () => `${(Math.floor(Math.random() * 99999999999) + 900000000000)}`);
  let arr = [];
  for (let i = 0; i < numOfUsers; i++) {
    arr.push({
      username: usernameUnique[i],
      auth_id: auth_idUnique[i],
      role: "user"
    });
  }
  return arr;
};

exports.seed = async function(knex, Promise) {
  const users = await generateSeeds();

  return (
    knex
      // Deletes ALL existing entries for users table
      .raw("TRUNCATE TABLE users RESTART IDENTITY CASCADE")
      .then(function() {
        return knex("users").insert(users);
      })
  );
};

const faker = require("faker");

const genUniqueArr = (num, fakerFn) => {
  let arr = [];
  while (arr.length < num) {
    const temp = fakerFn();
    if (!arr.includes(temp)) {
      arr.push(temp);
    }
  }
  return arr;
};

const generateSeeds = () => {
  const numOfUsers = 500;
  const usernameUnique = genUniqueArr(numOfUsers, faker.internet.userName);
  const auth_idUnique = genUniqueArr(numOfUsers, faker.random.uuid)
  let arr = [];
  for (let i = 0; i < numOfUsers; i++) {
    arr.push({
      //.findName() creates a full name (first and last)
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

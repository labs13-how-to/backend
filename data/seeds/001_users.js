const bcrypt = require("bcryptjs");

exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex
    .raw("TRUNCATE TABLE users RESTART IDENTITY CASCADE")
    .then(function() {
      // Inserts seed entries
      return knex("users").insert([
        { username: "Austin", password: bcrypt.hashSync("password", 8) },
        { username: "Patrick", password: bcrypt.hashSync("password", 8) },
        { username: "Matt", password: bcrypt.hashSync("password", 8) },
        { username: "Nick", password: bcrypt.hashSync("password", 8) }
      ]);
    });
};

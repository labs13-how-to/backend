const db = require('../../data/dbConfig');

module.exports = {
  createUser,
  getUserByUsername,
}

function createUser(user) {
  return db('users').insert(user).returning('*');
}

function getUserByUsername(username) {
  return db('users').where({username}).returning('*');
}

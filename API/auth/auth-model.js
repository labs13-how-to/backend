const db = require('../../data/dbConfig');

module.exports = {
  login,
  register,
}

function login(username) {
  return db('users').where(username).returning('*');
}

function register(user) {
  return db('users').insert(user).returning('*');
}

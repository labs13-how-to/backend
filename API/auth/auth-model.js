const db = require('../basicModel');

module.exports = {
  login,
  register,
}

function login(username) {
  return db('users').where(username).returning('*').first();
}

async function register(user) {
  return db('users').insert(user).returning('*');
}

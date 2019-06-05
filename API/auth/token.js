const jwt = require("jsonwebtoken");

// Generate JWT
async function genToken(user) {
  const { id, username, role } = user[0];
  const payload = { subject: id, username, role };
  const jwtSecret = process.env.JWT_SECRET;
  const opt = { expiresIn: "2h" };
  return jwt.sign(payload, jwtSecret, opt);
}

module.exports = { genToken };

const jwt = require("jsonwebtoken");

// Generate JWT
function genToken(user) {
  const { id, displayName } = user;
  console.log("USER ID", user.id)
  const payload = { subject: id, username: displayName };
  const jwtSecret = process.env.JWT_SECRET;
  const opt = { expiresIn: "2h" };
  return jwt.sign(payload, jwtSecret, opt);
}

module.exports = { genToken };

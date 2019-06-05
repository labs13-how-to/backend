const jwt = require('jsonwebtoken');

module.exports = {
  auth
}

function auth(req, res, next) {
  const jwtSecret = process.env.JWT_SECRET;
  const token = req.headers.authorization;
  jwt.verify(token, jwtSecret, (err, decoded) => {
    if(!err) {
      req.decoded = decoded;
      next();
    } else {
      res.status(403).json({ error: 'You do not have permission to access this data' })
    }
  })
}

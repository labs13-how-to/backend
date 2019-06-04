const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const db = require('./auth-model');

// Generate JWT
async function genToken(user) {
  const { id, username, role } = user[0];
  const payload = { subject: id, username, role }
  const jwtSecret = process.env.JWT_SECRET;
  const opt = { expiresIn: '2h' }
  return jwt.sign(payload, jwtSecret, opt);
}

// Simple register
router.post('/register', (req, res) => {
  let user = req.body;
  const hash = bcrypt.hashSync(user.password, 12);
  user.password = hash;
  db.createUser(user)
    .then(async created => {
      const token = await genToken(created);
      res.status(201).json({ token });
    })
    .catch(err => {
      res.status(500).json({
        error: 'Could not create the new user'
      });
    });
})

// Login w/ username and password
router.post('/login', (req, res) => {
  let { username, password } = req.body;
  db.getUserByUsername(username)
    .then(async user => {
      if (user && bcrypt.compareSync(password, user.password)) {
        const token = await genToken(user);
        res.status(201).json({ token });
      } else {
        res.status(401).json({
          error: 'Invalid username and/or password'
        });
      }
    })
    .catch(err => {
      res.status(500).json({
        error: 'Could not check credentials against the user database'
      });
    });
})

module.exports = router;

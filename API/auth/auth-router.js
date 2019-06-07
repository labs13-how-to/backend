const db = require("./auth-model");
const router = require("express").Router();
const passport = require("passport");
const jwt = require("./token.js");

const bcrypt = require("bcryptjs");

// // Simple register
// router.post("/register", (req, res) => {
//   let user = req.body;
//   const hash = bcrypt.hashSync(user.password, 12);
//   user.password = hash;
//   db.createUser(user)
//     .then(async created => {
//       const token = await genToken(created);
//       res.status(201).json({ token });
//     })
//     .catch(err => {
//       res.status(500).json({
//         err: err.message,
//         error: "Could not create the new user"
//       });
//     });
// });

// // Login w/ username and password
// router.post("/login", (req, res) => {
//   let { username, password } = req.body;
//   db.getUserByUsername(username)
//     .then(async user => {
//       console.log(user);
//       if (user && bcrypt.compareSync(password, user.password)) {
//         const token = await genToken(user);
//         res.status(201).json({ role: user.role, token });
//       } else {
//         res.status(401).json({
//           error: "Invalid username and/or password"
//         });
//       }
//     })
//     .catch(err => {
//       res.status(500).json({
//         err: err.message,
//         error: "Could not check credentials against the user database"
//       });
//     });
// });

// // GET root page
// router.get("/", function(request, response) {
//   response.render("index", { user: request.user });
// });

// // GET login page
// router.get("/login", function(request, response) {
//   response.render("login", { user: request.user });
// });

// GET route for when you click on login - passport authenticates through google
router.get(
  "/google",
  passport.authenticate("google", { scope: ["openid email profile"] }),
  function(request, response) {
    response.setHeader("Access-Control-Allow-Origin");
  }
);

// If successful auth - redirects to front end home page, if not - redirects to /login
router.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/login"
  }),
  function(request, response) {
    // Authenticated successfully
    response.redirect(`${process.env.FE_URL}`);
  }
);

// GET logout route - will sign person out of session
router.get("/logout", function(request, response) {
  request.logout();
  response.redirect("/");
});

// Route middleware to ensure user is authenticated.
function ensureAuthenticated(request, response, next) {
  if (request.isAuthenticated()) {
    return next();
  }
  response.redirect("/login");
}
module.exports = router;

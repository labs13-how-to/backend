const db = require("./auth-model");
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth").OAuth2Strategy;
require("dotenv").config();

const jwtSecret = process.env.JWT_SECRET;

module.exports = function(passport) {
  passport.serializeUser(function(user, done) {
    // done(null, user.id);
    done(null, user);
  });

  passport.deserializeUser(function(obj, done) {
    // Users.findById(obj, done);
    done(null, obj);
  });
  // GOOGLE OAUTH STRATEGY
  //The Google authentication strategy authenticates requests by delegating to Google using the OAuth 2.0 protocol.

  passport.use(
    new GoogleStrategy(
      {
        //process.env.GOOGLE_CLIENT_ID,
        clientID:
          "697232372364-3uq74ah0kjh2vkuqboip82n69afknfe2.apps.googleusercontent.com",
        clientSecret: "y7e_l3caVjJRgqs-WGIGrbDM", //process.env.GOOGLE_CLIENT_SECRET
        callbackURL: "http://localhost:5000/auth/google/callback"
      },
      async (accessToken, refreshToken, profile, done) => {
        console.log("accessToken", accessToken);
        console.log("refreshToken", refreshToken);
        console.log("profile", profile);
        db.googleFindUserById(profile.id).then(function(id) {
          if (id) {
            return done(null, profile);
          } else {
            const user = {
              auth_id: profile.id,
              username: profile.displayName
            };
            db.googleCreateUser(user).then(function(id) {
              return done(null, user);
            });
          }
        });
      }
    )
  );
};

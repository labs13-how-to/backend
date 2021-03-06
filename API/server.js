const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const passport = require("passport");
require("./auth/passport.js")(passport);
const bodyParser = require("body-parser");

const server = express();

//Routers
const usersRouter = require("./users/user-router.js");
const postsRouter = require("./posts/posts-router.js");
const authRouter = require("./auth/auth-router.js");
const cloudUpload = require("./cloudinary/upload.js");
const tagsRouter = require("./tags/tags-router.js");
const favoriteRouter = require("./favorites/favorites-router.js");
const commentsRouter = require("./comments/comments-router.js");
const reviewRouter = require("./reviews/review-router.js");

server.use(helmet());
server.use(express.json());
server.use(bodyParser.json());
server.use(cors());

//Initialize Passport
server.use(passport.initialize());

//Set Routes
server.use("/users", usersRouter);
server.use("/posts", postsRouter, reviewRouter);
server.use("/auth", authRouter);
server.use("/", cloudUpload, favoriteRouter, commentsRouter);
server.use("/tags", tagsRouter);

//Server Test Msg
server.get("/", (req, res) => {
  res.status(200).send({ message: "Hello from How To." });
});

module.exports = server;

const express = require('express');
const helmet = require('helmet');
const cors = require('cors');

const server = express();

//Routers
const usersRouter = require('./users/user-router.js');
const postsRouter = require('./posts/posts-router.js');
const postsRouter = require('./auth/auth-router.js');

server.use(helmet());
server.use(express.json());
server.use(cors());

//Set Routes
server.use('/users', usersRouter);
server.use('/posts', postsRouter);
server.use('/auth', authRouter);


//Server Test Msg
server.get('/', (req, res) => {
    res.status(200).send({ message: 'Hello from How To.'})
});

module.exports = server;
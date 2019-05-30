const express = require('express');
const helmet = require('helmet');
const cors = require('cors');

const server = express();

server.use(helmet());
server.use(express.json());
server.use(cors());

//Server Test Msg
server.get('/', (req, res) => {
    res.status(200).send({ message: 'Hello from How To.'})
});

module.exports = server;
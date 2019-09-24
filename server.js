const express = require('express');

const server = express();

// import routes
const postRoutes = require('./posts/postRouter')

// declare routes

server.use("/posts", postRoutes);

// middleware
server.use(express.json());


server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`)
});

//custom middleware

function logger(req, res, next) {

};


module.exports = server;

// dependencies
const express = require("express");
const helmet = require("helmet");
const cors = require("cors");

// initiate server instance
const server = express();

// import routes
const postRoutes = require("./posts/postRouter");
const userRoutes = require("./users/userRouter");

// declare routes

server.use("/posts", postRoutes);
server.use("/users", userRoutes);

// middleware
server.use(express.json());
server.use(helmet());
server.use(cors());

// server.get("/", (req, res) => {
//   res.send(`<h2>Let's write some middleware!</h2>`);
// });

//custom middleware

// function logger(req, res, next) {}

module.exports = server;

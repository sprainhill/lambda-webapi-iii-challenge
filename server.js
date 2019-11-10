// dependencies
const express = require("express");
// const helmet = require("helmet");
// const cors = require("cors");

// initiate server instance
const server = express();

// import routes
const postRoutes = require("./posts/postRouter");
const userRoutes = require("./users/userRouter");

// middleware queue
server.use(express.json());
// server.use(helmet());
// server.use(cors());
server.use(logger);

// declare routes

server.use(atGate);
server.use("/posts", postRoutes);
server.use("/users", userRoutes);
server.use(function(req, res) {
  res.status(404).send("Ain't nobody got time for that");
});

//custom middleware

function logger(req, res, next) {
  console.log(
    `[${new Date().toISOString()}] ${req.method} to ${req.url} from ${req.get(
      "Origin"
    )}`
  );
  next();
}

function atGate(req, res, next) {
  console.log(`At the gate, about to be eaten`);

  next();
}

function auth(req, res, next) {
  if (req.url === "/mellon") {
    next();
  } else {
    res.json("You shall not pass!");
  }
}

server.get("/mellon", auth, (req, res) => {
  console.log("Gate opening...");
  console.log("Inside and safe");
  res.send("Welcome weary traveler");
});

module.exports = server;

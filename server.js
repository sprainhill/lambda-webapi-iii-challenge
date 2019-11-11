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

server.use("/posts", postRoutes);
server.use("/users", userRoutes);
// server.use(validateUserId);
server.use(function(req, res) {
  res.status(404).send("Ain't nobody got time for that");
});
server.use((err, req, res, next) => {
  console.log(err);

  res.status(500).json({ message: "There was an error" });
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

// function validateUserId((id, req, res, next) => {
//     console.log("id : ", id)
//     console.log("req : ", req)
// })

module.exports = server;

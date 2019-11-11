// dependencies
const express = require("express");
const helmet = require("helmet"); // third party middleware
const morgan = require("morgan");
// const cors = require("cors");
const { testmw, logger } = require("./middleware/middleware");
// const test = middleware.testmw;

// initiate server instance
const server = express();

// import routes
const postRoutes = require("./posts/postRouter");
const userRoutes = require("./users/userRouter");

// global middleware queue
server.use(express.json());
server.use(helmet());
// server.use(passwordReader);
server.use(morgan("dev"));
// server.use(cors());
// server.use(returnReqBody);
server.use(logger);

// declare routes

server.use("/posts", postRoutes);
server.use("/users", userRoutes);

server.get("/", doubler, testmw, (req, res) => {
  console.log("req.body", req.body);
  res.status(200).json({ number: req.doubled });
});

// server.use(validateUserId);
server.use(function(req, res) {
  res.status(404).send("Ain't nobody got time for that");
});
server.use((err, req, res, next) => {
  console.log(err);

  res.status(500).json({ message: "There was an error" });
});

// function returnReqBody(req, res, next) {
//   console.log("req.body: ", req.body);
//   res.json({ reqBody: req.body });

//   next();
// }

// function validateUserId((id, req, res, next) => {
//     console.log("id : ", id)
//     console.log("req : ", req)
// })

function passwordReader(req, res, next) {
  console.log("in passwordReader");
  const password = req.headers.password;

  if (password.toLowerCase() === "mellon") {
    // password exists and is correct
    res.status(200).json({ message: "password correct" });
    next();
  } else if (password && password !== "mellon") {
    // password exists but is incorrect
    res.status(500).json({ message: "password incorrect" });
  } else if (!password) {
    // password doesnt exist
    res.status(400).json({ message: "please provide a password" });
  }
}

function doubler(req, res, next) {
  // everything coming from the url is a string

  const number = Number(req.query.number || 0);

  req.doubled = number * 2;
  next();
}

module.exports = server;

// dependencies
const express = require("express");
const helmet = require("helmet"); // third party middleware
const morgan = require("morgan");
// const cors = require("cors");

// initiate server instance
const server = express();

// import routes
const postRoutes = require("./posts/postRouter");
const userRoutes = require("./users/userRouter");

// global middleware queue
server.use(passwordReader);
server.use(express.json());
server.use(helmet());
server.use(morgan("dev"));
// server.use(cors());
// server.use(returnReqBody);
// server.use(logger);

// declare routes

server.use("/posts", postRoutes);
server.use("/users", userRoutes);

server.get("/", (req, res) => {
  console.log("home reached");
  res.json({ message: "home reached" });
});

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

// function returnReqBody(req, res, next) {
//   console.log("req.body: ", req.body);
//   res.json({ reqBody: req.body });

//   next();
// }

function passwordReader(req, res, next) {
  console.log("in passwordReader");
  const password = req.headers.password;

  if (password.toLowerCase() === "mellon") {
    next();
  } else {
    res.status(400).json({ you: "you cannot pass!" });
  }
}

// function validateUserId((id, req, res, next) => {
//     console.log("id : ", id)
//     console.log("req : ", req)
// })

module.exports = server;

const express = require("express"); // update syntax?

// import database
const postDb = require("./postDb");

const router = express.Router();

router.get("/", (req, res) => {
  res.send("you found me");
});

router.get("/:id", (req, res) => {});

router.delete("/:id", (req, res) => {});

router.put("/:id", (req, res) => {});

// custom middleware

function validatePostId(req, res, next) {}

module.exports = router;

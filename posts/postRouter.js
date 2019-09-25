const router = require("express").Router();

// import database
const postDb = require("./postDb");

router.get("/", (req, res) => {
  res.send("you found me");
});

router.get("/:id", (req, res) => {});

router.delete("/:id", (req, res) => {});

router.put("/:id", (req, res) => {});

// custom middleware

function validatePostId(req, res, next) {}

module.exports = router;

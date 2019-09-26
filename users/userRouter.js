// instantiate router
const router = require("express").Router();

//import database
const userDb = require("./userDb");

router.post("/", (req, res) => {});

router.post("/:id/posts", (req, res) => {});

router.get("/", (req, res) => {
  console.log("inside userRouter get /");
  const getUsers = userDb.get();

  getUsers
    .then(users => {
      res.status(200).json(users);
    })
    .catch(() => {
      res.status(500).json({ message: "Error retrieving users" });
    });
});

router.get("/:id", (req, res) => {
  const { id } = req.params;

  userDb
    .getById(id)
    .then(user => {
      res.status(200).json(user);
    })
    .catch(() => {
      res.status(500).json({ message: "Error retrieving user" });
    });
});

router.get("/:id/posts", (req, res) => {
  const { id } = req.params;
  userDb
    .getUserPosts(id)
    .then(posts => {
      res.status(200).json(posts);
    })
    .catch(() => {
      res.status(500).json({ message: "Error retrieving posts by user id" });
    });
});

router.delete("/:id", (req, res) => {});

router.put("/:id", (req, res) => {});

//custom middleware

function validateUserId(req, res, next) {}

function validateUser(req, res, next) {}

function validatePost(req, res, next) {}

module.exports = router;

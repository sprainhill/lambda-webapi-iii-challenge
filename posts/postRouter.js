const router = require("express").Router();

// import database
const postDb = require("./postDb");

router.get("/", (req, res) => {
  postDb.get()
  .then(posts => {
    res.status(200).json(posts);
  })
  .catch(() => {
    res.status(500).json({ message: "Error retrieving posts"})
  })
});

router.get("/:id", (req, res) => {
  const { id } = req.params;
  postDb.getById(id)
  .then(post => {
    res.status(200).json(post);
  })
  .catch(() => {
    res.status(500).json({message: "Error retrieving post by id"})
  })
});

router.delete("/:id", (req, res) => {});

router.put("/:id", (req, res) => {});

// custom middleware

function validatePostId(req, res, next) {}

module.exports = router;

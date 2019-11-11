// instantiate router
const router = require("express").Router();
const path = require("path");

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

function auth(req, res, next) {
  if (req.url === "/mellon") {
    next();
  } else {
    res.send("You shall not pass!");
  }
}

router.get("/mellon", auth, (req, res) => {
  console.log("Gate opening...");
  console.log("Inside and safe");
  res.json("Welcome weary traveler");
});

router.get("/download", (req, res, next) => {
  const filePath = path.join(__dirname, "index.html");
  res.sendFile(filePath, err => {
    // if there is an error the callback fn will
    // get an error as its first argument
    if (err) {
      // can handle error here or pass down to
      // error handling middleware
      next(err);
    } else {
      console.log("File sent successfully");
    }
  });
});

router.get("/test/:id", (req, res, next) => {
  const filePath = path.join(__dirname, "index.html");
  res.sendFile(filePath, err => {
    // if there is an error the callback fn will
    // get an error as its first argument
    if (err) {
      // can handle error here or pass down to
      // error handling middleware
      next(err);
    } else {
      console.log("File sent successfully");
    }
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

router.delete("/:id", (req, res) => {
  const { id } = req.params;

  userDb
    .remove(id)
    .then(recordNumber => {
      if (!recordNumber) {
        res.status(404).json({ message: "No record with that id" });
      }

      res
        .status(200)
        .json({ message: `${recordNumber} number of records deleted` });
    })
    .catch(() => {
      res.status(500).json({ message: "error deleting record" });
    });
});

router.put("/:id", (req, res) => {});

//custom middleware

function validateUserId(req, res, next) {}

function validateUser(req, res, next) {}

function validatePost(req, res, next) {}

module.exports = router;

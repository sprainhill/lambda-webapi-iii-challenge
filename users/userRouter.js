// instantiate router
const router = require("express").Router();
const path = require("path");

//import database
const userDb = require("./userDb");
const postDb = require("../posts/postDb");

router.post("/", validateUser, (req, res) => {
  userDb
    .insert(req.body)
    .then(user => {
      res.status(201).json(user);
    })
    .catch(() => {
      res.status(500).json({ message: "Error creating new user" });
    });
});

router.post("/:id/posts", validateUserId, validatePost, (req, res) => {
  const userPost = { ...req.body, user_id: req.params.id };
  // const { id } = req.params;
  postDb
    .insert(userPost)
    .then(post => {
      res.status(201).json(post);
    })
    .catch(() => {
      res.status(500).json({ message: `Error creating post for user {id}` });
    });
});

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

router.get("/:id", validateUserId, (req, res) => {
  // const { id } = req.params;
  console.log("req", req);
  return res.json({ user: req.user });

  // userDb
  //   .getById(id)
  //   .then(user => {
  //     res.status(200).json(user);
  //   })
  //   .catch(() => {
  //     res.status(500).json({ message: "Error retrieving user" });
  //   });
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

function validateUserId(req, res, next) {
  const { id } = req.params;

  userDb
    .getById(id)
    .then(user => {
      if (user) {
        req.user = user;
        next();
      } else {
        res.status(404).json({ error: "error retrieving (validateUserId)" });
      }
    })
    .catch(() => {
      req.error = res
        .status(500)
        .json({ message: "Something went wrong retrieving user by id" });
    });
}

function validateUser(req, res, next) {
  const body = req.body;
  const name = req.body.name;

  if (!body) {
    res.status(400).json({ message: "user details required" });
  } else if (!name) {
    res.status(400).json({ message: "user name required" });
  } else {
    next();
  }
}

function validatePost(req, res, next) {
  const post = req.body;
  const text = req.body;

  if (!post) {
    res.status(400).json({ message: "post required" });
  } else if (!text) {
    res.status(400).json({ message: "text field required" });
  } else {
    next();
  }
}

module.exports = router;

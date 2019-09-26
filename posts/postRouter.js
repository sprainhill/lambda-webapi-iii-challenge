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
    if (!post) {
      res.status(404).json({message: "No post with that id"})
    }
    res.status(200).json(post);
  })
  .catch(() => {
    res.status(500).json({message: "Error retrieving post by id"})
  })
});

router.delete("/:id", (req, res) => {
 const { id } = req.params;

 postDb.remove(id)
 .then(recordNumber => {

  if (!recordNumber) {
    res.status(404).json({message: "No record with that id"})
  }

   res.status(200).json({message: `${recordNumber} number of records deleted`})
 })
 .catch(() => {
   res.status(500).json({message: "error deleting record"})
 })


});

router.put("/:id", (req, res) => {
  // const { id } = req.params;
  // const { text, user_id } = req.body;
  const updatePost = req.body;

  console.log("put updatePost", updatePost);
  // console.log("put id", id);
  console.log("put req.params", req.params);


  // postDb.update(id, req.body)
  // .then(recordNumber => {
  //   if (!recordNumber) {
  //     res.status(404).json({message: "No post found by that id"})
  //   } else {
  //     res.status(200).json(`${recordNumber} of records updated`)
      
  //   }
  // })
  // .catch( () => {
  //   res.status(500).json({message: "error updating post"})
  // })


});

// custom middleware

function validatePostId(req, res, next) {}

module.exports = router;

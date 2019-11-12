module.exports = { logger };

//custom middleware

// logger
function logger(req, res, next) {
  console.log(
    `[${new Date().toISOString()}] ${req.method} to ${req.url} from ${req.get(
      "Origin"
    )}`
  );
  next();
}

// validateUserId()
function validateUserId(req, res, next) {
  // if id is valid store user object as req.user
  if (req.id) {
    console.log("req.id", req.id);
  } else {
    console.log("you imbecile!");
  }
  // if id parameter does not match user in db, cxl req
}

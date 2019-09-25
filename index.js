// code away!
const express = require("express");
const server = require("./server");

const port = 8000;
server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

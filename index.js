// code away!
const server = require("./server");

server.get("/download", (req, res) => {
  console.log("inside dl");
});

const port = 8000;
server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

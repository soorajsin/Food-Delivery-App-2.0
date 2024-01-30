const express = require("express");
const app = express();
require("./DB/Connection");
const port = 4000 || process.env.PORT;

app.get("/", (req, res) => {
  res.status(400).json({
    msg: "Server Start"
  });
});

app.listen(port, () => {
  console.log(`Server start on port ${port}`);
});

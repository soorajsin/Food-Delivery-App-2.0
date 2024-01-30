const express = require("express");
const app = express();
require("./DB/Connection");
const cors = require("cors");
const router = require("./Routes/Route");
const cookieParser = require("cookie-parser");
const port = 4000 || process.env.PORT;

app.get("/", (req, res) => {
  res.status(400).json({
    msg: "Server Start"
  });
});

app.use(express.json());
app.use(cors());
app.use(router);
app.use(cookieParser());

app.listen(port, () => {
  console.log(`Server start on port ${port}`);
});

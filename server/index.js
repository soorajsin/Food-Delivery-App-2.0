const express = require("express");
const app = express();
require("./DB/Connection");
const cors = require("cors");
const path = require("path");
const router = require("./Routes/Route");
const cookieParser = require("cookie-parser");
const multer = require("multer");
const upload = multer();
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
// Use multer to handle multipart/form-data
app.use(upload.array());
// Serve uploaded images statically
app.use(
  "/uploads",
  express.static(path.join(__dirname, "path/to/your/uploaded/images"))
);

app.listen(port, () => {
  console.log(`Server start on port ${port}`);
});

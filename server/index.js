const express = require("express");
const userModel = require("./models");
const app = express();
const dotenv = require("dotenv");
dotenv.config();
const database = require("./config/db");
const cors = require("cors");
const PORT = process.env.PORT || 4001;
const cookieParser = require('cookie-parser');

database.connect();
const multer = require("multer");
const path = require("path");
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use(cookieParser());
app.use("/uploads", express.static("uploads"))
 app.use("/api", require("./routes"));
app.listen(PORT, () => {
  console.log(`App is listening at ${PORT}`);
});
 
  
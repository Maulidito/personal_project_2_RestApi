var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
const db = require("./models");
const multer = require("multer");
const upload = multer();

var app = express();

//app.use(upload.array());

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(express.static(path.join(__dirname, "public")));

db.sequelize
  .sync()
  .then((res) => {
    console.log("data successfull sync to database");
  })
  .catch((err) => {
    console.log("Error ", err);
  });

app.use("/api", indexRouter);
app.use("/api/user", usersRouter);

module.exports = app;

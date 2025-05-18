require("dotenv").config();

// impotrt express library

const express = require("express");
const app = express();
const path = require("path");
const artcileRouter = require("./routers/articleRouters");
const artcileApiRouter = require("./routers/articleApiRouters");
const methodOverride = require('method-override');

app.use(methodOverride('_method'));
app.use(express.urlencoded({ extended: true }));

app.use("/articles", artcileRouter);
app.use("/api/articles", artcileApiRouter);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views")); // مجلد الصفحات
app.use(express.static(path.join(__dirname, "public"))); // مجلد الملفات الثابتة

const mongoose = require("mongoose");

const mongooseUrl = process.env.MONGODB_URL;

const port = process.env.PORT;

/**
 * connect the server with the database.
 */
mongoose
  .connect(mongooseUrl, {
    serverSelectionTimeoutMS: 30000,
  })
  .then(() => {
    console.log("DB connected successfully.");
  })
  .catch((error) => {
    console.log("error with connect to DB ", error);
  });

app.listen(port, () => {
  console.log(`I'm lestening in port: ${port}`);
});

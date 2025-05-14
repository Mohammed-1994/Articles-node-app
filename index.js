require("dotenv").config();

// impotrt express library
const express = require("express");
const app = express();

const artcileRouter = require("./routers/articleRouters");
app.use("/", artcileRouter);

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

// impotrt express library
const express = require("express");
const app = express();

const artcileRouter = require("./routers/articleRouters");

app.use("/", artcileRouter)

const mongoose = require("mongoose");

//mongog db connect link
//  mongodb+srv://merooa937:<db_password>@cluster0.6kkuex2.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
const mongooseUrl =
  "mongodb+srv://merooa937:amazoona-14@cluster0.6kkuex2.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

/**
 * connect the server with the database.
 *
 */
mongoose
  .connect(mongooseUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 30000, // زيادة المهلة إلى 30 ثانية
  })
  .then(() => {
    console.log("DB connected successfully.");
  })
  .catch((error) => {
    console.log("error with connect to DB ", error);
  });

app.listen(3000, () => {
  console.log("I'm lestening in port 3000");
});

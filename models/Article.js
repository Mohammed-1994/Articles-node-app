// for mongodb lib
const mongoose = require("mongoose");

// for build a schema for the document 
const Schema = mongoose.Schema;

// this is the schema with key value for entitiy.
const articleSchemd = new Schema({
  title: String,
  body: String,
  numberOfLikes: Number,
});

// create an entity in the collection with name article and with schema 
const Article = mongoose.model("Article", articleSchemd);

// export the article to other file in the project to use it to connect to the db.
module.exports = Article;


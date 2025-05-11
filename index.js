// impotrt express library
const express = require("express");
/**
 * import artile model  from models folder to use it to connect with th DB.
 *
 * ODM this object used for connect with DB and do all work.
 */
const Article = require("./models/Article");

const mongoose = require("mongoose");
const app = express();

// using json in server to recive body params in json
app.use(express.json());

//mongog db connect link
//  mongodb+srv://merooa937:<db_password>@cluster0.6kkuex2.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
const mongooseUrl =
  "mongodb+srv://merooa937:amazoona-14@cluster0.6kkuex2.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

/**
 * connect the server with the database.
 *
 */
mongoose
  .connect(mongooseUrl,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 30000 // زيادة المهلة إلى 30 ثانية
})
  .then(() => {
    console.log("DB connected successfully.");
  })
  .catch((error) => {
    console.log("error with connect to DB ", error);
  });
/**
 * using put request
 */
app.put("/add_file", (req, res) => {
  res.send("the file add successfully");
});

/**
 * using delete request
 */
app.delete("/test_delete", (req, res) => {
  res.send("deleted successfully");
});

/**
 * using get request and do some work in server.
 */
app.get("/get_evens", (req, res) => {
  let evens = "";
  for (let i = 0; i <= 20; i++) {
    i % 2 == 0 ? (evens += i + ",  ") : "  ";
  }

  res.send("even numbers are : " + evens);
});

/**
 * using get request and using (path pararms) coming in the request.
 */
app.get("/find_sum/:num1/:num2", (req, res) => {
  //extract the params frome the request.
  const num1 = parseInt(req.params.num1);
  const num2 = parseInt(req.params.num2);
  const sum = num1 + num2;

  // send the result
  res.send("the sum =  " + sum);
});

/**
 * using get request and using (body params ) .
 */
app.get("/say_hi", (req, res) => {
  // extracting body params from the request.
  const body = req.body;
  const name = body.name;
  const age = body.age;
  res.send("hi " + name + ", your age is: " + age);
});

/**
 * using get request and using (query params ) .
 */
app.get("/say_age", (req, res) => {
  // extracting query params from the request.
  const queryParams = req.query;
  const age = queryParams.age;

  res.send(`Your age is:  ${age}`);
});

/**
 * use get request
 * use query params
 * use body params
 * use path params
 * and send json response.
 */
app.get("/show_details/:name", (req, res) => {
  const queryParams = req.query;
  const bodyyParams = req.body;

  const name = req.params.name;
  const age = queryParams.age;
  const area = bodyyParams.area;
  const lang = bodyyParams.lang;

  res.json({
    name: name,
    age: age,
    area: area,
    lang: lang,
  });
});

/**
 * send an html file as a response
 * use ejs to render html files
 * attach json data from the server to the html file
 *
 */
app.get("/data_file", (req, res) => {
  res.render("numbers.ejs", {
    name: "Mohammed Awad fromd json",
  });
});

// ======= articles endpoints ======

/**
 * Add one article
 * get the title and the body from json body params
 * extract the params (title and the body)
 * recive the promise that returned from the sace fun
 * send the reposns as json article
 */
app.post("/add_article", (req, res) => {
  const articleTitle = req.body.articleTitle;
  const articleBody = req.body.articleBody;
  const newArticle = new Article();
  newArticle.title = articleTitle;
  newArticle.body = articleBody;
  newArticle.numberOfLikes = 123;

  newArticle
    .save()
    .then((article) => {
      res.json({
        status: " article added successfully.",
        "new article": article,
      });
    })
    .catch((error) => {
      console.log("error adding article", error);
    });
});

/**
 * get all article from database.
 * using Article modlel to connect with the DB.
 * and retreve all articles as json response.
 */
app.get("/articles", async (req, res) => {
  const allArticles = await Article.find();

  res.json(allArticles);
});

/**
 * get one article by ID
 * the ID coming frome path params
 * extreacting the ID from the path params.
 *
 */
app.get("/articles/:articleID", async (req, res) => {
  const articleId = req.params.articleID;
  const article = await Article.findById(articleId);
  res.json(article);
});

app.delete("/articles/:articleID", async (req, res) => {
  res.json(await Article.findByIdAndDelete(req.params.articleID));
});
app.listen(3000, () => {
  console.log("I'm lestening in port 3000");
});

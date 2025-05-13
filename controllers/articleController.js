/**
 * import article model  from models folder to use it to connect with th DB.
 * ODM this object used for connect with DB and do all work.
 */
const Article = require("../models/Article");

// using json in server to recive body params in json

/**
 * get all article from database.
 * using Article modlel to connect with the DB.
 * and retreve all articles as json response.
 */
exports.getAllArticles = async (req, res) => {
  const allArticles = await Article.find();
  res.json(allArticles);
};

/**
 * get one article by ID
 * the ID coming frome path params
 * extreacting the ID from the path params.
 *
 */
exports.getArticleByID = async (req, res) => {
  const articleId = req.params.articleID;
  res.json(await Article.findById(articleId));
};

exports.deleteArticle = async (req, res) => {
  res.json(await Article.findByIdAndDelete(req.params.articleID));
};

/**
 * Add one article
 * get the title and the body from json body params
 * extract the params (title and the body)
 * recive the promise that returned from the sace fun
 * send the reposns as json article
 */
exports.addArticle = (req, res) => {
  const articleTitle = req.body.articleTitle;
  const articleBody = req.body.articleBody;
  const newArticle = new Article();
  newArticle.title = articleTitle;
  newArticle.body = articleBody;
  newArticle.numberOfLikes = 0;

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
};

exports.updateArticle = (req, res) => {
  Article.findByIdAndUpdate(
    req.params.articleID,

    { title: req.body.articleTitle, body: req.body.articleBody },
    { new: true }
  )
    .then((updatedArticle) => {
      if (!updatedArticle) {
        return res.status(404).json({ message: "Article not found" });
      }

      res.json({
        status: "Article Updated Successfully.",
        article: updatedArticle,
      });
    })
    .catch((error) => {
      console.log("Error Updating Article", error);
      res.status(500).json({ error: "Failed to update article" });
    });
};

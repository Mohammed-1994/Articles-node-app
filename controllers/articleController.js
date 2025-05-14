/**
 * import article model  from models folder to use it to connect with th DB.
 * ODM this object used for connect with DB and do all work.
 */
const Article = require("../models/Article");
const sendResponse = require("../helper/responseHelper");

// input validator
const Joi = require("joi");


/**
 * get all article from database.
 * using Article modlel to connect with the DB.
 * and retreve all articles as json response.
 */
exports.getAllArticles = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 5;
  const totalArticles = await Article.countDocuments();

  const skip = (page - 1) * limit;
  try {
    const allArticles = await Article.find().skip(skip).limit(limit);

    sendResponse(res, 200, "success", "All Articles", allArticles, null, {
      totalArticles,
      totlaPages: Math.ceil(totalArticles / limit),
      currentPage: page,
    });
  } catch (error) {
    console.log(error);

    sendResponse(res, 500, "error", "Server Error", null, error.message);
  }
};

const articleSchema = Joi.object({
  articleTitle: Joi.string().min(3).required(),
  articleBody: Joi.string().min(10).required(),
});

/**
 * get one article by ID
 * the ID coming frome path params
 * extreacting the ID from the path params.
 *
 */
exports.getArticleByID = async (req, res) => {
  const articleId = req.params.articleID;
  try {
    const article = await Article.findById(articleId);
    if (!article) {
      sendResponse(
        res,
        404,
        "error",
        "Article not exist",
        null,
        "Article not found"
      );
    }
    sendResponse(res, 200, "succes", "Aricle", article, null);
  } catch (error) {
    sendResponse(res, 500, "error", "Servers Error", null, error);
  }
};

exports.deleteArticle = async (req, res) => {
  const articleId = req.params.articleID;
  try {
    const article = await Article.findByIdAndDelete(articleId);
    if (!article) {
      sendResponse(
        res,
        404,
        "error",
        "Article not exist",
        null,
        "Article not found"
      );
    }
    sendResponse(
      res,
      200,
      "succes",
      "Article Deleted Successfully",
      article,
      null
    );
  } catch (error) {
    sendResponse(res, 500, "error", "Servers Error", null, error);
  }
};

/**
 * Add one article
 * get the title and the body from json body params
 * extract the params (title and the body)
 * recive the promise that returned from the sace fun
 * send the reposns as json article
 */
exports.addArticle = async (req, res) => {
  const articleTitle = req.body.articleTitle;
  const articleBody = req.body.articleBody;
  const newArticle = new Article();
  newArticle.title = articleTitle;
  newArticle.body = articleBody;
  newArticle.numberOfLikes = 0;

  try {
    const { error } = articleSchema.validate(req.body);
    if (error) {
      console.log("error with entry");
      sendResponse(
        res,
        400,
        "error",
        "Conn't add the Article",
        null,
        error.details[0].message
      );
    }
    await newArticle.save();

    sendResponse(
      res,
      201,
      "succes",
      "Article added successfully",
      newArticle,
      null
    );
  } catch (error) {
    sendResponse(res, 500, "error", "Servers Error", null, error);
  }
};

exports.updateArticle = async (req, res) => {
  const updatedArticle = await Article.findByIdAndUpdate(
    req.params.articleID,

    { title: req.body.articleTitle, body: req.body.articleBody },
    { new: true }
  );
  try {
    if (!updatedArticle) {
      sendResponse(
        res,
        404,
        "error",
        "Article not exist",
        null,
        "Article not found"
      );
    }

    sendResponse(
      res,
      200,
      "succes",
      "Article Updated Successfully.",
      updatedArticle,
      null
    );
  } catch (error) {
    sendResponse(res, 500, "error", "Failed to update article", null, error);
  }
};

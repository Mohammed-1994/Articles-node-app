/**
 * import article model  from models folder to use it to connect with th DB.
 * ODM this object used for connect with DB and do all work.
 */
const Article = require("../models/Article");

const responseHelper = require("../helper/responseHelper").default;

// input validator
const Joi = require("joi");
/**
 * get all article from database.
 * using Article modlel to connect with the DB.
 * and retreve all articles as json response.
 */

exports.createArticleForm = async (req, res) => {
  res.render("createArticleForm");
};
exports.getAllArticles = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 6;
  const totalArticles = await Article.countDocuments();

  const skip = (page - 1) * limit;
  try {
    const allArticles = await Article.find().skip(skip).limit(limit);

    return responseHelper.sendSuccessResponse(
      res,
      "Articles loaded successfully",
      allArticles,
      "articles"
    );
  } catch (error) {
    console.log(error);
    responseHelper.handleExpressError(res, err);
  }
};

/**
 * get one article by ID
 * the ID coming frome path params
 * extreacting the ID from the path params.
 *
 */
exports.getArticleByID = async (req, res) => {
  const id = req.params.id;
  try {
    const article = await Article.findById(id);
    if (!article) {
      responseHelper.sendNotFoundError(res);

      return;
    }
    return responseHelper.sendSuccessResponse(
      res,
      "Article loaded successfully",
      article,
      "articleDetails"
    );
  } catch (error) {
    responseHelper.sendServerError(res, error);
  }
};

exports.deleteArticle = async (req, res) => {
  const id = req.params.id;
  try {
    const article = await Article.findByIdAndDelete(id);
    if (!article) {
      responseHelper.sendNotFoundError(res);
      return;
    }
    res.redirect("/articles");
  } catch (error) {
    responseHelper.handleExpressError(res, error);
  }
};

const articleSchema = Joi.object({
  articleTitle: Joi.string().min(3).required(),
  articleBody: Joi.string().min(10).required(),
});

/**
 * Add one article
 * get the title and the body from json body params
 * extract the params (title and the body)
 * recive the promise that returned from the sace fun
 * send the reposns as json article
 */
exports.createArticle = async (req, res) => {
  const { articleTitle, articleBody } = req.body;
  const newArticle = new Article();
  newArticle.title = articleTitle;
  newArticle.body = articleBody;
  newArticle.numberOfLikes = 0;

  const { error } = articleSchema.validate(req.body);
  if (error) {
    responseHelper.handleExpressError(res, error);
    return;
  }
  try {
    const article = await newArticle.save();
    res.redirect(`/articles/${article._id}`);
  } catch (error) {
    responseHelper.handleExpressError(res, error);
  }
};

exports.updateArticle = async (req, res) => {
  const { error } = articleSchema.validate(req.body);
  if (error) {
    console.log("error with entry");
    responseHelper.handleExpressError(res, error);
  } else {
    try {
      const updatedArticle = await Article.findByIdAndUpdate(
        req.params.id,

        { title: req.body.articleTitle, body: req.body.articleBody },
        { new: true }
      );
      if (!updatedArticle) {
        responseHelper.sendNotFoundError(res);
        return;
      }

      res.redirect(`/articles/${updatedArticle._id}`);
    } catch (error) {
      responseHelper.sendServerError(res, error);
    }
  }
};

exports.editArticleForm = async (req, res) => {
  try {
    const article = await Article.findById(req.params.id);
    if (!article) {
      responseHelper.sendNotFoundError(res);
    }
    res.render("editArticleForm", { data: article });
  } catch (error) {
    responseHelper.sendServerError(res, error);
  }
};

exports.aboutPage = async (req, res) => {
  res.render("about");
};

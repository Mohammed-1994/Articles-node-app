const Article = require("../models/Article");
const apiResponseHelper = require("../helper/apiResponseHelper").default;
const Joi = require("joi");

const articleSchema = Joi.object({
  articleTitle: Joi.string().min(3).required(),
  articleBody: Joi.string().min(10).required(),
});
exports.getAllArticles = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 6;
  const totalArticles = await Article.countDocuments();

  const skip = (page - 1) * limit;
  try {
    const allArticles = await Article.find().skip(skip).limit(limit);

    // if the request is json
    return apiResponseHelper.sendSuccessResponse(
      res,
      "Articles loaded successfully",
      {
        articles: allArticles,
        totalArticles,
        currentPage: page,
        totalPages: Math.ceil(totalArticles / limit),
      }
    );
  } catch (error) {
    console.log(error);
    apiResponseHelper.sendServerError(res);
  }
};

exports.getArticleByID = async (req, res) => {
  const id = req.params.id;
  try {
    const article = await Article.findById(id);
    if (!article) {
      apiResponseHelper.sendNotFoundResponse(res);
      return;
    }
    return apiResponseHelper.sendSuccessResponse(
      res,
      "Article loaded successfully",
      article
    );
  } catch (error) {
    apiResponseHelper.sendServerError(res);
  }
};

exports.deleteArticle = async (req, res) => {
  const id = req.params.id;
  try {
    const article = await Article.findByIdAndDelete(id);
    if (!article) {
      apiResponseHelper.sendNotFoundResponse(res);
      return;
    }

    return apiResponseHelper.sendSuccessResponse(
      res,
      "Article deleted successfully",
      article
    );
  } catch (error) {
    apiResponseHelper.sendServerError(res);
  }
};

exports.createArticle = async (req, res) => {
  const { articleTitle, articleBody } = req.body;
  const newArticle = new Article();
  newArticle.title = articleTitle;
  newArticle.body = articleBody;
  newArticle.numberOfLikes = 0;
  const { error } = articleSchema.validate(req.body);
  if (error) {
    apiResponseHelper.sendErrorResponse(res, error.message, 400, error);
    return;
  }
  try {
    const article = await newArticle.save();
    return apiResponseHelper.sendSuccessResponse(
      res,
      "Article added successfully",
      article
    );
  } catch (error) {
    apiResponseHelper.sendServerError(res);
  }
};

exports.updateArticle = async (req, res) => {
  const { error } = articleSchema.validate(req.body);
  if (error) {
    apiResponseHelper.sendErrorResponse(res, error.message, 400, error);
  } else {
    try {
      const updatedArticle = await Article.findByIdAndUpdate(
        req.params.id,

        { title: req.body.articleTitle, body: req.body.articleBody },
        { new: true }
      );
      if (!updatedArticle) {
        apiResponseHelper.sendNotFoundResponse(res);
        return;
      }

      // if the request is json
      return apiResponseHelper.sendSuccessResponse(
        res,
        "Article updated successfully",
        updatedArticle
      );
    } catch (error) {
      apiResponseHelper.sendServerError(res);
    }
  }
};

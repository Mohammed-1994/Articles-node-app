// File: routers/articleApiRouters.js
// import the articleApiController
const express = require("express");
const router = express.Router();
const articleApiController = require("../controllers/articleApiControllers");
router.use(express.json());

router.get("/", articleApiController.getAllArticles);
router.post("/", articleApiController.createArticle);
router.get("/:id", articleApiController.getArticleByID);
router.put("/:id", articleApiController.updateArticle);
router.delete("/:id", articleApiController.deleteArticle);

module.exports = router;
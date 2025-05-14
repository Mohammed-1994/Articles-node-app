const express = require("express");
const router = express.Router();
const articleConroller = require("../controllers/articleController");


// using json in server to recive body params in json
router.use(express.json());


router.get("/", articleConroller.getAllArticles);

router.post("/articles/add_article", articleConroller.addArticle);

router.get("/articles/:articleID", articleConroller.getArticleByID);

router.get("/articles", articleConroller.getAllArticles);

router.delete("/articles/:articleID", articleConroller.deleteArticle);

router.put("/articles/:articleID", articleConroller.updateArticle);

module.exports = router;

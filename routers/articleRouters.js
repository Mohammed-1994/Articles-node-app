const express = require("express");
const router = express.Router();
const articleController = require("../controllers/articleController");
router.use(express.json());

router.get("/", articleController.getAllArticles);

router.post("/", articleController.createArticle);

router.get("/create_form", articleController.createArticleForm);

router.get('/about', articleController.aboutPage);
router.get("/:id", articleController.getArticleByID);

router.delete("/:id", articleController.deleteArticle);

router.put("/:id", articleController.updateArticle);

router.get('/:id/edit', articleController.editArticleForm);


module.exports = router;

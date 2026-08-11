const express = require("express");
const {
  listArticles,
  uploadArticleImageHandler,
  createArticle,
  updateArticle,
  deleteArticle,
} = require("../controllers/articleController");

function createArticleRouter() {
  const router = express.Router();

  router.get("/", listArticles);
  router.post("/upload-image", uploadArticleImageHandler);
  router.post("/", createArticle);
  router.put("/:id", updateArticle);
  router.delete("/:id", deleteArticle);

  return router;
}

module.exports = { createArticleRouter };

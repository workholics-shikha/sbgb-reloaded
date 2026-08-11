const express = require("express");
const { listCategories, createCategory, updateCategory, deleteCategory } = require("../controllers/categoryController");

function createCategoryRouter({ jwtSecret }) {
  const router = express.Router();
  router.get("/", listCategories);
  router.post("/", createCategory);
  router.put("/:id", updateCategory);
  router.delete("/:id", deleteCategory);
  return router;
}

module.exports = { createCategoryRouter };

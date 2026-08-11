const express = require("express");
const {
  listGalleries,
  uploadGalleryImageHandler,
  createGallery,
  updateGallery,
  deleteGallery,
} = require("../controllers/galleryController");

function createGalleryRouter() {
  const router = express.Router();
  router.get("/", listGalleries);
  router.post("/upload-image", uploadGalleryImageHandler);
  router.post("/", createGallery);
  router.put("/:id", updateGallery);
  router.delete("/:id", deleteGallery);
  return router;
}

module.exports = { createGalleryRouter };

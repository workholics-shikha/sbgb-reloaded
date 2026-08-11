const express = require("express");
const {
  listMedias,
  uploadMediaImageHandler,
  createMedia,
  updateMedia,
  deleteMedia,
} = require("../controllers/mediaController");

function createMediaRouter() {
  const router = express.Router();
  router.get("/", listMedias);
  router.post("/upload-image", uploadMediaImageHandler);
  router.post("/", createMedia);
  router.put("/:id", updateMedia);
  router.delete("/:id", deleteMedia);
  return router;
}

module.exports = { createMediaRouter };

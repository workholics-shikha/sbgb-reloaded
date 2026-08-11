const express = require("express");
const {
  listVideos,
  uploadVideoImageHandler,
  createVideo,
  updateVideo,
  deleteVideo,
} = require("../controllers/videoController");

function createVideoRouter() {
  const router = express.Router();
  router.get("/", listVideos);
  router.post("/upload-image", uploadVideoImageHandler);
  router.post("/", createVideo);
  router.put("/:id", updateVideo);
  router.delete("/:id", deleteVideo);
  return router;
}

module.exports = { createVideoRouter };

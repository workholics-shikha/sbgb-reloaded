const express = require("express");
const {
  listStories,
  uploadStoryImageHandler,
  createStory,
  updateStory,
  deleteStory,
} = require("../controllers/storyController");

function createStoryRouter() {
  const router = express.Router();
  router.get("/", listStories);
  router.post("/upload-image", uploadStoryImageHandler);
  router.post("/", createStory);
  router.put("/:id", updateStory);
  router.delete("/:id", deleteStory);
  return router;
}

module.exports = { createStoryRouter };

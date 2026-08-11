const express = require("express");
const {
  listSliders,
  uploadSliderImageHandler,
  createSlider,
  updateSlider,
  deleteSlider,
} = require("../controllers/sliderController");

function createSliderRouter() {
  const router = express.Router();

  router.get("/", listSliders);
  router.post("/upload-image", uploadSliderImageHandler);
  router.post("/", createSlider);
  router.put("/:id", updateSlider);
  router.delete("/:id", deleteSlider);

  return router;
}

module.exports = { createSliderRouter };

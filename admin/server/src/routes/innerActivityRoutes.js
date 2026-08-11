const express = require("express");
const {
  listInnerActivities,
  uploadInnerActivityImageHandler,
  createInnerActivity,
  updateInnerActivity,
} = require("../controllers/innerActivityController");

function createInnerActivityRouter() {
  const router = express.Router();

  router.get("/", listInnerActivities);
  router.post("/upload-image", uploadInnerActivityImageHandler);
  router.post("/", createInnerActivity);
  router.put("/:id", updateInnerActivity);

  return router;
}

module.exports = { createInnerActivityRouter };

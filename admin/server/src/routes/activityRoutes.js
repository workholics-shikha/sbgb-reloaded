const express = require("express");
const {
  listActivities,
  uploadActivityImageHandler,
  createActivity,
  updateActivity,
  deleteActivity,
} = require("../controllers/activityController");

function createActivityRouter() {
  const router = express.Router();

  router.get("/", listActivities);
  router.post("/upload-image", uploadActivityImageHandler);
  router.post("/", createActivity);
  router.put("/:id", updateActivity);
  router.delete("/:id", deleteActivity);

  return router;
}

module.exports = { createActivityRouter };

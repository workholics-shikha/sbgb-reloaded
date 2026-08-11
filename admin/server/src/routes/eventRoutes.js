const express = require("express");
const {
  listEvents,
  getEvent,
  uploadEventImageHandler,
  createEvent,
  updateEvent,
  deleteEvent,
} = require("../controllers/eventController");

function createEventRouter() {
  const router = express.Router();

  router.get("/", listEvents);
  router.get("/:id", getEvent);
  router.post("/upload-image", uploadEventImageHandler);
  router.post("/", createEvent);
  router.put("/:id", updateEvent);
  router.delete("/:id", deleteEvent);

  return router;
}

module.exports = { createEventRouter };

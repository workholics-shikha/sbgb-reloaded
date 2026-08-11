const express = require("express");
const {
  listSbgbpRegistrationConfig,
  listSbgbpRegistrations,
  createSbgbpRegistration,
  deleteSbgbpRegistration,
} = require("../controllers/sbgbpRegistrationController");

function createSbgbpRegistrationRouter() {
  const router = express.Router();

  router.get("/config", listSbgbpRegistrationConfig);
  router.get("/", listSbgbpRegistrations);
  router.post("/", createSbgbpRegistration);
  router.delete("/:id", deleteSbgbpRegistration);

  return router;
}

module.exports = { createSbgbpRegistrationRouter };

const express = require("express");
const {
  listSammanSamarohRegistrationConfig,
  listSammanSamarohRegistrations,
  createSammanSamarohRegistration,
  deleteSammanSamarohRegistration,
} = require("../controllers/sammanSamarohRegistrationController");

function createSammanSamarohRegistrationRouter() {
  const router = express.Router();

  router.get("/config", listSammanSamarohRegistrationConfig);
  router.get("/", listSammanSamarohRegistrations);
  router.post("/", createSammanSamarohRegistration);
  router.delete("/:id", deleteSammanSamarohRegistration);

  return router;
}

module.exports = { createSammanSamarohRegistrationRouter };

const express = require("express");
const {
  listUtthanRegistrationConfig,
  listUtthanRegistrations,
  createUtthanRegistration,
  deleteUtthanRegistration,
} = require("../controllers/utthanCoachingRegistrationController");

function createUtthanCoachingRegistrationRouter() {
  const router = express.Router();
  router.get("/config", listUtthanRegistrationConfig);
  router.get("/", listUtthanRegistrations);
  router.post("/", createUtthanRegistration);
  router.delete("/:id", deleteUtthanRegistration);
  return router;
}

module.exports = { createUtthanCoachingRegistrationRouter };

const express = require("express");
const {
  listCoachingOrganizations,
  uploadCoachingOrganizationImageHandler,
  createCoachingOrganization,
  updateCoachingOrganization,
  deleteCoachingOrganization,
} = require("../controllers/coachingOrganizationController");

function createCoachingOrganizationRouter() {
  const router = express.Router();
  router.get("/", listCoachingOrganizations);
  router.post("/upload-image", uploadCoachingOrganizationImageHandler);
  router.post("/", createCoachingOrganization);
  router.put("/:id", updateCoachingOrganization);
  router.delete("/:id", deleteCoachingOrganization);
  return router;
}

module.exports = { createCoachingOrganizationRouter };

const express = require("express");
const {
  listImportantLinks,
  createImportantLink,
  updateImportantLink,
  deleteImportantLink,
} = require("../controllers/importantLinkController");

function createImportantLinkRouter() {
  const router = express.Router();
  router.get("/", listImportantLinks);
  router.post("/", createImportantLink);
  router.put("/:id", updateImportantLink);
  router.delete("/:id", deleteImportantLink);
  return router;
}

module.exports = { createImportantLinkRouter };

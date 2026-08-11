const express = require("express");
const { listContacts, createContact, deleteContact } = require("../controllers/contactController");

function createContactRouter() {
  const router = express.Router();
  router.get("/", listContacts);
  router.post("/", createContact);
  router.delete("/:id", deleteContact);
  return router;
}

module.exports = { createContactRouter };

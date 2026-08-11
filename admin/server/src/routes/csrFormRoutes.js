const express = require("express");
const { listCsrForms, createCsrForm } = require("../controllers/csrFormController");

function createCsrFormRouter() {
  const router = express.Router();
  router.get("/", listCsrForms);
  router.post("/", createCsrForm);
  return router;
}

module.exports = { createCsrFormRouter };

const express = require("express");
const {
  listPatrika,
  uploadPatrikaFileHandler,
  createPatrika,
  updatePatrika,
  deletePatrika,
} = require("../controllers/patrikaController");

function createPatrikaRouter() {
  const router = express.Router();
  router.get("/", listPatrika);
  router.post("/upload-file", uploadPatrikaFileHandler);
  router.post("/", createPatrika);
  router.put("/:id", updatePatrika);
  router.delete("/:id", deletePatrika);
  return router;
}

module.exports = { createPatrikaRouter };

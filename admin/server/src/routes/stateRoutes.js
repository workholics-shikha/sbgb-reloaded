const express = require("express");
const { listStates, createState, updateState, deleteState } = require("../controllers/stateController");

function createStateRouter() {
  const router = express.Router();
  router.get("/", listStates);
  router.post("/", createState);
  router.put("/:id", updateState);
  router.delete("/:id", deleteState);
  return router;
}

module.exports = { createStateRouter };

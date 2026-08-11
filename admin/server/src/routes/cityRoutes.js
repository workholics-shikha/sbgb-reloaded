const express = require("express");
const { listCities, createCity, updateCity, deleteCity } = require("../controllers/cityController");

function createCityRouter() {
  const router = express.Router();
  router.get("/", listCities);
  router.post("/", createCity);
  router.put("/:id", updateCity);
  router.delete("/:id", deleteCity);
  return router;
}

module.exports = { createCityRouter };

const express = require("express");
const {
  listDonationConfig,
  listDonations,
  createDonation,
} = require("../controllers/donationController");

function createDonationRouter() {
  const router = express.Router();

  router.get("/config", listDonationConfig);
  router.get("/", listDonations);
  router.post("/", createDonation);

  return router;
}

module.exports = { createDonationRouter };

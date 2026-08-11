const express = require("express");
const {
  listTestimonials,
  createTestimonial,
  updateTestimonial,
  deleteTestimonial,
} = require("../controllers/testimonialController");

function createTestimonialRouter() {
  const router = express.Router();
  router.get("/", listTestimonials);
  router.post("/", createTestimonial);
  router.put("/:id", updateTestimonial);
  router.delete("/:id", deleteTestimonial);
  return router;
}

module.exports = { createTestimonialRouter };

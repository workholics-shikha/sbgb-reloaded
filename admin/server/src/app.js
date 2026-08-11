const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const path = require("path");

const { createAuthRouter } = require("./routes/authRoutes");
const { createCategoryRouter } = require("./routes/categoryRoutes");
const { createEventRouter } = require("./routes/eventRoutes");
const { createBookingRouter } = require("./routes/bookingRoutes");
const { createVendorRouter } = require("./routes/vendorRoutes");
const { createZoneRouter } = require("./routes/zoneMasterRoutes");
const { createSliderRouter } = require("./routes/sliderRoutes");
const { createActivityRouter } = require("./routes/activityRoutes");
const { createInnerActivityRouter } = require("./routes/innerActivityRoutes");
const { createArticleRouter } = require("./routes/articleRoutes");
const { createMediaRouter } = require("./routes/mediaRoutes");
const { createGalleryRouter } = require("./routes/galleryRoutes");
const { createImportantLinkRouter } = require("./routes/importantLinkRoutes");
const { createVideoRouter } = require("./routes/videoRoutes");
const { createPatrikaRouter } = require("./routes/patrikaRoutes");
const { createStoryRouter } = require("./routes/storyRoutes");
const { createStateRouter } = require("./routes/stateRoutes");
const { createCityRouter } = require("./routes/cityRoutes");
const { createTestimonialRouter } = require("./routes/testimonialRoutes");
const { createCoachingOrganizationRouter } = require("./routes/coachingOrganizationRoutes");
const { createContactRouter } = require("./routes/contactRoutes");
const { createCsrFormRouter } = require("./routes/csrFormRoutes");
const { createSbgbpRegistrationRouter } = require("./routes/sbgbpRegistrationRoutes");
const { createUtthanCoachingRegistrationRouter } = require("./routes/utthanCoachingRegistrationRoutes");
const { createSammanSamarohRegistrationRouter } = require("./routes/sammanSamarohRegistrationRoutes");

function createApp({ jwtSecret, jwtExpiresIn }) {
  const app = express();

  app.set("jwtSecret", jwtSecret);
  app.set("jwtExpiresIn", jwtExpiresIn);

  app.use(cors());
  app.use(express.json({ limit: "1mb" }));
  app.use(morgan("dev"));
  app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));

  app.get("/health", (req, res) => res.json({ ok: true }));
  app.use("/api/auth", createAuthRouter({ jwtSecret }));
  app.use("/api/categories", createCategoryRouter({ jwtSecret }));
  app.use("/api/events", createEventRouter());
  app.use("/api/bookings", createBookingRouter({ jwtSecret }));
  app.use("/api/vendors", createVendorRouter({ jwtSecret }));
  app.use("/api/zones", createZoneRouter({ jwtSecret }));
  app.use("/api/sliders", createSliderRouter());
  app.use("/api/activities", createActivityRouter());
  app.use("/api/inner-activities", createInnerActivityRouter());
  app.use("/api/articles", createArticleRouter());
  app.use("/api/medias", createMediaRouter());
  app.use("/api/galleries", createGalleryRouter());
  app.use("/api/important-links", createImportantLinkRouter());
  app.use("/api/videos", createVideoRouter());
  app.use("/api/patrika", createPatrikaRouter());
  app.use("/api/stories", createStoryRouter());
  app.use("/api/states", createStateRouter());
  app.use("/api/cities", createCityRouter());
  app.use("/api/testimonials", createTestimonialRouter());
  app.use("/api/coaching-organizations", createCoachingOrganizationRouter());
  app.use("/api/contacts", createContactRouter());
  app.use("/api/csr-forms", createCsrFormRouter());
  app.use("/api/sbgbp-registrations", createSbgbpRegistrationRouter());
  app.use("/api/utthan-coaching-registrations", createUtthanCoachingRegistrationRouter());
  app.use("/api/samman-samaroh-registrations", createSammanSamarohRegistrationRouter());

  

  // 404
  app.use((req, res) => res.status(404).json({ message: "Not found" }));

  // Error handler
  // eslint-disable-next-line no-unused-vars
  app.use((err, req, res, next) => {
    // Avoid leaking stack traces in production by default
    const status = err.statusCode || 500;
    const message = status >= 500 ? "Internal server error" : err.message;
    return res.status(status).json({ message });
  });

  return app;
}

module.exports = { createApp };

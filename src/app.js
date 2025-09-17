const express = require("express");
const { sequelize } = require("./models");
const userRoutes = require("./routes/user.routes");
const documentRoutes = require("./routes/document.routes");
const errorHandler = require("./middlewares/errorHandler");
const logger = require("./middlewares/logger");

const app = express();

app.use(express.json());

// Custom middleware
app.use(logger);

// Routes
app.use("/users", userRoutes);
app.use("/documents", documentRoutes);

// Error handling
app.use(errorHandler);

// Sync database
sequelize
  .sync()
  .then(() => {
    console.log("✅ Database synced successfully");
  })
  .catch((err) => {
    console.error("❌ Error syncing database:", err);
  });

module.exports = app;

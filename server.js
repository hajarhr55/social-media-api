const express = require("express");
const cors = require("cors");
require("dotenv").config();

const authRoutes = require("./routes/authRoutes");
const usersRoutes = require("./routes/usersRoutes");
const postRoutes = require("./routes/postRoutes");
const commentRoutes = require("./routes/commentRoutes");
const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Serve static image files
app.use("/uploads", express.static("uploads"));

// Routes
app.use("/api/v1", authRoutes);
app.use("/api/v1", postRoutes);
app.use("/api/v1", commentRoutes);
app.use("/api/v1", usersRoutes);

// Health Check
app.get("/", (req, res) => {
  res.json({
    message: "API is running",
  });
});

// Error Handler
app.use((err, req, res, next) => {
  console.error(err);

  res.status(500).json({
    message: "Internal Server Error",
  });
});

// Start server
app.listen(process.env.PORT || 3000, () => {
  console.log("Server running...");
});

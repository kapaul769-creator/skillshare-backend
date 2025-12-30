const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

const app = express();

// Middleware to read JSON body
app.use(express.json());

// Routes
const authRoutes = require("./routes/auth");
const skillRoutes = require("./routes/skill");

// Test route (health check)
app.get("/", (req, res) => {
  res.json({ status: "OK", message: "Server is healthy 🚀" });
});

// API routes
app.use("/api/auth", authRoutes);
app.use("/api/skills", skillRoutes);

// MongoDB connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB Connected");
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err.message);
  });

// Server start
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

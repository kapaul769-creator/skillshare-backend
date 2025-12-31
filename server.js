const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();

const app = express();

/* =====================
   Middleware
===================== */
app.use(express.json());

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://skillshare-frontend.vercel.app", // update if Vercel URL changes
    ],
    credentials: true,
  })
);

/* =====================
   Routes
===================== */
const authRoutes = require("./routes/auth");
const skillRoutes = require("./routes/skill");

/* Root test */
app.get("/", (req, res) => {
  res.json({ status: "OK", message: "Server is healthy 🚀" });
});

/* Health check (NEW) */
app.get("/health", (req, res) => {
  res.json({ status: "OK", message: "Health check passed 🚀" });
});

/* API routes */
app.use("/api/auth", authRoutes);
app.use("/api/skills", skillRoutes);

/* =====================
   Database
===================== */
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) =>
    console.error("MongoDB connection error:", err.message)
  );

/* =====================
   Server
===================== */
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

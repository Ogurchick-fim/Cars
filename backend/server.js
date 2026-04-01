const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const app = express();

const authRoutes = require("./routes/auth");
const authMiddleware = require("./middleware/authMiddleware");

app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);
const favoriteRoutes = require("./routes/favorites");
app.use("/api/favorites", favoriteRoutes);

app.use(express.json());

app.use("/api/auth", authRoutes);

app.get("/", (req, res) => {
  res.send("API is running");
});

app.get("/api/dashboard", authMiddleware, (req, res) => {
  res.json({
    message: "Welcome to protected dashboard",
    user: req.user,
  });
});

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected");
    app.listen(process.env.PORT || 2525, () => {
      console.log(`Server running on port ${process.env.PORT || 2525}`);
    });
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });

  
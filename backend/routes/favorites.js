const express = require("express");
const User = require("../models/User");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/", authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).select("favorites");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({
      favorites: user.favorites,
    });
  } catch (error) {
    console.error("Get favorites error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

router.post("/:carId", authMiddleware, async (req, res) => {
  try {
    const { carId } = req.params;

    const user = await User.findById(req.user.userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (!user.favorites.includes(carId)) {
      user.favorites.push(carId);
      await user.save();
    }

    res.status(200).json({
      message: "Car added to favorites",
      favorites: user.favorites,
    });
  } catch (error) {
    console.error("Add favorite error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

router.delete("/:carId", authMiddleware, async (req, res) => {
  try {
    const { carId } = req.params;

    const user = await User.findById(req.user.userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.favorites = user.favorites.filter((id) => id !== carId);
    await user.save();

    res.status(200).json({
      message: "Car removed from favorites",
      favorites: user.favorites,
    });
  } catch (error) {
    console.error("Remove favorite error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
const express = require("express");
const User = require("../models/User");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/", authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).select("savedComparisons");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({
      savedComparisons: user.savedComparisons || [],
    });
  } catch (error) {
    console.error("Get comparisons error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

router.post("/", authMiddleware, async (req, res) => {
  try {
    const { carIds } = req.body;

    if (!Array.isArray(carIds) || carIds.length < 2) {
      return res.status(400).json({
        message: "carIds must contain at least 2 cars",
      });
    }

    const normalized = carIds.map(String).sort();
    const user = await User.findById(req.user.userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (!user.savedComparisons) {
      user.savedComparisons = [];
    }

    const exists = user.savedComparisons.some((group) => {
      const sortedGroup = group.map(String).sort();
      return JSON.stringify(sortedGroup) === JSON.stringify(normalized);
    });

    if (!exists) {
      user.savedComparisons.push(normalized);
      await user.save();
    }

    res.status(200).json({
      message: "Comparison saved",
      savedComparisons: user.savedComparisons,
    });
  } catch (error) {
    console.error("Save comparison error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

router.delete("/:index", authMiddleware, async (req, res) => {
  try {
    const index = Number(req.params.index);
    const user = await User.findById(req.user.userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (!user.savedComparisons) {
      user.savedComparisons = [];
    }

    if (index < 0 || index >= user.savedComparisons.length) {
      return res.status(404).json({ message: "Comparison not found" });
    }

    user.savedComparisons.splice(index, 1);
    await user.save();

    res.status(200).json({
      message: "Comparison removed",
      savedComparisons: user.savedComparisons,
    });
  } catch (error) {
    console.error("Delete comparison error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
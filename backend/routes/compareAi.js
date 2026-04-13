const express = require("express");
const OpenAI = require("openai");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const MODEL = process.env.OPENAI_MODEL || "gpt-5-mini";

router.post("/", authMiddleware, async (req, res) => {
  try {
    if (!process.env.OPENAI_API_KEY) {
      return res.status(500).json({
        message: "OPENAI_API_KEY is missing",
      });
    }

    const { cars } = req.body;

    if (!Array.isArray(cars) || cars.length < 2) {
      return res.status(400).json({
        message: "At least 2 cars are required",
      });
    }

    const compactCars = cars.map((car) => ({
      brand: car.brand,
      model: car.model,
      price: car.price,
      fuelType: car.fuelType,
      bodyType: car.bodyType,
      reliabilityScore: car.reliabilityScore,
      fuelEconomy: car.fuelEconomy,
      horsepower: car.horsepower,
    }));

    const prompt = `
Compare these cars and choose the best overall option.

Cars:
${JSON.stringify(compactCars, null, 2)}

Return ONLY valid JSON:
{
  "summary": "string",
  "bestCarName": "string",
  "why": ["string", "string", "string"]
}
`;

    const response = await client.responses.create({
      model: MODEL,
      input: prompt,
    });

    const text = response.output_text;

    let parsed;
    try {
      parsed = JSON.parse(text);
    } catch {
      console.error("AI returned invalid JSON:", text);
      return res.status(500).json({
        message: "AI returned invalid format",
      });
    }

    res.json(parsed);
  } catch (error) {
    console.error("Compare AI error message:", error.message);
    console.error("Compare AI error status:", error.status);
    console.error("Compare AI full error:", error);

    res.status(500).json({
      message: error?.message || "AI comparison failed",
    });
  }
});

module.exports = router;
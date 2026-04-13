import { useMemo, useState } from "react";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import CarCard from "../components/cars/CarCard";
import { cars } from "../data/cars.ts";
import {
  parseFuelEconomy,
  calculateTotalCost,
  calculateScore,
  getDepreciationRate,
} from "../utils/recommendation";

const RecommendPage = () => {
  const [form, setForm] = useState({
    budget: "",
    bodyType: "",
    fuelType: "",
    years: 3,
    minReliability: "",
    sortMode: "score",
  });

  const recommendedCars = useMemo(() => {
    let filtered = cars.filter((car) => {
      if (form.budget && car.price > Number(form.budget)) return false;
      if (form.bodyType && car.bodyType !== form.bodyType) return false;
      if (form.fuelType && car.fuelType !== form.fuelType) return false;
      if (
        form.minReliability &&
        car.reliabilityScore < Number(form.minReliability)
      ) {
        return false;
      }

      return true;
    });

    const ranked = filtered.map((car) => {
      const fuelEfficiency = parseFuelEconomy(car.fuelEconomy);
      const depreciationRate = getDepreciationRate(car.fuelType, car.bodyType);
      const totalCost = calculateTotalCost(
        car.price,
        depreciationRate,
        Number(form.years)
      );

      let score = calculateScore({
        price: car.price,
        fuelEfficiency,
        reliability: car.reliabilityScore / 10,
        budget: Number(form.budget) || car.price,
      });

      const reasons = [];
      const badges = [];

      if (form.budget && car.price <= Number(form.budget)) {
        reasons.push("Fits your budget");
        badges.push({
          label: "Budget Friendly",
          color: "bg-green-100 text-green-700",
        });
        score += 1;
      }

      if (car.reliabilityScore >= 88) {
        reasons.push("High reliability score");
        badges.push({
          label: "Reliable",
          color: "bg-blue-100 text-blue-700",
        });
        score += 1;
      }

      if (fuelEfficiency >= 50 || car.fuelType === "Electric") {
        reasons.push("Low running costs");
        badges.push({
          label: "Efficient",
          color: "bg-emerald-100 text-emerald-700",
        });
        score += 1;
      }

      if (car.horsepower >= 300) {
        reasons.push("Strong performance");
        badges.push({
          label: "Powerful",
          color: "bg-red-100 text-red-700",
        });
        score += 0.5;
      }

      if (form.bodyType && car.bodyType === form.bodyType) {
        reasons.push(`Matches your preferred ${car.bodyType.toLowerCase()} style`);
        badges.push({
          label: car.bodyType,
          color: "bg-purple-100 text-purple-700",
        });
        score += 0.5;
      }

      if (form.fuelType && car.fuelType === form.fuelType) {
        reasons.push(
          `Matches your preferred ${car.fuelType.toLowerCase()} powertrain`
        );
        score += 0.5;
      }

      return {
        ...car,
        recommendationScore: Number(score.toFixed(2)),
        totalOwnershipCost: Math.round(totalCost),
        whyThisCar: reasons.length
          ? reasons.slice(0, 3)
          : ["Strong overall balance of cost, efficiency, and reliability"],
        badges: badges.slice(0, 3),
      };
    });

    if (form.sortMode === "cost") {
      return ranked.sort((a, b) => a.totalOwnershipCost - b.totalOwnershipCost);
    }

    return ranked.sort(
      (a, b) => b.recommendationScore - a.recommendationScore
    );
  }, [form]);

  const topCars = recommendedCars.slice(0, 6);

  const handleChange = (field, value) => {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="container-auto py-10">
        <div className="mb-8">
          <h1 className="font-display text-3xl font-bold text-foreground mb-2">
            Car Recommendations
          </h1>
          <p className="text-muted-foreground">
            Tell us your preferences and we’ll rank the best options
          </p>
        </div>

        <div className="grid lg:grid-cols-[320px_1fr] gap-8">
          <div className="card-automotive p-6 space-y-4 h-fit">
            <h2 className="font-display text-lg font-bold text-foreground">
              Your Preferences
            </h2>

            <input
              type="number"
              placeholder="Budget"
              value={form.budget}
              onChange={(e) => handleChange("budget", e.target.value)}
              className="w-full h-11 rounded-lg border border-border bg-background px-4 text-sm"
            />

            <select
              value={form.bodyType}
              onChange={(e) => handleChange("bodyType", e.target.value)}
              className="w-full h-11 rounded-lg border border-border bg-background px-4 text-sm"
            >
              <option value="">Any body type</option>
              <option value="SUV">SUV</option>
              <option value="Sedan">Sedan</option>
              <option value="Coupe">Coupe</option>
              <option value="Hatchback">Hatchback</option>
              <option value="Crossover">Crossover</option>
            </select>

            <select
              value={form.fuelType}
              onChange={(e) => handleChange("fuelType", e.target.value)}
              className="w-full h-11 rounded-lg border border-border bg-background px-4 text-sm"
            >
              <option value="">Any fuel type</option>
              <option value="Electric">Electric</option>
              <option value="Hybrid">Hybrid</option>
              <option value="Petrol">Petrol</option>
              <option value="Diesel">Diesel</option>
            </select>

            <input
              type="number"
              placeholder="Minimum reliability score"
              value={form.minReliability}
              onChange={(e) => handleChange("minReliability", e.target.value)}
              className="w-full h-11 rounded-lg border border-border bg-background px-4 text-sm"
            />

            <select
              value={form.years}
              onChange={(e) => handleChange("years", e.target.value)}
              className="w-full h-11 rounded-lg border border-border bg-background px-4 text-sm"
            >
              <option value={1}>1 year ownership</option>
              <option value={3}>3 years ownership</option>
              <option value={5}>5 years ownership</option>
            </select>

            <select
              value={form.sortMode}
              onChange={(e) => handleChange("sortMode", e.target.value)}
              className="w-full h-11 rounded-lg border border-border bg-background px-4 text-sm"
            >
              <option value="score">Best overall score</option>
              <option value="cost">Lowest ownership cost</option>
            </select>
          </div>

          <div>
            {topCars.length === 0 ? (
              <div className="card-automotive p-10 text-center">
                <p className="text-muted-foreground">
                  No cars match your preferences
                </p>
              </div>
            ) : (
              <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {topCars.map((car, index) => (
                  <div key={car.id} className="space-y-3">
                    <div className="relative">
                      {index === 0 && (
                        <span className="absolute top-3 left-3 z-10 px-3 py-1 rounded-full bg-yellow-100 text-yellow-700 text-xs font-semibold shadow-sm">
                          Top Pick
                        </span>
                      )}
                      <CarCard car={car} />
                    </div>

                    <div className="card-automotive p-4 text-sm space-y-3">
                      <div className="flex flex-wrap gap-2">
                        {car.badges?.map((badge) => (
                          <span
                            key={badge.label}
                            className={`px-2.5 py-1 rounded-full text-xs font-medium ${badge.color}`}
                          >
                            {badge.label}
                          </span>
                        ))}
                      </div>

                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">
                            Recommendation score
                          </span>
                          <span className="font-semibold text-foreground">
                            {car.recommendationScore}
                          </span>
                        </div>

                        <div className="flex justify-between">
                          <span className="text-muted-foreground">
                            Estimated ownership cost
                          </span>
                          <span className="font-semibold text-foreground">
                            ${car.totalOwnershipCost.toLocaleString()}
                          </span>
                        </div>
                      </div>

                      <div className="pt-2 border-t border-border">
                        <p className="text-sm font-semibold text-foreground mb-2">
                          Why this car?
                        </p>
                        <ul className="space-y-1">
                          {car.whyThisCar?.map((reason) => (
                            <li
                              key={reason}
                              className="text-sm text-muted-foreground"
                            >
                              • {reason}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default RecommendPage;
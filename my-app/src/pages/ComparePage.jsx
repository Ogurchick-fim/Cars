import React, { useEffect, useState } from "react";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import { cars } from "../data/cars.ts";
import ComparisonTable from "../components/compare/CompareTable.jsx";
import { Plus, X, Save, Sparkles } from "lucide-react";
import { toast } from "sonner";


const ComparePage = () => {
  
  const [selected, setSelected] = useState([]);
  const token = localStorage.getItem("token");
  
const [aiResult, setAiResult] = useState(null);
const [aiLoading, setAiLoading] = useState(false);

  const handleAskAi = async () => {
    if (!token) {
      toast.error("Please log in to use AI compare");
      return;
    }

    if (selectedCars.length < 2) {
      toast.error("Select at least 2 cars for AI comparison");
      return;
    }

    try {
      setAiLoading(true);
      setAiResult(null);

      const res = await fetch("http://localhost:2525/api/compare-ai", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ cars: selectedCars }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to get AI comparison");
      }

      setAiResult(data);
      toast.success("AI comparison ready");
    } catch (error) {
      console.error(error);
      toast.error(error.message || "Something went wrong");
    } finally {
      setAiLoading(false);
    }
  };
  
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("compareCars")) || [];
    setSelected(saved);
  }, []);

  useEffect(() => {
    localStorage.setItem("compareCars", JSON.stringify(selected));
  }, [selected]);

  const selectedCars = selected
    .map((id) => cars.find((c) => String(c.id) === String(id)))
    .filter(Boolean);

  const available = cars.filter((c) => !selected.includes(String(c.id)));

  const handleAddCar = (id) => {
    if (!id) return;

    if (selected.includes(id)) {
      toast.error("Car already added");
      return;
    }

    if (selected.length >= 4) {
      toast.error("You can compare up to 4 cars");
      return;
    }

    setSelected((prev) => [...prev, id]);
  };

  const handleRemoveCar = (id) => {
    setSelected((prev) => prev.filter((x) => x !== id));
  };

  const handleSaveComparison = async () => {
    console.log("SAVING IDS:", selected);
    if (!token) {
      toast.error("Please log in to save comparisons");
      return;
    }

    if (selected.length < 2) {
      toast.error("Select at least 2 cars");
      return;
    }

    try {
      const res = await fetch("http://localhost:2525/api/comparisons", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ carIds: selected }),
      });

      const data = await res.json();
      console.log("COMPARE STATUS:", res.status);
console.log("COMPARE RESPONSE:", data);

      if (!res.ok) {
        throw new Error(data.message || "Failed to save comparison");
      }

      toast.success("Comparison saved");
    } catch (error) {
      toast.error(error.message || "Something went wrong");
    }
  };

  const handleClearAll = () => {
    setSelected([]);
    localStorage.removeItem("compareCars");
  };

  

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="container-auto py-10">
        <h1 className="font-display text-3xl font-bold text-foreground mb-2">
          Compare Cars
        </h1>
        <p className="text-muted-foreground mb-8">
          Select up to 4 cars for side-by-side comparison
        </p>

        <div className="flex gap-3 mb-8 flex-wrap items-center">
          {selected.map((id) => {
            const car = cars.find((c) => String(c.id) === String(id));
            if (!car) return null;

            return (
              <span
                key={id}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-100 text-blue-600 text-sm font-medium"
              >
                {car.brand} {car.model}
                <button
                  onClick={() => handleRemoveCar(id)}
                  className="hover:text-destructive transition-colors"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </span>
            );
          })}

          {selected.length < 4 && (
            <select
              className="px-4 py-2 rounded-full border border-border bg-background text-sm text-foreground outline-none"
              value=""
              onChange={(e) => handleAddCar(e.target.value)}
            >
              <option value="">+ Add Car</option>
              {available.map((c) => (
                <option key={c.id} value={String(c.id)}>
                  {c.brand} {c.model}
                </option>
              ))}
            </select>
          )}

          {selected.length > 0 && (
            <button
              onClick={handleClearAll}
              className="px-4 py-2 rounded-full border border-border text-sm text-foreground hover:bg-secondary transition-colors"
            >
              Clear
            </button>
          )}

          {selected.length >= 2 && (
            <button
              onClick={handleSaveComparison}
              className="px-4 py-2 rounded-full btn-accent text-sm inline-flex items-center gap-2"
            >
              <Save className="w-4 h-4" />
              Save Comparison
            </button>
          )}

          {selected.length >= 2 && (
            <button
              onClick={handleAskAi}
              disabled={aiLoading}
              className="px-4 py-2 rounded-full border border-border text-sm text-foreground hover:bg-secondary transition-colors inline-flex items-center gap-2 disabled:opacity-50"
            >
              <Sparkles className="w-4 h-4" />
              {aiLoading ? "Thinking..." : "Ask AI"}
            </button>
          )}
        </div>

        {aiResult && (
          <div className="card-automotive p-6 mb-6">
            <h2 className="font-display text-xl font-bold text-foreground mb-3">
              AI Comparison Summary
            </h2>

            <p className="text-sm text-muted-foreground mb-4">
              {aiResult.summary}
            </p>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <p className="text-sm font-semibold text-foreground mb-2">
                  Best choice
                </p>
                <p className="text-sm text-muted-foreground">
                  {aiResult.bestCarName || "No best car selected"}
                </p>
              </div>

              <div>
                <p className="text-sm font-semibold text-foreground mb-2">
                  Why?
                </p>
                <ul className="space-y-1">
                  {(aiResult.why || []).map((reason) => (
                    <li key={reason} className="text-sm text-muted-foreground">
                      • {reason}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}

        {selectedCars.length >= 2 ? (
          <div className="card-automotive overflow-hidden">
            <ComparisonTable cars={selectedCars} />
          </div>
        ) : (
          <div className="card-automotive p-16 text-center">
            <Plus className="w-10 h-10 mx-auto text-muted-foreground/40 mb-4" />
            <p className="text-muted-foreground">
              Select at least 2 cars to compare
            </p>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default ComparePage;
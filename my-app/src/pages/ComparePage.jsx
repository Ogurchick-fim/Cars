// ComparePage.jsx
import React from 'react';
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import { cars } from "../data/cars.ts";
import { useState } from "react";
import ComparisonTable from "../components/compare/CompareTable.jsx";
import { Plus, X } from "lucide-react";

const ComparePage = () => {
  const [selected, setSelected] = useState([]);

  const selectedCars = selected.map((id) => cars.find((c) => c.id === id)).filter(Boolean);
  const available = cars.filter((c) => !selected.includes(c.id));

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container-auto py-10">
        <h1 className="font-display text-3xl font-bold text-foreground mb-2">Compare Cars</h1>
        <p className="text-muted-foreground mb-8">Select up to 4 cars for side-by-side comparison</p>

        <div className="flex gap-3 mb-8 flex-wrap">
          {selected.map((id) => {
            const car = cars.find((c) => c.id === id);
            if (!car) return null;
            return (
              <span key={id} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-100 text-blue-600 text-sm font-medium"
>
                {car.brand} {car.model}
                <button onClick={() => setSelected((s) => s.filter((x) => x !== id))} className="hover:text-destructive transition-colors">
                  <X className="w-3.5 h-3.5" />
                </button>
              </span>
            );
          })}
          {selected.length < 4 && (
            <select
              className="px-4 py-2 rounded-full border border-border bg-background text-sm text-foreground outline-none"
              value=""
              onChange={(e) => { if (e.target.value) setSelected((s) => [...s, e.target.value]); }}
            >
              <option value="">+ Add Car</option>
              {available.map((c) => (
                <option key={c.id} value={c.id}>{c.brand} {c.model}</option>
              ))}
            </select>
          )}
        </div>

        {selectedCars.length >= 2 ? (
          <div className="card-automotive overflow-hidden">
            <ComparisonTable cars={selectedCars} />
          </div>
        ) : (
          <div className="card-automotive p-16 text-center">
            <Plus className="w-10 h-10 mx-auto text-muted-foreground/40 mb-4" />
            <p className="text-muted-foreground">Select at least 2 cars to compare</p>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default ComparePage;



import { useState } from "react";
import { brands, bodyTypes, fuelTypes, transmissions } from "../../data/cars.ts";
import { SlidersHorizontal } from "lucide-react";

const FilterPanel = ({ onApply }) => {

  const [brand, setBrand] = useState("");
  const [bodyType, setBodyType] = useState("");
  const [fuelType, setFuelType] = useState("");
  const [transmission, setTransmission] = useState("");

  const applyFilters = () => {
    onApply({
      brand,
      bodyType,
      fuelType,
      transmission
    });
  };

  const resetFilters = () => {
    setBrand("");
    setBodyType("");
    setFuelType("");
    setTransmission("");

    onApply({});
  };

  return (
    <aside className="card-automotive p-6 space-y-6 sticky top-24">

      <div className="flex items-center gap-2 mb-2">
        <SlidersHorizontal className="w-4 h-4 text-accent" />
        <h3 className="font-display font-semibold text-foreground">Filters</h3>
      </div>

      {/* Brand */}
      <div>
        <label className="text-sm font-medium text-foreground block mb-2">
          Brand
        </label>

        <select
          value={brand}
          onChange={(e) => setBrand(e.target.value)}
          className="w-full rounded-lg border border-input bg-background px-3 py-2.5 text-sm"
        >
          <option value="">All Brands</option>
          {brands.map((b) => (
            <option key={b} value={b}>{b}</option>
          ))}
        </select>
      </div>

      {/* Body Type */}
      <div>
        <label className="text-sm font-medium text-foreground block mb-2">
          Body Type
        </label>

        <select
          value={bodyType}
          onChange={(e) => setBodyType(e.target.value)}
          className="w-full rounded-lg border border-input bg-background px-3 py-2.5 text-sm"
        >
          <option value="">All Body Types</option>
          {bodyTypes.map((b) => (
            <option key={b} value={b}>{b}</option>
          ))}
        </select>
      </div>

      {/* Fuel */}
      <div>
        <label className="text-sm font-medium text-foreground block mb-2">
          Fuel Type
        </label>

        <select
          value={fuelType}
          onChange={(e) => setFuelType(e.target.value)}
          className="w-full rounded-lg border border-input bg-background px-3 py-2.5 text-sm"
        >
          <option value="">All Fuel Types</option>
          {fuelTypes.map((f) => (
            <option key={f} value={f}>{f}</option>
          ))}
        </select>
      </div>

      {/* Transmission */}
      <div>
        <label className="text-sm font-medium text-foreground block mb-2">
          Transmission
        </label>

        <select
          value={transmission}
          onChange={(e) => setTransmission(e.target.value)}
          className="w-full rounded-lg border border-input bg-background px-3 py-2.5 text-sm"
        >
          <option value="">All Transmissions</option>
          {transmissions.map((t) => (
            <option key={t} value={t}>{t}</option>
          ))}
        </select>
      </div>

      <button
        onClick={applyFilters}
        className="w-full btn-accent text-sm py-2.5"
      >
        Apply Filters
      </button>

      <button
        onClick={resetFilters}
        className="w-full btn-outline-auto text-sm py-2.5"
      >
        Reset
      </button>

    </aside>
  );
};

export default FilterPanel;
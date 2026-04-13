import { brands, bodyTypes, fuelTypes, transmissions } from "../../data/cars.ts";

const FilterPanel = ({ filters, onApply }) => {
  const handleChange = (field, value) => {
    onApply({
      ...filters,
      [field]: value,
    });
  };

  const handleReset = () => {
    onApply({
      brand: "",
      bodyType: "",
      fuelType: "",
      transmission: "",
      minPrice: "",
      maxPrice: "",
      minYear: "",
      maxMileage: "",
    });
  };

  return (
    <div className="card-automotive p-5 h-fit space-y-4">
      <h3 className="font-display text-lg font-bold text-foreground">
        Filters
      </h3>

      <select
        value={filters.brand}
        onChange={(e) => handleChange("brand", e.target.value)}
        className="w-full h-11 rounded-lg border border-border bg-background px-4 text-sm"
      >
        <option value="">All brands</option>
        {brands.map((brand) => (
          <option key={brand} value={brand}>
            {brand}
          </option>
        ))}
      </select>

      <select
        value={filters.bodyType}
        onChange={(e) => handleChange("bodyType", e.target.value)}
        className="w-full h-11 rounded-lg border border-border bg-background px-4 text-sm"
      >
        <option value="">All body types</option>
        {bodyTypes.map((type) => (
          <option key={type} value={type}>
            {type}
          </option>
        ))}
      </select>

      <select
        value={filters.fuelType}
        onChange={(e) => handleChange("fuelType", e.target.value)}
        className="w-full h-11 rounded-lg border border-border bg-background px-4 text-sm"
      >
        <option value="">All fuel types</option>
        {fuelTypes.map((type) => (
          <option key={type} value={type}>
            {type}
          </option>
        ))}
      </select>

      <select
        value={filters.transmission}
        onChange={(e) => handleChange("transmission", e.target.value)}
        className="w-full h-11 rounded-lg border border-border bg-background px-4 text-sm"
      >
        <option value="">All transmissions</option>
        {transmissions.map((type) => (
          <option key={type} value={type}>
            {type}
          </option>
        ))}
      </select>

      <input
        type="number"
        placeholder="Min price"
        value={filters.minPrice}
        onChange={(e) => handleChange("minPrice", e.target.value)}
        className="w-full h-11 rounded-lg border border-border bg-background px-4 text-sm"
      />

      <input
        type="number"
        placeholder="Max price"
        value={filters.maxPrice}
        onChange={(e) => handleChange("maxPrice", e.target.value)}
        className="w-full h-11 rounded-lg border border-border bg-background px-4 text-sm"
      />

      <input
        type="number"
        placeholder="Min year"
        value={filters.minYear}
        onChange={(e) => handleChange("minYear", e.target.value)}
        className="w-full h-11 rounded-lg border border-border bg-background px-4 text-sm"
      />

      <input
        type="number"
        placeholder="Max mileage"
        value={filters.maxMileage}
        onChange={(e) => handleChange("maxMileage", e.target.value)}
        className="w-full h-11 rounded-lg border border-border bg-background px-4 text-sm"
      />

      <button onClick={handleReset} className="w-full btn-accent">
        Reset Filters
      </button>
    </div>
  );
};

export default FilterPanel;
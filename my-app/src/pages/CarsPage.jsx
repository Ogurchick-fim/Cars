import { useState } from "react";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import CarCard from "../components/cars/CarCard";
import FilterPanel from "../components/layout/FilterPanel";
import { cars } from "../data/cars.ts";
import CompareTable from "../components/compare/CompareTable.jsx";

const CarsPage = () => {
  const [filters, setFilters] = useState({});

  const filteredCars = cars.filter((car) => {
    if (filters.brand && car.brand !== filters.brand) return false;
    if (filters.bodyType && car.bodyType !== filters.bodyType) return false;
    if (filters.fuelType && car.fuelType !== filters.fuelType) return false;
    if (filters.transmission && car.transmission !== filters.transmission) return false;

    return true;
  });

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="container-auto py-10">
        <div className="mb-8">
          <h1 className="font-display text-3xl font-bold text-foreground mb-2">
            Browse Cars
          </h1>
          <p className="text-muted-foreground">
            {filteredCars.length} vehicles available
          </p>
        </div>

        <div className="grid lg:grid-cols-[280px_1fr] gap-8">
          <FilterPanel onApply={setFilters} />

          <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredCars.map((car) => (
              <CarCard key={car.id} car={car} />
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default CarsPage;
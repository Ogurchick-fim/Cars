import { useMemo, useState } from "react";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import CarCard from "../components/cars/CarCard";
import FilterPanel from "../components/layout/FilterPanel";
import { cars } from "../data/cars.ts";

const CARS_PER_PAGE = 9;

const CarsPage = () => {
  const [filters, setFilters] = useState({
    brand: "",
    bodyType: "",
    fuelType: "",
    transmission: "",
    minPrice: "",
    maxPrice: "",
    minYear: "",
    maxMileage: "",
  });

  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("default");
  const [currentPage, setCurrentPage] = useState(1);

  const filteredCars = useMemo(() => {
    return cars.filter((car) => {
      const matchesSearch =
        `${car.brand} ${car.model}`.toLowerCase().includes(search.toLowerCase()) ||
        car.bodyType.toLowerCase().includes(search.toLowerCase()) ||
        car.fuelType.toLowerCase().includes(search.toLowerCase());

      if (!matchesSearch) return false;
      if (filters.brand && car.brand !== filters.brand) return false;
      if (filters.bodyType && car.bodyType !== filters.bodyType) return false;
      if (filters.fuelType && car.fuelType !== filters.fuelType) return false;
      if (filters.transmission && car.transmission !== filters.transmission) return false;
      if (filters.minPrice && car.price < Number(filters.minPrice)) return false;
      if (filters.maxPrice && car.price > Number(filters.maxPrice)) return false;
      if (filters.minYear && car.year < Number(filters.minYear)) return false;
      if (filters.maxMileage && car.mileage > Number(filters.maxMileage)) return false;

      return true;
    });
  }, [filters, search]);

  const sortedCars = useMemo(() => {
    const result = [...filteredCars];

    switch (sortBy) {
      case "price-asc":
        return result.sort((a, b) => a.price - b.price);
      case "price-desc":
        return result.sort((a, b) => b.price - a.price);
      case "year-desc":
        return result.sort((a, b) => b.year - a.year);
      case "mileage-asc":
        return result.sort((a, b) => a.mileage - b.mileage);
      case "horsepower-desc":
        return result.sort((a, b) => b.horsepower - a.horsepower);
      default:
        return result;
    }
  }, [filteredCars, sortBy]);

  const totalPages = Math.ceil(sortedCars.length / CARS_PER_PAGE);

  const paginatedCars = useMemo(() => {
    const start = (currentPage - 1) * CARS_PER_PAGE;
    const end = start + CARS_PER_PAGE;
    return sortedCars.slice(start, end);
  }, [sortedCars, currentPage]);

  const handleFiltersChange = (newFilters) => {
    setFilters(newFilters);
    setCurrentPage(1);
  };

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
    setCurrentPage(1);
  };

  const handleSortChange = (e) => {
    setSortBy(e.target.value);
    setCurrentPage(1);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="container-auto py-10">
        <div className="mb-8">
          <h1 className="font-display text-3xl font-bold text-foreground mb-2">
            Browse Cars
          </h1>
          <p className="text-muted-foreground">
            {sortedCars.length} vehicles found
          </p>
        </div>

        <div className="mb-6 grid gap-4 md:grid-cols-[1fr_220px]">
          <input
            type="text"
            placeholder="Search by brand, model, body type..."
            value={search}
            onChange={handleSearchChange}
            className="h-11 rounded-lg border border-border bg-background px-4 text-sm text-foreground outline-none focus:ring-2 focus:ring-accent/40"
          />

          <select
            value={sortBy}
            onChange={handleSortChange}
            className="h-11 rounded-lg border border-border bg-background px-4 text-sm text-foreground outline-none focus:ring-2 focus:ring-accent/40"
          >
            <option value="default">Sort by</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="year-desc">Newest First</option>
            <option value="mileage-asc">Lowest Mileage</option>
            <option value="horsepower-desc">Most Powerful</option>
          </select>
        </div>

        <div className="grid lg:grid-cols-[280px_1fr] gap-8">
          <FilterPanel filters={filters} onApply={handleFiltersChange} />

          <div>
            {paginatedCars.length === 0 ? (
              <div className="card-automotive p-10 text-center">
                <p className="text-muted-foreground mb-4">
                  No cars match your filters
                </p>
                <button
                  onClick={() => {
                    setFilters({
                      brand: "",
                      bodyType: "",
                      fuelType: "",
                      transmission: "",
                      minPrice: "",
                      maxPrice: "",
                      minYear: "",
                      maxMileage: "",
                    });
                    setSearch("");
                    setSortBy("default");
                    setCurrentPage(1);
                  }}
                  className="btn-accent"
                >
                  Reset Filters
                </button>
              </div>
            ) : (
              <>
                <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-6">
                  {paginatedCars.map((car) => (
                    <CarCard key={car.id} car={car} />
                  ))}
                </div>

                {totalPages > 1 && (
                  <div className="flex justify-center gap-2 mt-8 flex-wrap">
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                      <button
                        key={page}
                        onClick={() => setCurrentPage(page)}
                        className={`px-4 py-2 rounded-lg text-sm ${
                          currentPage === page
                            ? "bg-accent text-accent-foreground"
                            : "bg-secondary text-foreground hover:bg-secondary/80"
                        }`}
                      >
                        {page}
                      </button>
                    ))}
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default CarsPage;
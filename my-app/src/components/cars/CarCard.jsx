import { Link } from "react-router-dom";
import { Heart, BarChart3, Fuel, Gauge } from "lucide-react";
import { Car } from "../../data/cars.ts";

import PropTypes from "prop-types";

const CarCard = ({ car }) => (
  <div className="card-automotive group overflow-hidden">
    <div className="relative aspect-[16/10] bg-secondary overflow-hidden">
      <img
        src={car.image}
        alt={`${car.brand} ${car.model}`}
        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
      />
      <div className="absolute top-3 right-3 flex gap-2">
        <button className="w-8 h-8 rounded-full bg-card/90 backdrop-blur flex items-center justify-center text-muted-foreground hover:text-destructive transition-colors">
          <Heart className="w-4 h-4" />
        </button>
        <button className="w-8 h-8 rounded-full bg-card/90 backdrop-blur flex items-center justify-center text-muted-foreground hover:text-accent transition-colors">
          <BarChart3 className="w-4 h-4" />
        </button>
      </div>
      <span className="absolute top-3 left-3 text-xs font-semibold px-2.5 py-1 rounded-full bg-accent text-accent-foreground">
        {car.year}
      </span>
    </div>
    <div className="p-5">
      <div className="flex items-start justify-between mb-2">
        <div>
          <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">{car.brand}</p>
          <h3 className="font-display font-bold text-lg text-foreground">{car.model}</h3>
        </div>
        <p className="font-display font-bold text-lg text-accent">${car.price.toLocaleString()}</p>
      </div>
      <div className="flex items-center gap-4 mt-3 mb-4">
        <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
          <Gauge className="w-3.5 h-3.5" />
          {car.mileage.toLocaleString()} mi
        </span>
        <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
          <Fuel className="w-3.5 h-3.5" />
          {car.fuelType}
        </span>
      </div>
      <div className="flex gap-2">
        <Link
          to={`/cars/${car.id}`}
          className="flex-1 btn-accent text-sm text-center py-2.5"
        >
          View Details
        </Link>
        <Link
          to="/compare"
          className="btn-outline-auto text-sm py-2.5 px-4"
        >
          Compare
        </Link>
      </div>
    </div>
  </div>
);

CarCard.propTypes = {
  car: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    brand: PropTypes.string.isRequired,
    model: PropTypes.string.isRequired,
    year: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    price: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
    mileage: PropTypes.number.isRequired,
    fuelType: PropTypes.string.isRequired,
  }).isRequired,
};

export default CarCard;

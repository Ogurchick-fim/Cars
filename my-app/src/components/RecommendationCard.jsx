import React from "react";
import { Link } from "react-router-dom";
import { CheckCircle2 } from "lucide-react";
import PropTypes from "prop-types";

const RecommendationCard = ({ car, matchPercentage, reasons }) => (
  <div className="card-automotive overflow-hidden flex flex-col md:flex-row">
    <div className="md:w-72 aspect-[16/10] md:aspect-auto bg-secondary flex-shrink-0">
      <img src={car.image} alt={car.model} className="w-full h-full object-cover" />
    </div>
    <div className="p-6 flex-1">
      <div className="flex items-start justify-between mb-3">
        <div>
          <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
            {car.brand}
          </p>
          <h3 className="font-display font-bold text-xl text-foreground">{car.model}</h3>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-12 h-12 rounded-full border-4 border-accent flex items-center justify-center">
            <span className="text-sm font-bold text-accent">{matchPercentage}%</span>
          </div>
        </div>
      </div>
      <p className="font-display font-bold text-accent text-lg mb-3">
        ${car.price.toLocaleString()}
      </p>
      <ul className="space-y-1.5 mb-4">
        {reasons.map((reason) => (
          <li
            key={reason}
            className="flex items-center gap-2 text-sm text-muted-foreground"
          >
            <CheckCircle2 className="w-4 h-4 text-success flex-shrink-0" />
            {reason}
          </li>
        ))}
      </ul>
      <Link to={`/cars/${car.id}`} className="btn-accent text-sm inline-block py-2.5">
        View Details
      </Link>
    </div>
  </div>
);

RecommendationCard.propTypes = {
  car: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    brand: PropTypes.string.isRequired,
    model: PropTypes.string.isRequired,
    image: PropTypes.string,
    price: PropTypes.number.isRequired,
  }).isRequired,
  matchPercentage: PropTypes.number.isRequired,
  reasons: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default RecommendationCard;
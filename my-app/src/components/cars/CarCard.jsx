import { Link, useNavigate } from "react-router-dom";
import { Heart } from "lucide-react";
import { toast } from "sonner";

const CarCard = ({ car }) => {
  const navigate = useNavigate();

  const handleAddToFavorites = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      toast.error("Please log in to save cars");
      navigate("/login");
      return;
    }

    try {
      const res = await fetch(`http://localhost:2525/api/favorites/${car.id}`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to save car");
      }

      toast.success("Car added to favorites");
    } catch (error) {
      toast.error(error.message || "Something went wrong");
    }
  };

  return (
    <div className="rounded-xl border border-border bg-card overflow-hidden shadow-sm">
      <img
        src={car.image}
        alt={`${car.brand} ${car.model}`}
        className="w-full h-48 object-cover"
      />

      <div className="p-4">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="text-lg font-semibold text-foreground">
              {car.brand} {car.model}
            </h3>
            <p className="text-sm text-muted-foreground">
              {car.year} • {car.bodyType} • {car.fuelType}
            </p>
          </div>

          <button
            onClick={handleAddToFavorites}
            className="p-2 rounded-lg hover:bg-secondary transition-colors"
          >
            <Heart className="w-5 h-5" />
          </button>
        </div>

        <p className="mt-3 text-xl font-bold text-foreground">
          ${car.price.toLocaleString()}
        </p>

        <p className="mt-1 text-sm text-muted-foreground">
          {car.dealer} — {car.dealerLocation}
        </p>

        <Link
          to={`/cars/${car.id}`}
          className="mt-4 inline-block px-4 py-2 rounded-lg btn-accent"
        >
          View Details
        </Link>
      </div>
    </div>
  );
};

export default CarCard;
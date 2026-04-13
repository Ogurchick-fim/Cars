import { Link, useNavigate } from "react-router-dom";
import { Heart, BarChart3, Clock, Sparkles, Trash2 } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import { cars } from "../data/cars.ts";
import { toast } from "sonner";



const Dashboard = () => {
  const navigate = useNavigate();
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [savedComparisons, setSavedComparisons] = useState([]);
  const savedUser = localStorage.getItem("user");
  let user = null;

  try {
    user = savedUser && savedUser !== "undefined" ? JSON.parse(savedUser) : null;
  } catch (error) {
    console.error("Invalid user data in localStorage:", error);
    localStorage.removeItem("user");
    user = null;
  }
  const token = localStorage.getItem("token");

  useEffect(() => {
  const token = localStorage.getItem("token");

  if (!token) {
    navigate("/login");
    return;
  }

  const fetchFavorites = async () => {
    try {
      const res = await fetch("http://localhost:2525/api/favorites", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to load favorites");
      }

      setFavorites(data.favorites || []);
    } catch (error) {
      console.error(error);
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      navigate("/login");
    } finally {
      setLoading(false);
    }
    
  };

  const fetchComparisons = async () => {
    try {
      const res = await fetch("http://localhost:2525/api/comparisons", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to load comparisons");
      }

      setSavedComparisons(data.savedComparisons || []);
    } catch (error) {
      console.error(error);
    }
  };

  fetchFavorites();
  fetchComparisons();
}, [navigate]);

const removeComparison = async (index) => {
  const token = localStorage.getItem("token");

  try {
    const res = await fetch(`http://localhost:2525/api/comparisons/${index}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message || "Failed to remove comparison");
    }

    setSavedComparisons(data.savedComparisons || []);
    toast.success("Comparison removed");
  } catch (error) {
    toast.error(error.message || "Something went wrong");
  }
};

  const savedCars = useMemo(() => {
    return cars.filter((car) => favorites.includes(car.id));
  }, [favorites]);

  const comparisonGroups = (savedComparisons || []).map((group, index) => ({
  id: String(index),
  cars: cars.filter((car) =>
    Array.isArray(group) && group.includes(String(car.id))
  ),
}));
  const initials =
    user?.firstName && user?.lastName
      ? `${user.firstName[0]}${user.lastName[0]}`.toUpperCase()
      : (user?.email?.[0] ?? "U").toUpperCase();

  const displayName = user?.firstName
    ? `${user.firstName} ${user?.lastName ?? ""}`.trim()
    : "User";

  const removeFavorite = async (carId) => {
  try {
    const res = await fetch(`http://localhost:2525/api/favorites/${carId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message || "Failed to remove favorite");
    }

    setFavorites(data.favorites || []);
    toast.success("Car removed from favorites");
  } catch (error) {
    console.error(error);
    toast.error(error.message || "Something went wrong");
  }
};
  console.log("cars:", cars);
    console.log("favorites:", favorites);
    console.log("savedCars:", savedCars);
  return (
  <div className="min-h-screen bg-background">
    <Navbar />

    <div className="container-auto py-10">
      {/* PROFILE */}
      <div className="card-automotive p-8 mb-8 flex flex-col sm:flex-row items-start sm:items-center gap-6">
        <div className="w-16 h-16 rounded-2xl bg-accent flex items-center justify-center text-accent-foreground font-display text-xl font-bold">
          {initials}
        </div>
        <div>
          <h1 className="font-display text-2xl font-bold text-foreground">
            {displayName}
          </h1>
          <p className="text-sm text-muted-foreground">{user?.email}</p>
        </div>
      </div>

      {/* SAVED COMPARISONS */}
      <div className="mb-10">
        <h2 className="font-display text-xl font-bold text-foreground mb-4 flex items-center gap-2">
          <BarChart3 className="w-5 h-5 text-accent" /> Saved Comparisons
        </h2>

        {comparisonGroups.length === 0 ? (
          <div className="card-automotive p-8 text-center">
            <p className="text-muted-foreground mb-4">
              No saved comparisons yet
            </p>
            <Link to="/compare" className="btn-accent text-sm inline-block">
              Compare Cars
            </Link>
          </div>
        ) : (
          <div className="space-y-3">
            {comparisonGroups.map((comp, index) => (
              <div
                key={comp.id}
                className="card-automotive p-4 flex items-center justify-between"
              >
                <div className="flex items-center gap-3">
                  <div className="flex -space-x-3">
                    {(comp.cars || []).map((c) => (
                      <img
                        key={c.id}
                        src={c.image}
                        alt={c.model}
                        className="w-10 h-10 rounded-full border-2 border-card object-cover bg-secondary"
                      />
                    ))}
                  </div>

                  <div>
                    <p className="text-sm font-medium text-foreground">
                      {(comp.cars || [])
                        .map((c) => `${c.brand} ${c.model}`)
                        .join(" vs ")}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Link
                    to="/compare"
                    onClick={() =>
                      localStorage.setItem(
                        "compareCars",
                        JSON.stringify(
                          (comp.cars || []).map((c) => String(c.id))
                        )
                      )
                    }
                    className="text-sm font-medium text-accent hover:underline"
                  >
                    View
                  </Link>

                  <button
                    onClick={() => removeComparison(index)}
                    className="text-sm font-medium text-destructive hover:underline"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* SAVED CARS */}
      <div className="mb-10">
        <h2 className="font-display text-xl font-bold text-foreground mb-4 flex items-center gap-2">
          <Heart className="w-5 h-5 text-destructive" /> Saved Cars
        </h2>

        {loading ? (
          <div className="card-automotive p-8 text-center text-muted-foreground">
            Loading saved cars...
          </div>
        ) : savedCars.length === 0 ? (
          <div className="card-automotive p-8 text-center">
            <p className="text-muted-foreground mb-4">
              You have no saved cars yet
            </p>
            <Link to="/cars" className="btn-accent text-sm inline-block">
              Browse Cars
            </Link>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {savedCars.map((car) => (
              <div
                key={car.id}
                className="card-automotive p-4 flex items-center gap-4"
              >
                <img
                  src={car.image}
                  alt={car.model}
                  className="w-20 h-14 object-cover rounded-lg bg-secondary"
                />

                <div className="flex-1 min-w-0">
                  <p className="text-xs text-muted-foreground">
                    {car.brand}
                  </p>
                  <p className="font-display font-semibold text-sm text-foreground truncate">
                    {car.model}
                  </p>
                  <p className="text-sm font-medium text-accent">
                    ${car.price.toLocaleString()}
                  </p>
                </div>

                <div className="flex gap-1">
                  <Link
                    to={`/cars/${car.id}`}
                    className="p-2 rounded-lg text-muted-foreground hover:text-accent hover:bg-secondary transition-colors text-xs"
                  >
                    View
                  </Link>

                  <button
                    onClick={() => removeFavorite(car.id)}
                    className="p-2 rounded-lg text-muted-foreground hover:text-destructive hover:bg-secondary transition-colors"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* RECOMMENDATIONS */}
      <div>
        <h2 className="font-display text-xl font-bold text-foreground mb-4 flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-highlight" /> Recommendation History
        </h2>

        <div className="card-automotive p-8 text-center">
          <p className="text-muted-foreground mb-4">
            Your recommendation results will appear here
          </p>
          <Link
            to="/recommend"
            className="btn-accent text-sm inline-block"
          >
            Get Recommendations
          </Link>
        </div>
      </div>
    </div>

    <Footer />
  </div>
);
};

export default Dashboard;


import { Link, useNavigate } from "react-router-dom";
import { Heart, BarChart3, Clock, Sparkles, Trash2 } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import { cars } from "../data/cars.ts";

const savedComparisons = [
  { id: "1", cars: [cars[0], cars[2]], date: "Mar 5, 2026" },
  { id: "2", cars: [cars[1], cars[3], cars[4]], date: "Mar 3, 2026" },
];

const Dashboard = () => {
  const navigate = useNavigate();
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);

  const savedUser = localStorage.getItem("user");
  const user = savedUser ? JSON.parse(savedUser) : null;
  const token = localStorage.getItem("token");

  useEffect(() => {
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
      } finally {
        setLoading(false);
      }
    };

    fetchFavorites();
  }, [token, navigate]);

  const savedCars = useMemo(() => {
    return cars.filter((car) => favorites.includes(car.id));
  }, [favorites]);

  const initials = user?.firstName && user?.lastName
    ? `${user.firstName[0]}${user.lastName[0]}`.toUpperCase()
    : (user?.email?.[0] ?? "U").toUpperCase();

  const displayName = user?.firstName && user?.lastName
    ? `${user.firstName} ${user.lastName}`
    : user?.email || "User";

  const removeFavorite = async (carId) => {
    try {
      const res = await fetch(`http://localhost:2525/api/favorites/${carId}`, {
        method: "GET",   
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to remove favorite");
      }

      setFavorites(data.favorites || []);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="container-auto py-10">
        {/* Profile header */}
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

        {/* Stats */}
        <div className="grid sm:grid-cols-3 gap-4 mb-10">
          {[
            { icon: Heart, label: "Saved Cars", value: savedCars.length, color: "text-destructive" },
            { icon: BarChart3, label: "Comparisons", value: savedComparisons.length, color: "text-accent" },
            { icon: Sparkles, label: "Recommendations", value: 3, color: "text-highlight" },
          ].map((stat) => (
            <div key={stat.label} className="card-automotive p-6 flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-secondary flex items-center justify-center">
                <stat.icon className={`w-5 h-5 ${stat.color}`} />
              </div>
              <div>
                <p className="font-display text-2xl font-bold text-foreground">
                  {stat.value}
                </p>
                <p className="text-xs text-muted-foreground">{stat.label}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Saved Cars */}
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
              <p className="text-muted-foreground mb-4">You have no saved cars yet</p>
              <Link to="/cars" className="btn-accent text-sm inline-block">
                Browse Cars
              </Link>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {savedCars.map((car) => (
                <div key={car.id} className="card-automotive p-4 flex items-center gap-4">
                  <img
                    src={car.image}
                    alt={car.model}
                    className="w-20 h-14 object-cover rounded-lg bg-secondary"
                  />

                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-muted-foreground">{car.brand}</p>
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

        {/* Saved Comparisons */}
        <div className="mb-10">
          <h2 className="font-display text-xl font-bold text-foreground mb-4 flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-accent" /> Saved Comparisons
          </h2>

          <div className="space-y-3">
            {savedComparisons.map((comp) => (
              <div key={comp.id} className="card-automotive p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex -space-x-3">
                    {comp.cars.map((c) => (
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
                      {comp.cars.map((c) => `${c.brand} ${c.model}`).join(" vs ")}
                    </p>
                    <p className="text-xs text-muted-foreground flex items-center gap-1">
                      <Clock className="w-3 h-3" /> {comp.date}
                    </p>
                  </div>
                </div>

                <Link to="/compare" className="text-sm font-medium text-accent hover:underline">
                  View
                </Link>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Recommendations */}
        <div>
          <h2 className="font-display text-xl font-bold text-foreground mb-4 flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-highlight" /> Recommendation History
          </h2>

          <div className="card-automotive p-8 text-center">
            <p className="text-muted-foreground mb-4">
              Your recommendation results will appear here
            </p>
            <Link to="/recommend" className="btn-accent text-sm inline-block">
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
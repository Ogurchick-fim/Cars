import { useParams, Link } from "react-router-dom";
import {
  Heart,
  BarChart3,
  MapPin,
  ArrowLeft,
  Shield,
  Fuel,
  Gauge,
  Cog,
} from "lucide-react";
import { useState } from "react";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import { cars } from "../data/cars.ts";

const tabs = ["Specifications", "Features", "Ownership Cost", "Dealer Info"];

const CarDetailsPage = () => {
  const { id } = useParams();
  const car = cars.find((c) => c.id === id);
  const [activeTab, setActiveTab] = useState("Specifications");

  if (!car) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container-auto py-20 text-center">
          <h1 className="font-display text-2xl font-bold text-foreground mb-4">
            Car Not Found
          </h1>
          <Link to="/cars" className="btn-accent inline-block">
            Browse Cars
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="container-auto py-8">
        <Link
          to="/cars"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to listings
        </Link>

        <div className="grid lg:grid-cols-[1fr_380px] gap-8">
          <div>
            <div className="card-automotive overflow-hidden mb-6">
              <div className="aspect-[16/9] bg-secondary">
                <img
                  src={car.image}
                  alt={car.model}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            <div className="card-automotive overflow-hidden">
              <div className="flex border-b border-border">
                {tabs.map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`flex-1 px-4 py-3.5 text-sm font-medium transition-colors ${
                      activeTab === tab
                        ? "text-accent border-b-2 border-accent"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              <div className="p-6">
                {activeTab === "Specifications" && (
                  <div className="grid sm:grid-cols-2 gap-4">
                    {[
                      { icon: Cog, label: "Engine", value: car.engine },
                      {
                        icon: Gauge,
                        label: "Horsepower",
                        value: `${car.horsepower} HP`,
                      },
                      {
                        icon: Fuel,
                        label: "Fuel Economy",
                        value: car.fuelEconomy,
                      },
                      {
                        icon: Cog,
                        label: "Transmission",
                        value: car.transmission,
                      },
                      {
                        icon: Gauge,
                        label: "Acceleration",
                        value: car.acceleration,
                      },
                      {
                        icon: Shield,
                        label: "Reliability",
                        value: `${car.reliabilityScore}/100`,
                      },
                    ].map((spec) => (
                      <div
                        key={spec.label}
                        className="flex items-center gap-3 p-4 rounded-xl bg-secondary/50"
                      >
                        <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
                          <spec.icon className="w-4 h-4 text-accent" />
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground">
                            {spec.label}
                          </p>
                          <p className="text-sm font-semibold text-foreground">
                            {spec.value}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {activeTab === "Features" && (
                  <div>
                    <h4 className="font-display font-semibold text-foreground mb-4">
                      Safety Features
                    </h4>
                    <div className="grid sm:grid-cols-2 gap-3">
                      {car.safetyFeatures.map((feature) => (
                        <div
                          key={feature}
                          className="flex items-center gap-2 text-sm text-foreground"
                        >
                          <Shield className="w-4 h-4 text-green-500" />
                          {feature}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {activeTab === "Ownership Cost" && (
                  <div className="space-y-4">
                    {[
                      {
                        label: "Estimated Annual Insurance",
                        value: "$1,800",
                        pct: 30,
                      },
                      {
                        label: "Annual Fuel/Charging Cost",
                        value:
                          car.fuelType === "Electric" ? "$600" : "$2,400",
                        pct: car.fuelType === "Electric" ? 10 : 40,
                      },
                      {
                        label: "Annual Maintenance",
                        value: "$1,200",
                        pct: 20,
                      },
                      {
                        label: "Depreciation (Year 1)",
                        value: `$${Math.round(
                          car.price * 0.15
                        ).toLocaleString()}`,
                        pct: 60,
                      },
                    ].map((cost) => (
                      <div key={cost.label}>
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-muted-foreground">
                            {cost.label}
                          </span>
                          <span className="font-medium text-foreground">
                            {cost.value}
                          </span>
                        </div>
                        <div className="h-2 bg-secondary rounded-full overflow-hidden">
                          <div
                            className="h-full bg-accent rounded-full transition-all"
                            style={{ width: `${cost.pct}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {activeTab === "Dealer Info" && (
                  <div className="space-y-3">
                    <p className="font-semibold text-foreground">{car.dealer}</p>
                    <p className="flex items-center gap-2 text-sm text-muted-foreground">
                      <MapPin className="w-4 h-4" />
                      {car.dealerLocation}
                    </p>
                    <button className="btn-accent text-sm mt-4">
                      Contact Dealer
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="card-automotive p-6">
              <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">
                {car.brand}
              </p>
              <h1 className="font-display text-2xl font-bold text-foreground mb-2">
                {car.model}
              </h1>
              <p className="font-display text-3xl font-bold text-accent mb-6">
                ${car.price.toLocaleString()}
              </p>

              <div className="space-y-3 mb-6">
                {[
                  { label: "Year", value: car.year },
                  { label: "Mileage", value: `${car.mileage.toLocaleString()} mi` },
                  { label: "Fuel Type", value: car.fuelType },
                  { label: "Body Type", value: car.bodyType },
                ].map((item) => (
                  <div key={item.label} className="flex justify-between text-sm">
                    <span className="text-muted-foreground">{item.label}</span>
                    <span className="font-medium text-foreground">
                      {item.value}
                    </span>
                  </div>
                ))}
              </div>

              <div className="flex gap-2">
                <button className="flex-1 btn-accent text-sm py-3">
                  <BarChart3 className="w-4 h-4 inline mr-1.5" />
                  Compare
                </button>
                <button className="btn-outline-auto px-4">
                  <Heart className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="card-automotive p-6">
              <h3 className="font-display font-semibold text-foreground mb-3">
                Dealer
              </h3>
              <p className="text-sm font-medium text-foreground">{car.dealer}</p>
              <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                <MapPin className="w-3 h-3" />
                {car.dealerLocation}
              </p>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default CarDetailsPage;
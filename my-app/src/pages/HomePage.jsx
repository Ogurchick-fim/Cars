import { Link } from "react-router-dom";
import { Search, ArrowRight, Zap, BarChart3, Calculator, Shield } from "lucide-react";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import CarCard from "../components/cars/CarCard";
import { cars, brands } from "../data/cars.ts";
import heroCar from "../assets/hero-car.png";

const features = [
  { icon: BarChart3, title: "Smart Compare", desc: "Side-by-side comparison with highlighted best values" },
  { icon: Zap, title: "AI Recommendations", desc: "Get personalized car suggestions based on your lifestyle" },
  { icon: Calculator, title: "Ownership Cost", desc: "Calculate total cost including insurance, fuel, and maintenance" },
  { icon: Shield, title: "Reliability Scores", desc: "Data-driven reliability ratings from real owners" },
];

const Index = () => (
  <div className="min-h-screen bg-background">
    <Navbar />

    {/* Hero */}
    <section className="relative overflow-hidden">
      <div className="container-auto py-20 lg:py-32">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="animate-slide-up">
            <span className="inline-block text-xs font-semibold uppercase tracking-widest text-accent mb-4 px-3 py-1.5 bg-accent/10 rounded-full">
              Smart Car Marketplace
            </span>
            <h1 className="font-display text-5xl lg:text-6xl xl:text-7xl font-bold text-foreground leading-[1.05] mb-6">
              Find the<br />
              <span className="text-gradient">Best Car</span><br />
              for You
            </h1>
            <p className="text-lg text-muted-foreground max-w-md mb-8 leading-relaxed">
              Compare specs, costs, and reliability scores. Make smarter decisions with data-driven insights.
            </p>

            {/* Search Bar */}
            <div className="flex flex-col sm:flex-row gap-3 max-w-lg">
              <div className="flex-1 relative">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search brand, model, or type..."
                  className="w-full pl-10 pr-4 py-3.5 rounded-xl border border-input bg-card text-foreground text-sm focus:ring-2 focus:ring-accent/30 outline-none transition"
                />
              </div>
              <Link to="/cars" className="btn-accent flex items-center justify-center gap-2 whitespace-nowrap">
                Browse Cars <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          <div className="animate-slide-up-delay relative">
            <div className="relative">
              <div className="absolute -inset-8 bg-accent/5 rounded-[3rem] blur-3xl" />
              <img src={heroCar} alt="Featured Car" className="relative w-full rounded-2xl" />
            </div>
          </div>
        </div>
      </div>
    </section>

    {/* Features */}
    <section className="section-padding bg-secondary/30">
      <div className="container-auto">
        <div className="text-center mb-14 animate-slide-up">
          <h2 className="font-display text-3xl lg:text-4xl font-bold text-foreground mb-3">Why AutoPilot?</h2>
          <p className="text-muted-foreground max-w-lg mx-auto">Everything you need to find your perfect car, powered by data.</p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((f) => (
            <div key={f.title} className="card-automotive p-6 text-center">
              <div className="w-12 h-12 mx-auto mb-4 rounded-xl bg-accent/10 flex items-center justify-center">
                <f.icon className="w-5 h-5 text-accent" />
              </div>
              <h3 className="font-display font-semibold text-foreground mb-2">{f.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* Featured Cars */}
    <section className="section-padding">
      <div className="container-auto">
        <div className="flex items-end justify-between mb-10">
          <div>
            <h2 className="font-display text-3xl font-bold text-foreground mb-2">Featured Cars</h2>
            <p className="text-muted-foreground">Hand-picked vehicles for every budget</p>
          </div>
          <Link to="/cars" className="hidden sm:flex items-center gap-1 text-sm font-medium text-accent hover:underline">
            View All <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {cars.slice(0, 6).map((car) => (
            <CarCard key={car.id} car={car} />
          ))}
        </div>
      </div>
    </section>

    {/* Popular Brands */}
    <section className="section-padding bg-secondary/30">
      <div className="container-auto">
        <h2 className="font-display text-3xl font-bold text-foreground mb-10 text-center">Popular Brands</h2>
        <div className="flex flex-wrap justify-center gap-4">
          {brands.map((brand) => (
            <Link
              key={brand}
              to="/cars"
              className="px-6 py-3 rounded-xl bg-card border border-border text-sm font-medium text-foreground hover:border-accent hover:text-accent transition-colors"
            >
              {brand}
            </Link>
          ))}
        </div>
      </div>
    </section>

    {/* CTA */}
    <section className="section-padding">
      <div className="container-auto">
        <div className="bg-primary rounded-3xl p-12 lg:p-16 text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-accent/20 to-transparent" />
          <div className="relative">
            <h2 className="font-display text-3xl lg:text-4xl font-bold text-primary-foreground mb-4">
              Ready to Find Your Dream Car?
            </h2>
            <p className="text-primary-foreground/70 mb-8 max-w-md mx-auto">
              Get personalized recommendations based on your lifestyle and budget.
            </p>
            <Link to="/recommend" className="btn-highlight inline-flex items-center gap-2">
              Get Recommendations <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>

    <Footer />
  </div>
);

export default Index;

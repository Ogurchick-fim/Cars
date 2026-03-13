import { useState } from "react";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import { cars } from "../data/cars.ts";
import RecommendationCard from "../components/RecommendationCard.jsx";
import { Sparkles, ArrowRight } from "lucide-react";

const questions = [
  { key: "budget", label: "What's your budget?", options: ["Under $30k", "$30k–$50k", "$50k–$80k", "$80k+"] },
  { key: "driving", label: "Driving type?", options: ["City", "Highway", "Mixed", "Off-road"] },
  { key: "mileage", label: "Annual mileage?", options: ["Under 5k mi", "5k–15k mi", "15k–25k mi", "25k+ mi"] },
  { key: "family", label: "Family size?", options: ["1–2", "3–4", "5+", "Doesn't matter"] },
  { key: "fuel", label: "Fuel preference?", options: ["Electric", "Hybrid", "Petrol", "No preference"] },
];

const mockResults = [
  { car: cars[0], match: 95, reasons: ["Fits your budget perfectly", "Electric suits your driving pattern", "Great reliability score"] },
  { car: cars[4], match: 88, reasons: ["Excellent safety for families", "Low ownership cost", "Best-in-class reliability"] },
  { car: cars[2], match: 82, reasons: ["Hybrid for mixed driving", "Premium comfort", "Strong resale value"] },
];

const RecommendPage = () => {
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const allAnswered = questions.every((q) => answers[q.key]);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container-auto py-10">
        {!submitted ? (
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-10">
              <div className="w-14 h-14 mx-auto mb-4 rounded-2xl bg-accent/10 flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-accent" />
              </div>
              <h1 className="font-display text-3xl font-bold text-foreground mb-2">Smart Recommendations</h1>
              <p className="text-muted-foreground">Answer a few questions and we'll find your perfect match.</p>
            </div>

            <div className="space-y-6">
              {questions.map((q) => (
                <div key={q.key} className="card-automotive p-6">
                  <h3 className="font-display font-semibold text-foreground mb-4">{q.label}</h3>
                  <div className="grid grid-cols-2 gap-3">
                    {q.options.map((opt) => (
                      <button
                        key={opt}
                        onClick={() => setAnswers((a) => ({ ...a, [q.key]: opt }))}
                        className={`px-4 py-3 rounded-xl text-sm font-medium transition-all border ${
                          answers[q.key] === opt
                            ? "bg-accent text-accent-foreground border-accent"
                            : "bg-card text-foreground border-border hover:border-accent/50"
                        }`}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={() => setSubmitted(true)}
              disabled={!allAnswered}
              className={`w-full mt-8 flex items-center justify-center gap-2 py-4 rounded-xl font-semibold text-sm transition-all ${
                allAnswered ? "btn-accent" : "bg-muted text-muted-foreground cursor-not-allowed"
              }`}
            >
              Get Recommendations <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        ) : (
          <div>
            <div className="flex items-center justify-between mb-8">
              <div>
                <h1 className="font-display text-3xl font-bold text-foreground mb-2">Your Recommendations</h1>
                <p className="text-muted-foreground">Based on your preferences, here are your best matches.</p>
              </div>
              <button onClick={() => setSubmitted(false)} className="btn-outline-auto text-sm py-2.5">
                Retake Quiz
              </button>
            </div>
            <div className="space-y-6">
              {mockResults.map((r) => (
                <RecommendationCard key={r.car.id} car={r.car} matchPercentage={r.match} reasons={r.reasons} />
              ))}
            </div>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default RecommendPage;

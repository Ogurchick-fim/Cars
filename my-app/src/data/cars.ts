import carSuv from "./../assets/car-suv.png";
import carSports from "./../assets/car-sports.png";
import carSedan from "./../assets/car-sedan.png";
import carElectric from "./../assets/car-electric.png";
import carCrossover from "./../assets/car-crossover.png";

export interface Car {
  id: string;
  brand: string;
  model: string;
  year: number;
  price: number;    
  mileage: number;
  fuelType: string;
  transmission: string;
  bodyType: string;
  engine: string;
  horsepower: number;
  fuelEconomy: string;
  acceleration: string;
  reliabilityScore: number;
  safetyFeatures: string[];
  image: string;
  dealer: string;
  dealerLocation: string;
}

export const cars: Car[] = [
  {
    id: "1",
    brand: "Tesla",
    model: "Model Y",
    year: 2024,
    price: 44990,
    mileage: 1200,
    fuelType: "Electric",
    transmission: "Automatic",
    bodyType: "SUV",
    engine: "Dual Motor AWD",
    horsepower: 384,
    fuelEconomy: "122 MPGe",
    acceleration: "4.8s 0-60",
    reliabilityScore: 88,
    safetyFeatures: ["Autopilot", "8 Airbags", "Collision Avoidance", "Lane Departure"],
    image: carSuv,
    dealer: "Tesla Direct",
    dealerLocation: "San Francisco, CA",
  },
  {
    id: "2",
    brand: "Porsche",
    model: "911 Carrera",
    year: 2024,
    price: 116950,
    mileage: 500,
    fuelType: "Petrol",
    transmission: "Automatic",
    bodyType: "Coupe",
    engine: "3.0L Twin-Turbo Flat-6",
    horsepower: 379,
    fuelEconomy: "24 MPG",
    acceleration: "4.0s 0-60",
    reliabilityScore: 82,
    safetyFeatures: ["Porsche Stability", "6 Airbags", "ABS", "Traction Control"],
    image: carSports,
    dealer: "Porsche Centre",
    dealerLocation: "Los Angeles, CA",
  },
  {
    id: "3",
    brand: "BMW",
    model: "5 Series",
    year: 2024,
    price: 56800,
    mileage: 3200,
    fuelType: "Hybrid",
    transmission: "Automatic",
    bodyType: "Sedan",
    engine: "2.0L Turbo + Electric",
    horsepower: 312,
    fuelEconomy: "52 MPGe",
    acceleration: "5.7s 0-60",
    reliabilityScore: 85,
    safetyFeatures: ["Driving Assistant Pro", "8 Airbags", "Parking Assistant", "Blind Spot"],
    image: carSedan,
    dealer: "BMW Manhattan",
    dealerLocation: "New York, NY",
  },
  {
    id: "4",
    brand: "Rivian",
    model: "R1S",
    year: 2024,
    price: 78000,
    mileage: 800,
    fuelType: "Electric",
    transmission: "Automatic",
    bodyType: "SUV",
    engine: "Quad Motor AWD",
    horsepower: 835,
    fuelEconomy: "104 MPGe",
    acceleration: "3.0s 0-60",
    reliabilityScore: 76,
    safetyFeatures: ["Driver+", "11 Airbags", "Highway Assist", "360° Camera"],
    image: carElectric,
    dealer: "Rivian Hub",
    dealerLocation: "Chicago, IL",
  },
  {
    id: "5",
    brand: "Volvo",
    model: "XC40 Recharge",
    year: 2024,
    price: 38600,
    mileage: 5100,
    fuelType: "Electric",
    transmission: "Automatic",
    bodyType: "Crossover",
    engine: "Single Motor FWD",
    horsepower: 248,
    fuelEconomy: "110 MPGe",
    acceleration: "6.2s 0-60",
    reliabilityScore: 90,
    safetyFeatures: ["Pilot Assist", "City Safety", "Run-off Road Protection", "BLIS"],
    image: carCrossover,
    dealer: "Volvo Cars",
    dealerLocation: "Seattle, WA",
  },
  {
    id: "6",
    brand: "Mercedes",
    model: "EQE SUV",
    year: 2024,
    price: 68900,
    mileage: 2100,
    fuelType: "Electric",
    transmission: "Automatic",
    bodyType: "SUV",
    engine: "Dual Motor AWD",
    horsepower: 402,
    fuelEconomy: "96 MPGe",
    acceleration: "4.7s 0-60",
    reliabilityScore: 84,
    safetyFeatures: ["DRIVE PILOT", "PRE-SAFE", "Active Brake Assist", "Blind Spot"],
    image: carSuv,
    dealer: "MB of Beverly Hills",
    dealerLocation: "Beverly Hills, CA",
  },
];

export const brands = ["Tesla", "Porsche", "BMW", "Rivian", "Volvo", "Mercedes", "Audi", "Toyota", "Honda"];
export const bodyTypes = ["Sedan", "SUV", "Coupe", "Crossover", "Hatchback", "Truck"];
export const fuelTypes = ["Petrol", "Diesel", "Electric", "Hybrid"];
export const transmissions = ["Automatic", "Manual"];

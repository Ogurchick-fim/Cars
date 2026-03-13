import  { Car } from "../../data/cars.ts";

/** @typedef {{ cars: Car[] }} ComparisonTableProps */

/** @type {{ label: string; key: keyof Car | "price_fmt" }[]} */
const rows = [
  { label: "Price", key: "price_fmt" },
  { label: "Engine", key: "engine" },
  { label: "Horsepower", key: "horsepower" },
  { label: "Fuel Economy", key: "fuelEconomy" },
  { label: "Acceleration", key: "acceleration" },
  { label: "Reliability", key: "reliabilityScore" },
  { label: "Fuel Type", key: "fuelType" },
  { label: "Transmission", key: "transmission" },
  { label: "Body Type", key: "bodyType" },
];

/**
 * @param {Car[]} cars
 * @param {string} key
 * @returns {number}
 */
function getBestIndex(cars, key) {
  if (key === "price_fmt") return cars.reduce((best, c, i) => (c.price < cars[best].price ? i : best), 0);
  if (key === "horsepower") return cars.reduce((best, c, i) => (c.horsepower > cars[best].horsepower ? i : best), 0);
  if (key === "reliabilityScore") return cars.reduce((best, c, i) => (c.reliabilityScore > cars[best].reliabilityScore ? i : best), 0);
  return -1;
}

/**
 * @param {Car} car
 * @param {string} key
 * @returns {string}
 */
function getValue(car, key) {
   if (key === "price_fmt") return `$${car.price.toLocaleString()}`;
  return String(car[key]);
}



/** @param {ComparisonTableProps} props */
const ComparisonTable = ({ cars }) => {
  if (!cars || !Array.isArray(cars)) {
    return <div className="p-4 text-center text-muted-foreground">No cars to compare.</div>;
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr>
            <th className="text-left p-4 text-sm font-medium text-muted-foreground border-b border-border w-48"></th>
            {cars.map((car) => (
              <th key={car.id} className="p-4 border-b border-border min-w-[200px]">
                <div className="flex flex-col items-center">
                  <img src={car.image} alt={car.model} className="w-32 h-20 object-contain mb-3" />
                  <p className="text-xs text-muted-foreground uppercase tracking-wider">{car.brand}</p>
                  <p className="font-display font-bold text-foreground">{car.model}</p>
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => {
            const bestIdx = getBestIndex(cars, row.key);
            return (
              <tr key={row.label} className="border-b border-border/50 hover:bg-secondary/50 transition-colors">
                <td className="p-4 text-sm font-medium text-muted-foreground ">{row.label}</td>
                {cars.map((car, i) => (
                  <td key={car.id} className="p-4 text-center  text-green-600">
                    <span className={`text-sm font-medium ${i === bestIdx ? "text-success font-bold" : "text-foreground"}`}>
                      {getValue(car, row.key)}
                      {i === bestIdx && <span className="badge-best ml-2">Best</span>}
                    </span>
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};


export default ComparisonTable;

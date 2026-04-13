export const parseFuelEconomy = (fuelEconomy) => {
  if (!fuelEconomy) return 0;

  const match = String(fuelEconomy).match(/[\d.]+/);
  return match ? Number(match[0]) : 0;
};

export const calculateTotalCost = (price, depreciationRate, years) => {
  const depreciatedValue = price * Math.pow(1 - depreciationRate, years);
  const depreciationLoss = price - depreciatedValue;
  const insurance = price * 0.05 * years;
  const maintenance = price * 0.03 * years;

  return price + depreciationLoss + insurance + maintenance;
};

export const calculateScore = ({
  price,
  fuelEfficiency,
  reliability,
  budget,
  fuelWeight = 0.3,
  reliabilityWeight = 0.4,
  priceWeight = 0.3,
}) => {
  const normalizedPricePenalty = budget
    ? (price / budget) * 10
    : price / 10000;

  return (
    fuelEfficiency * fuelWeight +
    reliability * reliabilityWeight -
    normalizedPricePenalty * priceWeight
  );
};

export const getDepreciationRate = (fuelType, bodyType) => {
  if (fuelType === "Electric") return 0.18;
  if (bodyType === "Luxury") return 0.2;
  if (bodyType === "SUV") return 0.14;
  return 0.15;
};
const API_BASE = "http://localhost:8000";

export const getCars = async () => {
  const res = await fetch(`${API_BASE}/cars`);
  if (!res.ok) throw new Error("Failed to fetch cars");
  return res.json();
};

import { useEffect } from "react";
import { getCars } from "../api/carsApi";

useEffect(() => {
  getCars().then(console.log).catch(console.error);
}, []);
    
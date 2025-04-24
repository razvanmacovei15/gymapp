// hooks/useTaskStatuses.ts
import { useState, useEffect } from "react";
import axios from "axios";

export const useTaskCategories = () => {
  const [categories, setCategories] = useState<string[]>([]);
  const apiUrl = import.meta.env.VITE_API_URL;

  const fetchStatuses = async () => {
    try {
      const result = await axios.get(`${apiUrl}/api/enum/categories`);
      setCategories(result.data);
    } catch (error) {
      console.error("Error fetching statuses:", error);
    }
  };

  useEffect(() => {
    fetchStatuses();
  }, []);

  return { categories };
};

// hooks/useTaskStatuses.ts
import { useState, useEffect } from "react";
import axios from "axios";

export const useTaskCategories = () => {
  const [categories, setCategories] = useState<string[]>([]);

  const fetchStatuses = async () => {
    try {
      const result = await axios.get("http://.go.ro:8010/api/enum/categories");
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

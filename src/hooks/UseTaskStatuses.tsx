// hooks/useTaskStatuses.ts
import { useState, useEffect } from "react";
import axios from "axios";

export const useTaskStatuses = () => {
  const [statuses, setStatuses] = useState<string[]>([]);

  const fetchStatuses = async () => {
    try {
      const result = await axios.get(
        "http://maco-coding.go.ro:8010/api/enum/statuses"
      );
      setStatuses(result.data);
    } catch (error) {
      console.error("Error fetching statuses:", error);
    }
  };

  useEffect(() => {
    fetchStatuses();
  }, []);

  return {statuses,};
};

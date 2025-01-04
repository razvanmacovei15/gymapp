import { useState, useEffect, useMemo } from "react";
import axios from "axios";
import { Gym } from "../components/types/Gym";

export type GymItem = {
  id: number;
  gym: Gym;
  checked: boolean;
};

export const useGymItems = (initialTaskGyms: Gym[]) => {
  const [totalGyms, setTotalGyms] = useState<Gym[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const [taskGyms, setTaskGyms] = useState<Gym[]>(initialTaskGyms);

  useEffect(() => {
    const fetchGyms = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get(
          "http://maco-coding.go.ro:8010/gyms/all"
        );
        setTotalGyms(response.data);
      } catch (err) {
        setError("Failed to fetch gyms");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchGyms();
  }, []);

  const items: GymItem[] = useMemo(() => {
    return totalGyms.map((gym) => ({
      id: gym.id,
      gym,
      checked: taskGyms.some((taskGym) => taskGym.id === gym.id),
    }));
  }, [totalGyms, taskGyms]);

  const handleCheckedChange = (id: number, checked: boolean) => {
    const selectedGym = totalGyms.find((gym) => gym.id === id);

    if (selectedGym) {
      const updatedTaskGyms = checked
        ? [...taskGyms, selectedGym]
        : taskGyms.filter((gym) => gym.id !== id);

      setTaskGyms(updatedTaskGyms);
    }
  };

  return {
    items, // The processed array with `checked` state
    taskGyms, // Current selected gyms
    setTaskGyms, // Setter for the selected gyms
    handleCheckedChange, // Function to toggle `checked`
    loading, // Loading state
    error, // Error state if fetching fails
  };
};

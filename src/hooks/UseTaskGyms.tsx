import { useState, useEffect, useMemo } from "react";
import axios from "axios";
import { Gym } from "../components/types/Gym";

type Item = {
  id: number;
  gym: Gym;
  checked: boolean;
};

export const useGymItems = (initialTaskGyms: Gym[]) => {
  // State to store the total gyms fetched from the API
  const [totalGyms, setTotalGyms] = useState<Gym[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // State to track the task gyms (selected gyms)
  const [taskGyms, setTaskGyms] = useState<Gym[]>(initialTaskGyms);

  // Fetch gyms from the API when the hook is first used
  useEffect(() => {
    const fetchGyms = async () => {
      setLoading(true);
      setError(null); // Reset error state before fetching
      try {
        const response = await axios.get(
          "http://maco-coding.go.ro:8010/gyms/all"
        );
        setTotalGyms(response.data); // Save fetched gyms to state
      } catch (err) {
        setError("Failed to fetch gyms"); // Set error if fetch fails
        console.error(err);
      } finally {
        setLoading(false); // Turn off loading state
      }
    };

    fetchGyms();
  }, []);

  // Generate the items array with `checked` status based on the `taskGyms` array
  const items: Item[] = useMemo(() => {
    return totalGyms.map((gym) => ({
      id: gym.id, // Unique gym ID
      gym, // The gym object
      checked: taskGyms.some((taskGym) => taskGym.id === gym.id), // Checked if the gym is in taskGyms
    }));
  }, [totalGyms, taskGyms]);

  // Handle toggling the `checked` property for a gym
  const handleCheckedChange = (id: number, checked: boolean) => {
    const selectedGym = totalGyms.find((gym) => gym.id === id);

    if (selectedGym) {
      // Add or remove the gym from the taskGyms array based on `checked`
      const updatedTaskGyms = checked
        ? [...taskGyms, selectedGym] // Add gym if checked
        : taskGyms.filter((gym) => gym.id !== id); // Remove gym if unchecked

      setTaskGyms(updatedTaskGyms); // Update the taskGyms state
    }
  };

  // Return the hook API
  return {
    items, // The processed array with `checked` state
    taskGyms, // Current selected gyms
    setTaskGyms, // Setter for the selected gyms
    handleCheckedChange, // Function to toggle `checked`
    loading, // Loading state
    error, // Error state if fetching fails
  };
};

import { useEffect, useState } from "react";
import axios from "axios";
import { Gym } from "../components/types/Gym";

type Item = {
  id: number;
  gym: Gym;
  checked: boolean;
};

export const useGyms = (initialTaskGyms: Gym[] = []) => {
  const [gyms, setGyms] = useState<Gym[]>([]);
  const [items, setItems] = useState<Item[]>([]);
  const [taskGyms, setTaskGyms] = useState<Gym[]>(initialTaskGyms);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchGyms = async () => {
    try {
      setLoading(true);
      const response = await axios.get("http://maco-coding.go.ro:8010/gyms/all");
      setGyms(response.data);
      setItemsArray(response.data);
    } catch (error) {
      console.error("Failed to fetch gyms:", error);
    } finally {
      setLoading(false);
    }
  };

  const setItemsArray = (gyms: Gym[]) => {
    const itemsArray = gyms.map((gym) => ({
      id: gym.id,
      gym,
      checked: initialTaskGyms.some((taskGym) => taskGym.id === gym.id),
    }));
    setItems(itemsArray);
  };

  const handleCheckedChange = (id: number, checked: boolean) => {
    setItems((prevItems) =>
      prevItems.map((item) => (item.id === id ? { ...item, checked } : item))
    );

    const selectedGym = gyms.find((gym) => gym.id === id);
    if (selectedGym) {
      const updatedGyms = checked
        ? [...taskGyms, selectedGym] // Add gym if checked
        : taskGyms.filter((gym) => gym.id !== id); // Remove gym if unchecked
      setTaskGyms(updatedGyms);
    }
  };

  useEffect(() => {
    fetchGyms();
  }, []);

  useEffect(() => {
    setItemsArray(gyms);
  }, [gyms, initialTaskGyms]);

  return { gyms, setItems, items, taskGyms, setTaskGyms, loading, handleCheckedChange };
};

import { User } from "@/components/types/User";
import axios from "axios";
import { set } from "date-fns";
import { useEffect, useMemo, useState } from "react";

type AsigneeItem = {
  id: number;
  user: User;
  checked: boolean;
};

export const useTaskAsignees = (initialTaskAsignees: User[]) => {
  const [totalAsignees, setTotalAsignees] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const [taskAsignees, setTaskAsignees] = useState<User[]>(initialTaskAsignees);

  useEffect(() => {
    const fetchAsignees = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get(
          "http://maco-coding.go.ro:8010/api/users/managers"
        );

        console.log(response.data);
        setTotalAsignees(response.data);
      } catch (err) {
        setError("Failed to fetch asignees");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchAsignees();
  }, []);

  const items: AsigneeItem[] = useMemo(() => {
    return totalAsignees.map((user) => ({
      id: user.id,
      user,
      checked: taskAsignees.some((taskAsignee) => taskAsignee.id === user.id),
    }));
  }, [totalAsignees, taskAsignees]);

  const handleCheckedChange = (id: number, checked: boolean) => {
    const selectedAsignee = totalAsignees.find((user) => user.id === id);

    if (selectedAsignee) {
      const updatedTaskAsignees = checked
        ? [...taskAsignees, selectedAsignee]
        : taskAsignees.filter((asignee) => asignee.id !== id);
      setTaskAsignees(updatedTaskAsignees);
    }
  };

  return {
    items,
    taskAsignees,
    setTaskAsignees,
    handleCheckedChange,
    loading,
    error,
  };
};

import { useState, useEffect } from "react";
import axios from "axios";
import GymBox from "../components/GymBox";
import { set } from "date-fns";

export default function Dashboard() {
  const [gyms, setGyms] = useState([]);
  const [error, setError] = useState(null);

  // Fetch gyms data from the API
  const fetGym = async () => {
    const token = localStorage.getItem("authToken");
    console.log("token", token);
    try {
      const response = await axios.get(
        "http://maco-coding.go.ro:8010/gyms/dashboard",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setGyms(response.data.bucketList);
    } catch (err) {
      console.error("Failed to fetch gym:", err);
    }
  };

  // Process data for pie chart
  const getTaskDataForPieChart = (gym) => [
    { status: "Completed", value: gym.completedTasks, fill: "#81d9b9" },
    { status: "To Do", value: gym.toDoTasks, fill: "#d388aa" },
    { status: "Backlog", value: gym.backlogTasks, fill: "#ffc107" },
    { status: "In Progress", value: gym.inProgressTasks, fill: "#4d6792" },
    { status: "Cancelled", value: gym.cancelledTasks, fill: "#e94949" },
  ];

  useEffect(() => {
    fetGym();
  }, []);

  return (
    <div className="p-4 bg-gradient-to-b from-gray-950 via-gray-950 to-pink-950 min-h-screen">
      <h1 className="text-3xl font-bold text-center mb-6">Gym Dashboard</h1>

      {error ? (
        <p className="text-red-500 text-center">{error}</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {gyms.map((gym) => (
            <GymBox
              key={gym.gymId}
              gymName={gym.gymName}
              photoUrl={`https://i.pinimg.com/736x/3f/c8/12/3fc81274aef4fce9c012ec53d8918d29.jpg`}
              taskData={getTaskDataForPieChart(gym)}
            />
          ))}
        </div>
      )}
    </div>
  );
}

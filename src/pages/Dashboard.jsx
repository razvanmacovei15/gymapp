import { useState, useEffect } from "react";
import axios from "axios";
import GymBox from "../components/GymBox";

export default function Dashboard() {
  const [gyms, setGyms] = useState([]);
  const [error, setError] = useState(null);

  // Fetch gyms data from the API
  const fetchGym = async () => {
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
      setError("Failed to fetch gym.");
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
    fetchGym();
  }, []);

  return (
    <div className="p-4 bg-gradient-to-b from-gray-950 via-gray-950 to-pink-950 min-h-screen flex flex-col items-center mt-24">
      {error ? (
        <p className="text-red-500 text-center">{error}</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4 w-full max-w-[1200px]">
          {gyms.map((gym) => (
            <GymBox
              key={gym.gymId}
              gymName={gym.gymName}
              photoUrl={`src/components/photos/Screenshot 2025-01-11 at 22.58.15.png`}
              taskData={getTaskDataForPieChart(gym)}
            />
          ))}
        </div>
      )}
    </div>
  );
}

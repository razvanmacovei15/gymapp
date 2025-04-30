import { useState, useEffect } from "react";
import axios from "axios";
import GymBox from "../components/GymBox";

export default function Dashboard() {
  const [gyms, setGyms] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  

  const apiUrl = import.meta.env.VITE_API_URL;


  // Fetch gyms data from the API
  const fetchGym = async () => {
    const token = localStorage.getItem("authToken");
    try {
      setLoading(true);
      const response = await axios.get(
        `${apiUrl}/gyms/dashboard`,
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
    } finally {
            setLoading(false);

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
    <div className="p-4  min-h-screen flex flex-col items-center mt-24">
      {loading ? (
        <div className="flex flex-col items-center justify-center h-[50vh]">
        <div className="w-12 h-12 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
        <p className="text-white text-center text-2xl mt-4">Loading gyms...</p>
      </div>
      ) : error ? (
        <p className="text-red-500 text-center">{error}</p>
      ) : (
        <>
          <h1 className="text-white text-4xl py-5 pr-5">
            DASHBOARD
          </h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4 w-full max-w-[1200px]">
          
          {gyms.map((gym) => (
            <GymBox
              key={gym.gymId}
              gymName={gym.gymName}
              photoUrl={`${apiUrl}/api/logo`}
              taskData={getTaskDataForPieChart(gym)}
            />
          ))}
        </div>
      </>
      )}
    </div>
  );
}

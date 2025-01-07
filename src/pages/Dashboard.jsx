import React, { useState, useEffect } from "react";
import GymBox from "../components/GymBox"
import axios from "axios";

export default function Dashboard() {
  const [gyms, setGyms] = useState([]);

 /*  useEffect(() => {
    // Fetch gyms and tasks data
    const fetchGymsData = async () => {
      try {
        const response = await axios.get("http://api.example.com/gyms");
        setGyms(response.data);
      } catch (error) {
        console.error("Error fetching gyms:", error);
      }
    };
    fetchGymsData();
  }, []); */
useEffect(() => {
    // Hardcoded gyms data
    const hardcodedGyms = [
        {
            id: 1,
            name: "Gym A",
            photoUrl: "https://example.com/photoA.jpg",
            tasks: [
                { status: "TO_DO" },
                { status: "CANCELLED" },
                { status: "DONE" },
            ],
        },
        {
            id: 2,
            name: "Gym B",
            photoUrl: "https://example.com/photoB.jpg",
            tasks: [
                { status: "DONE" },
                { status: "DONE" },
                { status: "DONE" },
            ],
        },
        {
            id: 3,
            name: "Gym C",
            photoUrl: "https://example.com/photoC.jpg",
            tasks: [
                { status: "DONE" },
                { status: "TO_DO" },
                { status: "TO_DO" },
            ],
        },
    ];

    setGyms(hardcodedGyms);
}, []);

  const getTaskDataForPieChart = (tasks) => {
    const taskCounts = tasks.reduce((acc, task) => {
      acc[task.status] = (acc[task.status] || 0) + 1;
      return acc;
    }, {});

    return Object.keys(taskCounts).map((status) => ({
      status,
      value: taskCounts[status],
    }));
  };

  return (
    
    <div className="grid grid-cols-3 gap-4 p-4">
      {gyms.map((gym) => (
        <GymBox
          key={gym.id}
          gymName={gym.name}
          photoUrl={gym.photoUrl}
          taskData={getTaskDataForPieChart(gym.tasks)}
        />
      ))}
    </div>
  );
}

// src/components/MainInfo.jsx

import React, { useState, useEffect } from "react";
import axios from "axios";
import Task from "./Task";

export default function MainInfo() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true); // For tracking loading state
  const [error, setError] = useState(null); // For tracking errors

  const fetchTasksData = async () => {
    try {
      setLoading(true);
      const response = await axios.get("http://maco-coding.go.ro:8010/tasks/all");
      console.log(response.data); // Log the fetched tasks
      setTasks(response.data); // Update the state with fetched tasks
    } catch (err) {
      console.error("Failed to fetch tasks:", err);
      setError("Failed to fetch tasks.");
    } finally {
      setLoading(false);
    }
  };

  // Use effect to fetch tasks when the component mounts
  useEffect(() => {
    fetchTasksData();
  }, []);

  // Render loading, error, or the task list
  return (
    <div className="bg-[#455271] h-full rounded-xl m-1 p-4">
      <h2 className="text-5xl font-bold m-10 text-left ml-7">TASKS</h2>
      {loading ? (
        <p className="text-white text-center">Loading tasks...</p>
      ) : error ? (
        <p className="text-red-500 text-center">{error}</p>
      ) : (
        <div className="space-y-4">
          {tasks.length > 0 ? (
            tasks.map((task) => (
              <Task
                key={task.taskId} 
                id={task.taskDTO.taskId}
                // title={task.title}
                creator={task.taskDTO.creator}
                category={task.taskDTO.category}
                description={task.taskDTO.description}
                subcategory={task.taskDTO.subcategory}
                priority={task.taskDTO.priority}
                deadline={task.taskDTO.deadline}
                gyms={task.gyms}
                users={task.users}
              />
            ))
          ) : (
            <p className="text-white text-center">No tasks available</p> // Handle empty tasks list
         )}
        </div>
      )}
    </div>
  );
}

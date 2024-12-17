import React, { useState, useEffect } from "react";
import axios from "axios";
import AddTaskModal from "./AddTaskModal";
import { useAuth } from "./AuthProvider";
import TaskTable from "./table/task-table";

export default function MainInfo() {
  const { authState } = useAuth();

  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Fetch tasks from API
  const fetchTasksData = async () => {
    try {
      setLoading(true);

      const config = {
        headers: { Authorization: `Bearer ${authState.authToken}` }
      };
      const response = await axios.get("http://maco-coding.go.ro:8010/tasks/all", config);
      setTasks(response.data);
      console.log("Tasks from API:", tasks);

    } catch (err) {
      console.error("Failed to fetch tasks:", err);
      setError("Failed to fetch tasks.");
    } finally {
      setLoading(false);
    }
  };

  const fetchRolesData = async () => {
    try {
      setLoading(true);

      const config = {
        headers: { Authorization: `Bearer ${authState.authToken}` }
      };
      const response = await axios.get("http://maco-coding.go.ro:8010/api/enum/roles", config);
      console.log(response.data);
    } catch (err) {
      console.error("Failed to fetch roles:", err);
      setError("Failed to fetch roles.");
    } finally {
      setLoading(false);
    }
  };

  const fetchTaskStatuses = async () => {
    try {
      setLoading(true);

      const config = {
        headers: { Authorization: `Bearer ${authState.authToken}` }
      };
      const response = await axios.get("http://maco-coding.go.ro:8010/api/enum/taskStatus", config);
      console.log("statuses: " + response.data);
    } catch (err) {
      console.error("Failed to fetch task statuses:", err);
      setError("Failed to fetch task statuses.");
    } finally {
      setLoading(false);
  };
}
  

  useEffect(() => {
    fetchTasksData();
    fetchTaskStatuses();
  }, []);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleAddTask = async (newTask) => {
    try {
      const response = await axios.post("http://maco-coding.go.ro:8010/tasks/create", newTask);
      console.log("Task added successfully:", response.data);
      fetchTasksData(); // Refresh task list
      toggleModal(); // Close modal
    } catch (err) {
      console.error("Failed to add task:", err);
    }
  };

  const transformedTasks = tasks.map((task) => ({ ...task.taskDTO }));


  return (
    <div className="bg-gradient-to-b from-gray-950 via-gray-950 to-pink-950 h-full  p-4">
      <h2 className="text-5xl font-bold m-10 text-left ml-7 text-white" onClick={()=>{
        console.log(authState.authToken);
        fetchRolesData();
      }}>TASKS</h2>
      {loading ? (
        <p className="text-white text-center">Loading tasks...</p>
      ) : error ? (
        <p className="text-red-500 text-center">{error}</p>
      ) : (
        <div className="space-y-4">
          <TaskTable tasks={transformedTasks} loading={loading} error={error} />
        </div>
      )}

      {/* "+" Button */}
      <button
        onClick={toggleModal}
        className="fixed bottom-4 right-4 bg-black text-white rounded-full h-12 w-12 flex items-center justify-center shadow-lg hover:shadow-2xl transform hover:scale-105 transition duration-300"
      >
        +
      </button>

      {/* Modal */}
      {isModalOpen && (
        <AddTaskModal onSubmit={handleAddTask} onClose={toggleModal} />
      )}
    </div>
  );
}

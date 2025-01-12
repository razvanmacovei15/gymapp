import React, { useState, useEffect } from "react";
import axios from "axios";
import AddTaskModal from "./AddTaskModal";
import { useAuth } from "./AuthProvider";
import TaskTable from "./table/task-table";
import { useSidebar } from "./ui/sidebar"; // Import the Sidebar context
import { usePopup } from "./popups/PopupContext";

export default function Tasks() {
  const { authState } = useAuth();
  const { open } = useSidebar(); // Get the sidebar state (expanded or collapsed)

  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { openedTask } = usePopup();

  // Fetch tasks from API
  const fetchTasksData = async () => {
    try {
      setLoading(true);

      const config = {
        headers: { Authorization: `Bearer ${authState.authToken}` },
      };
      const response = await axios.get(
        "http://maco-coding.go.ro:8010/tasks/all",
        config
      );
      setTasks(response.data);
    } catch (err) {
      console.error("Failed to fetch tasks:", err);
      setError("Failed to fetch tasks.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasksData();
  }, []);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleAddTask = async (newTask) => {
    try {
      const response = await axios.post(
        "http://maco-coding.go.ro:8010/tasks/create",
        newTask
      );
      fetchTasksData(); // Refresh task list
      toggleModal(); // Close modal
    } catch (err) {
      console.error("Failed to add task:", err);
    }
  };

  return (
    <div
      className="bg-gradient-to-b from-gray-950 via-gray-950 to-pink-950 h-full transition-all duration-300"
      style={{
        marginLeft: open ? "16rem" : "3rem", // Adjust margin for sidebar state
        width: `calc(100% - ${open ? "16rem" : "3rem"})`, // Dynamically calculate width
      }}
    >
      <h2
        className="text-5xl font-bold m-10 text-left ml-7 text-white"
        onClick={fetchTasksData}
      >
        TASKS
      </h2>
  
      {loading ? (
        <p className="text-white text-center">Loading tasks...</p>
      ) : error ? (
        <p className="text-red-500 text-center">{error}</p>
      ) : (
        <div className="space-y-4">
          <TaskTable
            tasks={tasks}
            loading={loading}
            error={error}
            fetchTasksData={fetchTasksData}
          />
        </div>
      )}
  
      <button
        onClick={toggleModal}
        className="fixed bottom-4 right-4 bg-black text-white rounded-full h-12 w-12 flex items-center justify-center shadow-lg hover:shadow-2xl transform hover:scale-105 transition duration-300"
      >
        +
      </button>
  
      {isModalOpen && (
        <AddTaskModal onSubmit={handleAddTask} onClose={toggleModal} />
      )}
    </div>
  );
  
}

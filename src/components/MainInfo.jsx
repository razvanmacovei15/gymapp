// src/components/MainInfo.jsx

import React, { useState, useEffect } from "react";
import axios from "axios";
import Multiselect from "multiselect-react-dropdown";
import Task from "./Task";

export default function MainInfo() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    category: "",
    priority: "",
    subcategory: "",
    deadline: "",
    gyms: [],
    users: [],
  });

  // Fetch tasks from API
  const fetchTasksData = async () => {
    try {
      setLoading(true);
      const response = await axios.get("http://maco-coding.go.ro:8010/tasks/all");
      setTasks(response.data);
    } catch (err) {
      console.error("Failed to fetch tasks:", err);
      setError("Failed to fetch tasks.");
    } finally {
      setLoading(false);
    }
  };

  // Handle form input changes for new task
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewTask({ ...newTask, [name]: value });
  };

  // Handle Multiselect changes
  const handleMultiSelectChange = (selectedList, name) => {
    setNewTask({ ...newTask, [name]: selectedList });
  };

  // Handle task submission
  const handleTaskSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://maco-coding.go.ro:8010/tasks", newTask);
      console.log("Task added successfully:", response.data);
      fetchTasksData();
      setIsModalOpen(false);
      setNewTask({ title: "", description: "", category: "", priority: "", subcategory: "", deadline: "", gyms: [], users: [] });
    } catch (err) {
      console.error("Failed to add task:", err);
    }
  };

  useEffect(() => {
    fetchTasksData();
  }, []);

  const categories = ["Echipament", "Curatenie", "Reparatii"];
  const priorities = ["Urgent", "Low"];
  const subcategories = ["Toaleta", "Aparate", "Vestiar", "Sala"];
  const gyms = ["Gym A", "Gym B", "Gym C"];
  const users = ["Mihai", "Andrei", "Cristi"];

  return (
    <div className="bg-[#455271] h-full rounded-xl m-1 p-4">
      <h2 className="text-5xl font-bold m-10 text-left ml-7">TASKS</h2>

      {/* Add Task Button */}
      <button
        onClick={() => setIsModalOpen(true)}
        className="bg-blue-500 text-white px-4 py-2 rounded-full fixed bottom-10 right-10"
      >
        +
      </button>

      {/* Modal for Adding Task */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg w-1/2">
            <h3 className="text-xl font-bold mb-4">Add New Task</h3>
            <form onSubmit={handleTaskSubmit}>
              <div className="mb-4">
                <label className="block text-sm font-medium">Title *</label>
                <input
                  type="text"
                  name="title"
                  value={newTask.title}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded"
                  placeholder="Enter task title..."
                  required
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium">Description *</label>
                <textarea
                  name="description"
                  value={newTask.description}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded"
                  placeholder="Enter task description..."
                  required
                ></textarea>
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium">Category</label>
                <select
                  name="category"
                  value={newTask.category}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded"
                >
                  <option value="">Select Category</option>
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium">Priority</label>
                <select
                  name="priority"
                  value={newTask.priority}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded"
                >
                  <option value="">Select Priority</option>
                  {priorities.map((priority) => (
                    <option key={priority} value={priority}>
                      {priority}
                    </option>
                  ))}
                </select>
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium">Subcategory</label>
                <select
                  name="subcategory"
                  value={newTask.subcategory}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded"
                >
                  <option value="">Select Subcategory</option>
                  {subcategories.map((subcategory) => (
                    <option key={subcategory} value={subcategory}>
                      {subcategory}
                    </option>
                  ))}
                </select>
              </div>

              {/* Multiselect for Gyms */}
              <div className="mb-4">
                <label className="block text-sm font-medium">Gyms</label>
                <Multiselect
                  options={gyms}
                  selectedValues={newTask.gyms}
                  onSelect={(selectedList) => handleMultiSelectChange(selectedList, "gyms")}
                  onRemove={(selectedList) => handleMultiSelectChange(selectedList, "gyms")}
                  isObject={false}
                />
              </div>

              {/* Multiselect for Users */}
              <div className="mb-4">
                <label className="block text-sm font-medium">Users</label>
                <Multiselect
                  options={users}
                  selectedValues={newTask.users}
                  onSelect={(selectedList) => handleMultiSelectChange(selectedList, "users")}
                  onRemove={(selectedList) => handleMultiSelectChange(selectedList, "users")}
                  isObject={false}
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium">Deadline</label>
                <input
                  type="date"
                  name="deadline"
                  value={newTask.deadline}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded"
                />
              </div>

              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="mr-4 px-4 py-2 bg-gray-500 text-white rounded"
                >
                  Cancel
                </button>
                <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded">
                  Add Task
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

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
            <p className="text-white text-center">No tasks available</p>
          )}
        </div>
      )}
    </div>
  );
}

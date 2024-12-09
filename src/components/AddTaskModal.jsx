// src/components/AddTaskModal.jsx

import React, { useState } from "react";
import Multiselect from "multiselect-react-dropdown";

export default function AddTaskModal({ onSubmit }) {
  const [isOpen, setIsOpen] = useState(false); // Modal visibility state
  const [formData, setFormData] = useState({
    category: "",
    title: "",
    description: "",
    deadline: "",
    priority: "",
    subcategory: "",
    gyms: "",
    users: [], // Multi-select users as an array
  });

  // Sample dropdown options
  const userOptions = [
    { name: "User1", id: 1 },
    { name: "User2", id: 2 },
    { name: "User3", id: 3 },
    { name: "User4", id: 4 },
  ];

  const toggleModal = () => setIsOpen(!isOpen);

  // Handle input change for other fields
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle multi-select dropdown change
  const handleSelectUsers = (selectedList) => {
    setFormData({ ...formData, users: selectedList });
  };

  const handleRemoveUsers = (selectedList) => {
    setFormData({ ...formData, users: selectedList });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    const selectedUsers = formData.users.map((user) => user.name); // Extract only user names
    const finalData = { ...formData, users: selectedUsers }; // Pass formatted data
    onSubmit(finalData);
    setIsOpen(false); // Close modal after submission
  };

  return (
    <div>
      {/* "+" Button */}
      <button
        onClick={toggleModal}
        className="fixed bottom-4 right-4 bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-full h-12 w-12 flex items-center justify-center shadow-lg hover:shadow-2xl transform hover:scale-105 transition duration-300"
      >
        +
      </button>

      {/* Modal */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          onClick={toggleModal} // Close modal when clicking outside the content
        >
          <div
            className="bg-white rounded-lg p-8 w-11/12 max-w-lg shadow-lg transform transition-all"
            onClick={(e) => e.stopPropagation()} // Prevent click from closing modal
          >
            <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
              Add New Task
            </h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Category */}
              <div>
                <label className="block text-sm font-semibold text-gray-600 mb-2">
                  Category
                </label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  className="w-full p-3 border rounded-lg shadow-sm focus:ring focus:ring-blue-300"
                  required
                >
                  <option value="">Select Category</option>
                  <option value="Category1">Category1</option>
                  <option value="Category2">Category2</option>
                </select>
              </div>

              {/* Title */}
              <div>
                <label className="block text-sm font-semibold text-gray-600 mb-2">
                  Title *
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  className="w-full p-3 border rounded-lg shadow-sm focus:ring focus:ring-blue-300"
                  placeholder="Enter task title..."
                  required
                />
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-semibold text-gray-600 mb-2">
                  Description *
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  className="w-full p-3 border rounded-lg shadow-sm focus:ring focus:ring-blue-300"
                  placeholder="Enter task description..."
                  required
                ></textarea>
              </div>

              {/* Users */}
              <div>
                <label className="block text-sm font-semibold text-gray-600 mb-2">
                  Users
                </label>
                <Multiselect
                  options={userOptions} // Options to display in the dropdown
                  selectedValues={formData.users} // Preselected value to persist in dropdown
                  onSelect={handleSelectUsers} // Function will trigger on select event
                  onRemove={handleRemoveUsers} // Function will trigger on remove event
                  displayValue="name" // Property name to display in the dropdown
                  placeholder="Select Users"
                  className="w-full border rounded-lg shadow-sm"
                />
              </div>

              {/* Deadline */}
              <div>
                <label className="block text-sm font-semibold text-gray-600 mb-2">
                  Deadline
                </label>
                <input
                  type="date"
                  name="deadline"
                  value={formData.deadline}
                  onChange={handleInputChange}
                  className="w-full p-3 border rounded-lg shadow-sm focus:ring focus:ring-blue-300"
                  required
                />
              </div>

              {/* Priority */}
              <div>
                <label className="block text-sm font-semibold text-gray-600 mb-2">
                  Priority
                </label>
                <select
                  name="priority"
                  value={formData.priority}
                  onChange={handleInputChange}
                  className="w-full p-3 border rounded-lg shadow-sm focus:ring focus:ring-blue-300"
                >
                  <option value="">Select Priority</option>
                  <option value="Urgent">Urgent</option>
                  <option value="Low">Low</option>
                </select>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white py-3 px-4 rounded-lg w-full hover:shadow-xl transform hover:scale-105 transition duration-300"
              >
                Add Task
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

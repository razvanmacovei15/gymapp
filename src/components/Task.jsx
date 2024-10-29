// src/components/Task.jsx

import { useState } from "react";
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";
import { CiCircleCheck } from "react-icons/ci";

// Display task details with optional subcategory and deadline
export default function Task({ title, creator, category, description, photos, subcategory, priority, assigned, deadline }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isStatusMenuOpen, setIsStatusMenuOpen] = useState(false);
  const [status, setStatus] = useState("Not Started");

  // Toggle the collapsible section
  const toggleExpand = () => setIsExpanded(!isExpanded);

  // Toggle the dropdown menu
  const toggleStatusMenu = () => setIsStatusMenuOpen(!isStatusMenuOpen);

  // Set task status
  const handleStatusChange = (newStatus) => {
    setStatus(newStatus);
    setIsStatusMenuOpen(false); // Close the dropdown after selection
  };

  return (
    <div className="bg-[#c8d4f0] p-4 rounded-xl shadow-md flex flex-col mb-4 ml-7 mr-7">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-lg font-semibold">{title}</h3>
          <p className="text-sm text-green-600">Created by: {creator}</p>
          <p className="text-sm text-gray-500">Category: {category}</p>
          {subcategory && <p className="text-sm text-gray-500">Subcategory: {subcategory}</p>}
          <p className={`text-sm ${priority === 'Urgent' ? 'text-red-600' : 'text-gray-500'}`}>Priority: {priority}</p>
          <p className="text-sm text-blue-500">Assigned to: {assigned}</p>
          {deadline && <p className="text-sm text-red-600">Deadline: {deadline}</p>}
          <div onClick={toggleExpand} className="cursor-pointer text-gray-500 hover:text-gray-700 mt-2">
            {isExpanded ? <MdKeyboardArrowUp size={24} /> : <MdKeyboardArrowDown size={24} />}
          </div>
        </div>
        
        {/* Status dropdown */}
        <div className="relative">
          <div onClick={toggleStatusMenu} className="cursor-pointer">
            <CiCircleCheck size={24} className={`text-3xl ${status === 'Done' ? 'text-green-500' : status === 'In Progress' ? 'text-yellow-600' : 'text-gray-500'}`} />
          </div>

          {isStatusMenuOpen && (
            <div className="absolute right-0 mt-2 w-32 bg-white border border-gray-300 rounded-lg shadow-lg z-10">
              <button
                onClick={() => handleStatusChange("Done")}
                className="block w-full text-left px-4 py-2 text-sm text-green-600 hover:bg-gray-100"
              >
                Done
              </button>
              <button
                onClick={() => handleStatusChange("In Progress")}
                className="block w-full text-left px-4 py-2 text-sm text-yellow-600 hover:bg-gray-100"
              >
                In Progress
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Collapsible section for description and photos */}
      {isExpanded && (
        <div className="mt-4">
          <p className="text-sm text-gray-700 mb-2">{description}</p>
          <div className="flex gap-2">
            {photos && photos.length > 0 ? (
              photos.map((photo, index) => (
                <img
                  key={index}
                  src={photo}
                  alt={`Task photo ${index + 1}`}
                  className="w-24 h-24 object-cover rounded-md"
                />
              ))
            ) : (
              <p className="text-sm text-gray-500">No photos provided</p>
            )}
          </div>
        </div>
      )}

      {/* Display selected status */}
      <div className="mt-2 text-sm text-gray-700">
        <p>Status: {status}</p>
      </div>
    </div>
  );
}

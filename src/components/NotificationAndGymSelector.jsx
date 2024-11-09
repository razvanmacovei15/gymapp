/* import React, { useState } from "react";
import { Dropdown } from 'rsuite';
import { FaBell } from "react-icons/fa";
import { CgGym } from "react-icons/cg";

// Component to display notification icon and dropdown selector for locations
export default function NotificationAndGymSelector({ locations, onLocationChange }) {
  const [selectedLocation, setSelectedLocation] = useState(locations[0]);

  const handleLocationChange = (newLocation) => {
    setSelectedLocation(newLocation);
    onLocationChange(newLocation);
  };

  return (
    <div className="flex items-center gap-4">
      <FaBell size={24} className="cursor-pointer" />

      <Dropdown title={selectedLocation} icon={<CgGym />} placement="bottomStart"> 
        {locations.map((location) => (
          <Dropdown.Item 
            key={location} 
            icon={<CgGym />} 
            onClick={() => handleLocationChange(location)}
          >
            {location}
          </Dropdown.Item>
        ))}
      </Dropdown>
    </div>
  );
} 
 */


import React, { useState } from "react";
import { FaBell } from "react-icons/fa"; 

export default function NotificationAndGymSelector({ locations, onLocationChange }) {
  const [selectedLocation, setSelectedLocation] = useState(locations[0]);

  const handleLocationChange = (event) => {
    const newLocation = event.target.value;
    setSelectedLocation(newLocation);
    onLocationChange(newLocation);
  };

  return (
    <div className="flex items-center gap-4">
      <FaBell size={24} className="cursor-pointer" />
      <select
        value={selectedLocation}
        onChange={handleLocationChange}
        className="bg-transparent border-none cursor-pointer font-semibold"
      >
        {locations.map((location) => (
          <option key={location} value={location}>
            {location}
          </option>
        ))}
      </select>
    </div>
  );
}

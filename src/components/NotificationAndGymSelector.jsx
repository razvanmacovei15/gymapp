import React, { useState } from "react";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { MdKeyboardArrowDown } from "react-icons/md";
import { FaBell } from "react-icons/fa";

export default function NotificationAndGymSelector({ locations, onLocationChange }) {
  const [selectedLocation, setSelectedLocation] = useState(locations[0]);

  const handleLocationChange = (newLocation) => {
    setSelectedLocation(newLocation);
    onLocationChange(newLocation);
  };

  return (
    <div className="flex items-center gap-4">
      <FaBell size={24} className="cursor-pointer text-white" />

      <Menu as="div" className="relative inline-block text-left">
        <div>
          <MenuButton className="inline-flex justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-950 shadow-sm ring-1 ring-inset ring-gray-600 hover:bg-gray-300">
            {selectedLocation}
            <MdKeyboardArrowDown aria-hidden="true" className="-mr-1 h-5 w-5 text-gray-950" />
          </MenuButton>
        </div>

        <MenuItems
          className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
        >
          <div className="py-1">
            {locations.map((location) => (
              <MenuItem key={location}>
                {({ active }) => (
                  <button
                    onClick={() => handleLocationChange(location)}
                    className={`${
                      active ? 'bg-gray-100 text-gray-900' : 'text-gray-950'
                    } block w-full px-4 py-2 text-left text-sm`}
                  >
                    {location}
                  </button>
                )}
              </MenuItem>
            ))}
          </div>
        </MenuItems>
      </Menu>
    </div>
  );
}

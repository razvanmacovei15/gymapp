import React from "react";
import { IoMenuOutline } from "react-icons/io5";

export default function HeaderMenu({ toggleSidebar }) {
  return (
    <div className="flex items-center">
      <IoMenuOutline
        size={30}
        className="cursor-pointer"
        onClick={toggleSidebar} // Call the toggle function
      />
      <h2 className="font-semibold text-2xl ml-1">Welcome back!</h2>
    </div>
  );
}

import React from "react";
import { IoMenuOutline } from "react-icons/io5";

export default function HeaderMenu({ toggleSidebar }) {
  return (
    <div className="flex items-center ">
      <IoMenuOutline
        size={30}
        className="cursor-pointer"
        onClick={toggleSidebar} // Call the toggle function
        color="white"
      />
      <h2 className="font-normal text-2xl ml-1 text-white">Welcome back!</h2>
    </div>
  );
}

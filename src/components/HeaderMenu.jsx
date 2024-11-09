
import React from "react";
import { IoMenuOutline } from "react-icons/io5";

export default function HeaderMenu() {
    return (
    <div className="flex items-center ">
      <IoMenuOutline size={30} className="cursor-pointer"/>
      <h2 className="font-semibold text-2xl ml-1">Welcome back!</h2>
    </div>
  ); 
  
}

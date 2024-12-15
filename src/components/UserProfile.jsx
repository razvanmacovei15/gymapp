
import React from "react";
import { CgProfile } from "react-icons/cg";

export default function UserProfile({ username }) {
  return (
    <div className="flex items-center gap-2">
      <CgProfile size={24} className="cursor-pointer text-white" />
      <span className="font-normal text-white">{username}</span>
    </div>
  );
}

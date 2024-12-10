import MainInfo from "./MainInfo";
import TopBar from "./TopBar";
import Sidebar from "./Sidebar";
import { useState } from "react";

export default function MainView() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Toggle Sidebar visibility
  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  return (
    <div className="flex grow h-full">
      {/* Sidebar */}
      <Sidebar isOpen={isSidebarOpen} />

      {/* Main Content */}
      <div
        className={`flex flex-col grow transition-all duration-300 ${
          isSidebarOpen ? "ml-[250px]" : "ml-0"
        }`}
      >
        <TopBar toggleSidebar={toggleSidebar} /> {/* Pass toggle function to TopBar */}
        <MainInfo />
      </div>
    </div>
  );
}

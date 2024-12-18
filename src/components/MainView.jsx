import MainInfo from "./MainInfo";
import TopBar from "./TopBar";

import { AppSidebar } from "./side-bar/app-sidebar"
import { SidebarProvider } from "./ui/sidebar"; // Import SidebarProvider

import { useState } from "react";

export default function MainView() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  // Toggle Sidebar visibility
  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  return (
    <SidebarProvider defaultOpen={isSidebarOpen}>
      <div className="flex grow h-full">
        {/* AppSidebar */}
        <AppSidebar />

        {/* Main Content */}
        <div
          className={`flex flex-col grow transition-all duration-300 `}
        >
          <TopBar toggleSidebar={toggleSidebar} /> {/* Pass toggle function to TopBar */}
          <MainInfo />
        </div>
      </div>
    </SidebarProvider>
  );
}

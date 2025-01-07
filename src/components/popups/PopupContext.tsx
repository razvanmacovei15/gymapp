import React, { createContext, useContext, useState, ReactNode } from "react";
import { Task } from "../types/Task";

// Define the context type
interface PopupContextType {
  isProfileMenuOpen: boolean;
  isTaskViewOpen: boolean;
  openedTask: Task | null; // Track the currently open task ID
  toggleProfileMenu: () => void;
  toggleTaskView: (task: Task) => void; // Accept a task ID
  closeAllPopups: () => void;
}

// Create the context
const PopupContext = createContext<PopupContextType | undefined>(undefined);

// Create a provider component
export const PopupProvider = ({ children }: { children: ReactNode }) => {
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const toggleProfileMenu = () => setIsProfileMenuOpen((prev) => !prev);

  const [isTaskViewOpen, setIsTaskViewOpen] = useState(false);
  const [task, setTask] = useState<Task | null>(null);

  const toggleTaskView = (toggledTask: Task) => {
    if (task === toggledTask && isTaskViewOpen) {
      // If the same task is already open, close it
      setIsTaskViewOpen(false);
      setTask(null);
    } else {
      // Open a new task or toggle to a different one
      setIsTaskViewOpen(true);
      setTask(toggledTask);
    }
  };

  const closeAllPopups = () => {
    setIsProfileMenuOpen(false);
    setIsTaskViewOpen(false);
    setTask(null);
  };

  return (
    <PopupContext.Provider
      value={{
        isProfileMenuOpen,
        isTaskViewOpen,
        openedTask: task,
        toggleProfileMenu,
        toggleTaskView,
        closeAllPopups,
      }}
    >
      {children}
    </PopupContext.Provider>
  );
};

// Custom hook to access the popup context
export const usePopup = () => {
  const context = useContext(PopupContext);
  if (!context) {
    throw new Error("usePopup must be used within a PopupProvider");
  }
  return context;
};

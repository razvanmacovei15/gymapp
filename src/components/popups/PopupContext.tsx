import React, { createContext, useContext, useState, ReactNode } from "react";

// Define the context type
interface PopupContextType {
  isProfileMenuOpen: boolean;
  isTaskViewOpen: boolean;
  toggleProfileMenu: () => void;
  toggleTaskView: () => void;
  closeAllPopups: () => void;
}

// Create the context
const PopupContext = createContext<PopupContextType | undefined>(undefined);

// Create a provider component
export const PopupProvider = ({ children }: { children: ReactNode }) => {
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [isTaskViewOpen, setIsTaskViewOpen] = useState(false);

  const toggleProfileMenu = () => setIsProfileMenuOpen((prev) => !prev);
  const toggleTaskView = () => setIsTaskViewOpen((prev) => !prev);
  const closeAllPopups = () => {
    setIsProfileMenuOpen(false);
    setIsTaskViewOpen(false);
  };

  return (
    <PopupContext.Provider
      value={{
        isProfileMenuOpen,
        isTaskViewOpen,
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

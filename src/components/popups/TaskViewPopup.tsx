import React from "react";
import { usePopup } from "./PopupContext";

const TaskViewPopup = () => {
  const { isTaskViewOpen, toggleTaskView } = usePopup();

  if (!isTaskViewOpen) return null;

  return (
    <div
      style={{
        position: "fixed",
        top: "30%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        backgroundColor: "white",
        border: "1px solid #ccc",
        borderRadius: "5px",
        padding: "20px",
        zIndex: 1000,
      }}
    >
      <p>This is Popup 2</p>

      <button onClick={toggleTaskView}>Close</button>
    </div>
  );
};

export default TaskViewPopup;

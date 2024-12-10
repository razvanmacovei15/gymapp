import React, { useState } from "react";
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";
import "./SidebarMenu.css"; // CSS file for styling

import { useAuth } from "./AuthProvider";

const menuData = [
  { title: "Dashboard", path: "/" },
  {
    title: "Tasks",
    subcategories: [
      "Cleaning",
      "Equipment Maintenance",
      "General Maintenance",
      "Front Desk",
      "Future Events",
    ],
  },
  { title: "Schedule", path: "/schedule" },
  { title: "Stock", path: "/stock" },
  { title: "Equipment", path: "/equipment" },
  { title: "Subscriptions", path: "/subscriptions" },
];

export default function SidebarMenu() {
  const { handleLogout } = useAuth();

  const [expandedCategories, setExpandedCategories] = useState({});

  const toggleCategory = (title) => {
    setExpandedCategories((prev) => ({
      ...prev,
      [title]: !prev[title],
    }));
  };

  return (
    <div className="sidebar-menu">
      <h2 className="sidebar-header">MYGYM</h2>

      <ul className="menu-list">
        {menuData.map((item) => (
          <li key={item.title} className="menu-item">
            <div className="menu-title">
              <span>{item.title}</span>
              {item.subcategories ? (
                <span onClick={() => toggleCategory(item.title)} className="expand-icon">
                  {expandedCategories[item.title] ? <MdKeyboardArrowDown /> : <MdKeyboardArrowUp />}
                </span>
              ) : null}
            </div>

            {item.subcategories && expandedCategories[item.title] && (
              <ul className="submenu-list">
                {item.subcategories.map((subcategory) => (
                  <li key={subcategory} className="submenu-item">
                    {subcategory}
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>

      <div className="logout">
        <button onClick={handleLogout} className="logout-button">Log out</button>
      </div>
    </div>
  );
}

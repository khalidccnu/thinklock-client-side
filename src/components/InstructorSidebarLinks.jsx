import React from "react";
import { NavLink } from "react-router-dom";

const InstructorSidebarLinks = () => {
  return (
    <>
      <li>
        <NavLink
          to="/new-course"
          className={({ isActive }) =>
            "block px-2 py-1 rounded transition-colors duration-500 " +
            (isActive
              ? "bg-pink-600 text-white"
              : "hover:bg-pink-600 hover:text-white")
          }
        >
          New Course
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/my-course"
          className={({ isActive }) =>
            "block px-2 py-1 rounded transition-colors duration-500 " +
            (isActive
              ? "bg-pink-600 text-white"
              : "hover:bg-pink-600 hover:text-white")
          }
        >
          My Course
        </NavLink>
      </li>
    </>
  );
};

export default InstructorSidebarLinks;

import React from "react";
import { NavLink } from "react-router-dom";

const AdminSidebarLinks = () => {
  return (
    <>
      <li>
        <NavLink
          to="/manage-course"
          className={({ isActive }) =>
            "block px-2 py-1 rounded transition-colors duration-500 " +
            (isActive
              ? "bg-pink-600 text-white"
              : "hover:bg-pink-600 hover:text-white")
          }
        >
          Manage Course
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/manage-user"
          className={({ isActive }) =>
            "block px-2 py-1 rounded transition-colors duration-500 " +
            (isActive
              ? "bg-pink-600 text-white"
              : "hover:bg-pink-600 hover:text-white")
          }
        >
          Manage User
        </NavLink>
      </li>
    </>
  );
};

export default AdminSidebarLinks;

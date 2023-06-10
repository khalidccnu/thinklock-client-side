import React from "react";
import { NavLink } from "react-router-dom";

const StudentSidebarLinks = () => {
  return (
    <>
      <li>
        <NavLink
          to="booked-course"
          className={({ isActive }) =>
            "block px-2 py-1 rounded transition-colors duration-500 " +
            (isActive
              ? "bg-pink-600 text-white"
              : "hover:bg-pink-600 hover:text-white")
          }
        >
          Booked Course
        </NavLink>
      </li>
      <li>
        <NavLink
          to="enrolled-course"
          className={({ isActive }) =>
            "block px-2 py-1 rounded transition-colors duration-500 " +
            (isActive
              ? "bg-pink-600 text-white"
              : "hover:bg-pink-600 hover:text-white")
          }
        >
          Enrolled Course
        </NavLink>
      </li>
      <li>
        <NavLink
          to="payment-history"
          className={({ isActive }) =>
            "block px-2 py-1 rounded transition-colors duration-500 " +
            (isActive
              ? "bg-pink-600 text-white"
              : "hover:bg-pink-600 hover:text-white")
          }
        >
          Payment History
        </NavLink>
      </li>
    </>
  );
};

export default StudentSidebarLinks;

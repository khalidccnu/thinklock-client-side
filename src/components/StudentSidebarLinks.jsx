import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth.js";

const StudentSidebarLinks = () => {
  const { logOut } = useAuth();
  const navigate = useNavigate();

  const handleLogout = (_) =>
    logOut()
      .then((_) => sessionStorage.removeItem("_vu"))
      .then((_) => navigate("/login"));

  return (
    <>
      <li>
        <NavLink
          to="/booked-course"
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
          to="/enrolled-course"
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
          to="/payment-history"
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
      <li>
        <span
          className="block px-2 py-1 rounded hover:bg-pink-600 hover:text-white cursor-pointer transition-colors duration-500"
          onClick={handleLogout}
        >
          Logout
        </span>
      </li>
    </>
  );
};

export default StudentSidebarLinks;

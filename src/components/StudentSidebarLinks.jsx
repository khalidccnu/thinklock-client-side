import React from "react";
import { NavLink } from "react-router-dom";
import { BsBookmarkFill, BsBookmarkStarFill } from "react-icons/bs";
import { FaHistory } from "react-icons/fa";

const StudentSidebarLinks = () => {
  return (
    <>
      <li>
        <NavLink
          to="booked-course"
          className={({ isActive }) =>
            "flex px-2 py-1 leading-5 gap-1 rounded transition-colors duration-500 " +
            (isActive
              ? "bg-pink-600 text-white"
              : "hover:bg-pink-600 hover:text-white")
          }
        >
          <BsBookmarkStarFill />
          <span>Booked Course</span>
        </NavLink>
      </li>
      <li>
        <NavLink
          to="enrolled-course"
          className={({ isActive }) =>
            "flex px-2 py-1 leading-5 gap-1 rounded transition-colors duration-500 " +
            (isActive
              ? "bg-pink-600 text-white"
              : "hover:bg-pink-600 hover:text-white")
          }
        >
          <BsBookmarkFill />
          <span>Enrolled Course</span>
        </NavLink>
      </li>
      <li>
        <NavLink
          to="payment-history"
          className={({ isActive }) =>
            "flex px-2 py-1 leading-5 gap-1 rounded transition-colors duration-500 " +
            (isActive
              ? "bg-pink-600 text-white"
              : "hover:bg-pink-600 hover:text-white")
          }
        >
          <FaHistory />
          <span>Payment History</span>
        </NavLink>
      </li>
    </>
  );
};

export default StudentSidebarLinks;

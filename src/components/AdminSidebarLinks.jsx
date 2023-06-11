import React from "react";
import { NavLink } from "react-router-dom";
import { AiOutlineUser } from "react-icons/ai";
import { MdOutlineTaskAlt } from "react-icons/md";

const AdminSidebarLinks = () => {
  return (
    <>
      <li>
        <NavLink
          to="manage-course"
          className={({ isActive }) =>
            "flex px-2 py-1 leading-5 gap-1 rounded transition-colors duration-500 " +
            (isActive
              ? "bg-pink-600 text-white"
              : "hover:bg-pink-600 hover:text-white")
          }
        >
          <MdOutlineTaskAlt />
          <span>Manage Course</span>
        </NavLink>
      </li>
      <li>
        <NavLink
          to="manage-user"
          className={({ isActive }) =>
            "flex px-2 py-1 leading-5 gap-1 rounded transition-colors duration-500 " +
            (isActive
              ? "bg-pink-600 text-white"
              : "hover:bg-pink-600 hover:text-white")
          }
        >
          <AiOutlineUser />
          <span>Manage User</span>
        </NavLink>
      </li>
    </>
  );
};

export default AdminSidebarLinks;

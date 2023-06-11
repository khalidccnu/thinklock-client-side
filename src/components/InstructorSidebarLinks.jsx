import React from "react";
import { NavLink } from "react-router-dom";
import { MdOutlineAddTask, MdOutlineTaskAlt } from "react-icons/md";

const InstructorSidebarLinks = () => {
  return (
    <>
      <li>
        <NavLink
          to="new-course"
          className={({ isActive }) =>
            "flex px-2 py-1 leading-5 gap-1 rounded transition-colors duration-500 " +
            (isActive
              ? "bg-pink-600 text-white"
              : "hover:bg-pink-600 hover:text-white")
          }
        >
          <MdOutlineAddTask />
          <span>New Course</span>
        </NavLink>
      </li>
      <li>
        <NavLink
          to="my-course"
          className={({ isActive }) =>
            "flex px-2 py-1 leading-5 gap-1 rounded transition-colors duration-500 " +
            (isActive
              ? "bg-pink-600 text-white"
              : "hover:bg-pink-600 hover:text-white")
          }
        >
          <MdOutlineTaskAlt />
          <span>My Course</span>
        </NavLink>
      </li>
    </>
  );
};

export default InstructorSidebarLinks;

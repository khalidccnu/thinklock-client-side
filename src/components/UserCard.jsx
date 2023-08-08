import React from "react";
import { useNavigate } from "react-router-dom";
import { FaChalkboardTeacher, FaEnvelope, FaRegUser } from "react-icons/fa";
import { GrUserSettings } from "react-icons/gr";

const UserCard = ({ setActionUser, setURMOpen, user }) => {
  const navigate = useNavigate();
  const { _id: id, name, email, role, photo } = user;

  const handleRole = (id, name, role) => {
    setActionUser({ id, name, role });
    setURMOpen(true);
  };

  return (
    <div className="grid grid-cols-1 gap-y-4">
      <div className="relative bg-white bg-cover h-52 rounded-lg before:content-[''] before:absolute before:bottom-0 before:left-1/2 before:w-5 before:h-5 before:bg-transparent before:rounded-full before:shadow-[-10px_10px_0_#faf7f5] after:content-[''] after:absolute after:bottom-16 after:left-0 after:w-5 after:h-5 after:bg-transparent after:rounded-full after:shadow-[-10px_10px_0_#faf7f5]">
        <figure className="w-48 h-24 mx-auto mt-6 rounded-lg overflow-hidden">
          <img src={photo} alt="" className="w-full h-full" />
        </figure>
      </div>
      <div className="relative bg-white min-h-[10rem] rounded-lg rounded-tl-none">
        <span className="absolute -top-20 bg-white w-1/2 h-20 border-solid border-t-[1rem] border-t-[#faf7f5] border-r-[1rem] border-r-[#faf7f5] rounded-tr-[3.5rem] before:content-[''] before:absolute before:bg-transparent before:w-5 before:h-5 before:rounded-full before:shadow-[-12px_-10px_0_#faf7f5] after:content-[''] after:absolute after:-right-5 after:bottom-0 after:bg-transparent after:w-5 after:h-5 after:rounded-full after:shadow-[-10px_10px_0_#fff]"></span>
        <div className="flex flex-col items-start h-full p-5 pt-10">
          <h2 className="font-bold">{name}</h2>
          <span className="inline-flex mt-1 leading-[1.2rem] space-x-1">
            <FaEnvelope />
            <span>{email}</span>
          </span>
          <div className="flex justify-between items-center w-full mt-auto">
            <button
              className="btn btn-xs btn-outline px-5 py-2 rounded text-pink-600 border-pink-600 hover:bg-pink-600 hover:border-pink-600 transition-colors duration-500 normal-case"
              onClick={(_) => navigate("?id=" + id + "/course")}
            >
              View Course
            </button>
            <div className="join rounded">
              <button
                className={`title btn btn-sm ${
                  role === "student" ? "btn-disabled" : ""
                } join-item`}
                data-tooltip-content="Make Student"
                onClick={(_) => handleRole(id, name, "student")}
              >
                <FaRegUser />
              </button>
              <button
                className={`title btn btn-sm ${
                  role === "instructor" ? "btn-disabled" : ""
                } join-item`}
                data-tooltip-content="Make Instructor"
                onClick={(_) => handleRole(id, name, "instructor")}
              >
                <FaChalkboardTeacher />
              </button>
              <button
                className={`title btn btn-sm ${
                  role === "admin" ? "btn-disabled" : ""
                } join-item`}
                data-tooltip-content="Make Admin"
                onClick={(_) => handleRole(id, name, "admin")}
              >
                <GrUserSettings />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserCard;

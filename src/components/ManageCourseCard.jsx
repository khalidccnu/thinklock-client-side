import React from "react";
import { useQuery } from "@tanstack/react-query";
import { BiDollarCircle } from "react-icons/bi";
import { FaEdit, FaEnvelope, FaUser } from "react-icons/fa";
import { GrStatusInfo } from "react-icons/gr";
import useAxiosSecure from "../hooks/useAxiosSecure.js";

const ManageCourseCard = ({ handleApprove, handleDeny, course }) => {
  const { _id: id, instructor_id, name, price, seat, status, image } = course;
  const axiosSecure = useAxiosSecure();

  const { data: instructor } = useQuery({
    queryKey: [id, "instructor.data"],
    queryFn: (_) => axiosSecure(`/admin/instructors/${instructor_id}`),
  });

  return (
    <div className="grid grid-cols-1 gap-y-4">
      <div
        className="relative bg-white bg-cover h-52 rounded-lg before:content-[''] before:absolute before:bottom-0 before:left-1/2 before:w-5 before:h-5 before:bg-transparent before:rounded-full before:shadow-[-10px_10px_0_#faf7f5] after:content-[''] after:absolute after:bottom-16 after:left-0 after:w-5 after:h-5 after:bg-transparent after:rounded-full after:shadow-[-10px_10px_0_#faf7f5]"
        style={{ backgroundImage: `url("${image}")` }}
      ></div>
      <div className="relative bg-white min-h-[10rem] rounded-lg rounded-tl-none">
        <span className="absolute -top-20 bg-white w-1/2 h-20 border-solid border-t-[1rem] border-t-[#faf7f5] border-r-[1rem] border-r-[#faf7f5] rounded-tr-[3.5rem] before:content-[''] before:absolute before:bg-transparent before:w-5 before:h-5 before:rounded-full before:shadow-[-12px_-10px_0_#faf7f5] after:content-[''] after:absolute after:-right-5 after:bottom-0 after:bg-transparent after:w-5 after:h-5 after:rounded-full after:shadow-[-10px_10px_0_#fff]">
          <span className="flex justify-center items-center h-full font-bold text-xs space-x-1">
            <GrStatusInfo />
            <span className="mt-1">{status.toUpperCase()}</span>
          </span>
        </span>
        <div className="p-5">
          <h2 className="font-bold">{name}</h2>
          <div className="flex justify-between mt-3">
            <span className="inline-flex leading-[1.2rem] space-x-1">
              <BiDollarCircle />
              <span>${price}</span>
            </span>
            <span className="inline-flex leading-[1.2rem] space-x-1">
              <FaUser />
              <span>{seat}</span>
            </span>
          </div>
          <div className="mt-5">
            <h5 className="inline-flex leading-[1.2rem] space-x-1">
              <FaEdit />
              <span>{instructor?.data.name}</span>
            </h5>
            <span className="inline-flex leading-[1.2rem] space-x-1">
              <FaEnvelope />
              <span>{instructor?.data.email}</span>
            </span>
          </div>
          <div className="join mt-5 rounded-lg">
            <button
              className={`btn btn-sm ${
                status === "approved" ? "btn-disabled" : ""
              } join-item`}
              onClick={(_) => handleApprove(id, name)}
            >
              Approve
            </button>
            <button
              className={`btn btn-sm ${
                status === "denied" ? "btn-disabled" : ""
              } join-item`}
              onClick={(_) => handleDeny(id, name)}
            >
              Deny
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageCourseCard;
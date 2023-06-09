import React from "react";
import { useNavigate } from "react-router-dom";
import { BiDollarCircle } from "react-icons/bi";
import { FaUser } from "react-icons/fa";
import { GrStatusInfo } from "react-icons/gr";

const Card = ({ course }) => {
  const navigate = useNavigate();
  const { _id: id, name, price, seat, status, image } = course;

  return (
    <div className="grid grid-cols-1 gap-y-4">
      <div
        className="relative bg-white bg-cover h-52 rounded-lg before:content-[''] before:absolute before:bottom-0 before:left-1/2 before:w-5 before:h-5 before:bg-transparent before:rounded-full before:shadow-[-10px_10px_0_#faf7f5] after:content-[''] after:absolute after:bottom-16 after:left-0 after:w-5 after:h-5 after:bg-transparent after:rounded-full after:shadow-[-10px_10px_0_#faf7f5]"
        style={{ backgroundImage: `url("${image}")` }}
      ></div>
      <div className="relative bg-white min-h-[10rem] rounded-lg rounded-tl-none">
        <span className="absolute -top-20 bg-white w-1/2 h-20 border-solid border-t-[1rem] border-t-[#faf7f5] border-r-[1rem] border-r-[#faf7f5] rounded-tr-[3.5rem] before:content-[''] before:absolute before:bg-transparent before:w-5 before:h-5 before:rounded-full before:shadow-[-12px_-10px_0_#faf7f5] after:content-[''] after:absolute after:-right-5 after:bottom-0 after:bg-transparent after:w-5 after:h-5 after:rounded-full after:shadow-[-10px_10px_0_#fff]">
          {status ? (
            <span className="flex justify-center items-center h-full font-bold text-xs space-x-1">
              <GrStatusInfo />
              <span className="mt-1">{status.toUpperCase()}</span>
            </span>
          ) : (
            <span className="flex justify-center items-center h-full">
              <button
                className="btn btn-xs btn-outline px-5 py-2 text-pink-600 border-pink-600 hover:bg-pink-600 hover:border-pink-600 transition-colors duration-500 normal-case"
                onClick={(_) => navigate("?view=" + id)}
              >
                View
              </button>
            </span>
          )}
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
        </div>
      </div>
    </div>
  );
};

export default Card;

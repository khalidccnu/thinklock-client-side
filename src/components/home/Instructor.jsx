import React from "react";
import { FaEnvelope } from "react-icons/fa";

const Instructor = ({ instructor }) => {
  const { email, name, photo } = instructor;

  return (
    <div>
      <figure className="w-48 h-48 mx-auto">
        <img
          src={photo}
          alt=""
          className="w-full h-full object-cover rounded-lg shadow-md"
        />
      </figure>
      <div className="relative -mt-12 -z-10">
        <div className="bg-white px-6 pt-20 pb-10 rounded-lg">
          <div className="flex flex-col">
            <h2 className="font-bold">{name}</h2>
            <span className="inline-flex mt-1 leading-[1.2rem] space-x-1">
              <FaEnvelope />
              <span>{email}</span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Instructor;

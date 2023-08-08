import React from "react";
import { FaEnvelope } from "react-icons/fa";

const Instructor = ({ instructor }) => {
  const { email, name, photo } = instructor;

  return (
    <div className="bg-white px-6 py-10 rounded-lg">
      <figure className={`w-32 h-32 rounded-full mx-auto overflow-hidden`}>
        <img src={photo} alt="" className={`w-full h-full`} />
      </figure>
      <div className="flex flex-col mt-5 text-center">
        <h2 className="font-bold">{name}</h2>
        <span className="inline-flex justify-center mt-1 leading-[1.2rem] space-x-1">
          <FaEnvelope />
          <span>{email}</span>
        </span>
      </div>
    </div>
  );
};

export default Instructor;

import React from "react";
import { FaEdit, FaUserPlus } from "react-icons/fa";
import { FiSettings } from "react-icons/fi";

const Highlight = () => {
  return (
    <section className="pt-16 overflow-hidden">
      <div className="container">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7 max-w-sm sm:max-w-none lg:max-w-4xl mx-auto text-white">
          <div
            className="bg-blue-maastricht px-12 py-8 rounded-lg"
            data-aos="fade-right"
            data-aos-duration="1500"
          >
            <div className="inline-flex justify-center items-center w-10 h-10 bg-white text-green-700 rounded-full">
              <FaUserPlus />
            </div>
            <h5 className="font-semibold mt-3">Expert Mentor</h5>
          </div>
          <div
            className="bg-blue-maastricht px-12 py-8 rounded-lg"
            data-aos="zoom-in"
            data-aos-duration="1500"
          >
            <div className="inline-flex justify-center items-center w-10 h-10 bg-white text-red-700 rounded-full">
              <FaEdit />
            </div>
            <h5 className="font-semibold mt-3">Best In Class Content</h5>
          </div>
          <div
            className="bg-blue-maastricht px-12 py-8 rounded-lg"
            data-aos="fade-left"
            data-aos-duration="1500"
          >
            <div className="inline-flex justify-center items-center w-10 h-10 bg-white text-yellow-700 rounded-full">
              <FiSettings />
            </div>
            <h5 className="font-semibold mt-3">Growth Potential</h5>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Highlight;

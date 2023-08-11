import React from "react";
import { BiCategoryAlt } from "react-icons/bi";

const Categories = () => {
  return (
    <section className={`bg-gray-100 py-16 overflow-x-hidden`}>
      <div className="container">
        <div className={`max-w-4xl mx-auto`}>
          <div className={`flex justify-center`}>
            <span className="badge badge-lg px-5 py-4 bg-pink-600 border-pink-600 text-white">
              Category
            </span>
          </div>
          <div
            className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-5`}
          >
            <div
              className={`bg-white px-6 py-10 rounded-lg`}
              data-aos="zoom-out-right"
            >
              <figure
                className={`flex justify-center items-center w-16 h-16 bg-orange-600 text-white text-2xl mx-auto rounded-full`}
              >
                <BiCategoryAlt />
              </figure>
              <h5 className={`font-bold text-center mt-2`}>Islamic Belief</h5>
            </div>
            <div
              className={`bg-white px-6 py-10 rounded-lg`}
              data-aos="zoom-out-up"
            >
              <figure
                className={`flex justify-center items-center w-16 h-16 bg-violet-600 text-white text-2xl mx-auto rounded-full`}
              >
                <BiCategoryAlt />
              </figure>
              <h5 className={`font-bold text-center mt-2`}>Fiqh</h5>
            </div>
            <div
              className={`bg-white px-6 py-10 rounded-lg`}
              data-aos="zoom-out-down"
            >
              <figure
                className={`flex justify-center items-center w-16 h-16 bg-emerald-600 text-white text-2xl mx-auto rounded-full`}
              >
                <BiCategoryAlt />
              </figure>
              <h5 className={`font-bold text-center mt-2`}>Arabic Language</h5>
            </div>
            <div
              className={`bg-white px-6 py-10 rounded-lg`}
              data-aos="zoom-out-left"
            >
              <figure
                className={`flex justify-center items-center w-16 h-16 bg-blue-600 text-white text-2xl mx-auto rounded-full`}
              >
                <BiCategoryAlt />
              </figure>
              <h5 className={`font-bold text-center mt-2`}>Seerah</h5>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Categories;

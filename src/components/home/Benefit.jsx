import React from "react";
import { MdContentCopy, MdDashboard, MdPeopleAlt } from "react-icons/md";
import imgEducation from "../../assets/education.png";

const Benefit = () => {
  return (
    <section className={`bg-gray-100 py-16 overflow-x-hidden`}>
      <div className="container">
        <div
          className={`flex flex-col-reverse sm:flex-row items-center max-w-4xl mx-auto sm:space-x-5`}
        >
          <div data-aos="fade-right" data-aos-delay="100">
            <span className="badge badge-lg bg-pink-600 border-pink-600 text-white text-xs">
              Benefit
            </span>
            <div className={`space-y-3 mt-3`}>
              <div className={`flex items-center space-x-2`}>
                <span
                  className={`inline-flex justify-center items-center w-10 h-10 bg-white rounded-full shadow-sm`}
                >
                  <MdContentCopy />
                </span>
                <p className={`text-gray-600`}>
                  TA’s and presenters can be moved to the front of the class.
                </p>
              </div>
              <div className={`flex items-center space-x-2`}>
                <span
                  className={`inline-flex justify-center items-center w-10 h-10 bg-white rounded-full shadow-sm`}
                >
                  <MdPeopleAlt />
                </span>
                <p className={`text-gray-600`}>
                  Teachers can easily see all students and class data at one
                  time.
                </p>
              </div>
              <div className={`flex items-center space-x-2`}>
                <span
                  className={`inline-flex justify-center items-center w-10 h-10 bg-white rounded-full shadow-sm`}
                >
                  <MdDashboard />
                </span>
                <p className={`text-gray-600`}>
                  Teachers don’t get lost in the grid view and have a dedicated
                  Podium space.
                </p>
              </div>
            </div>
          </div>
          <figure
            className={`mb-5 sm:mb-0`}
            data-aos="fade-left"
            data-aos-delay="100"
          >
            <img src={imgEducation} alt="" className={`w-full max-w-xs`} />
          </figure>
        </div>
      </div>
    </section>
  );
};

export default Benefit;

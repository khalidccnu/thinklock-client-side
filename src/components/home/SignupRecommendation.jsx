import React from "react";
import { useNavigate } from "react-router-dom";
import imgInstructors from "../../assets/instructors.png";
import imgStudent from "../../assets/student.png";

const SignupRecommendation = () => {
  const navigate = useNavigate();

  return (
    <section
      className={`bg-blue-maastricht py-16 text-white overflow-x-hidden`}
    >
      <div className="container">
        <div
          className={`grid grid-cols-1 sm:grid-cols-2 gap-7 max-w-4xl mx-auto`}
        >
          <div
            className={`flex flex-col-reverse lg:flex-row items-center lg:space-x-3 bg-blue-yankees rounded-lg p-6`}
            data-aos="fade-right"
          >
            <div className={`space-y-3`}>
              <h2 className={`font-bold text-lg`}>Become An Instructor</h2>
              <p>
                Top instructors from around the world teach students on
                ThinkLock.
              </p>
              <button
                className={`btn btn-xs btn-outline text-pink-600 !border-pink-600 hover:bg-pink-600 h-auto px-5 py-2 transition-colors duration-500 normal-case`}
                onClick={(_) => navigate("login?signup=true")}
              >
                Start teaching today
              </button>
            </div>
            <figure
              className={`max-w-[15rem] lg:max-w-none lg:w-44 mb-3 lg:mb-0`}
            >
              <img src={imgInstructors} alt="" />
            </figure>
          </div>
          <div
            className={`flex flex-col-reverse lg:flex-row items-center lg:space-x-3 bg-blue-yankees rounded-lg p-6`}
            data-aos="fade-left"
          >
            <div className={`space-y-3`}>
              <h2 className={`font-bold text-lg`}>
                Transform Access To ThinkLock
              </h2>
              <p>
                Create an account to receive our newsletter, course
                recommendations and promotions.
              </p>
              <button
                className={`btn btn-xs btn-outline text-pink-600 !border-pink-600 hover:bg-pink-600 h-auto px-5 py-2 transition-colors duration-500 normal-case`}
                onClick={(_) => navigate("login?signup=true")}
              >
                Register
              </button>
            </div>
            <figure
              className={`max-w-[15rem] lg:max-w-none lg:w-44 mb-3 lg:mb-0`}
            >
              <img src={imgStudent} alt="" />
            </figure>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SignupRecommendation;

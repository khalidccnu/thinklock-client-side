import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { BiDollarCircle } from "react-icons/bi";
import { BsBookmarkStarFill, BsFillInfoSquareFill } from "react-icons/bs";
import { FaBookmark, FaEdit, FaRegBookmark, FaUser } from "react-icons/fa";
import { RiMessage2Fill } from "react-icons/ri";
import useUser from "../hooks/useUser.js";
import useAxiosSecure from "../hooks/useAxiosSecure.js";

const CourseCard = ({
  setFMOpen,
  setFeedback,
  setEditMode,
  handleBookCourse,
  hidden,
  course,
}) => {
  const {
    _id: id,
    instructor_id,
    name,
    price,
    seat,
    purchase,
    feedback,
    status,
    image,
  } = course;
  const location = useLocation();
  const navigate = useNavigate();
  const [isBook, setBook] = useState(false);
  const [isUserLoading, user] = useUser();
  const axiosSecure = useAxiosSecure();

  const { data: instructor } = useQuery({
    queryKey: [id, "instructor.data"],
    queryFn: (_) => axiosSecure(`/instructors/${instructor_id}`),
  });

  useEffect(
    (_) => {
      if (!isUserLoading && user.role === "student") {
        axiosSecure(`/student/${user._id}/booked-courses`).then((response) => {
          let bookedCourses = response.data?.courses;

          if (bookedCourses) {
            const exist = bookedCourses.find(
              (bookedCourse) => bookedCourse === id
            );

            exist ? setBook(true) : null;
          }
        });
      }
    },
    [isUserLoading]
  );

  return (
    <div
      className={`grid grid-cols-1 gap-y-4${
        seat === purchase ? " opacity-60" : ""
      }`}
    >
      <div
        className="relative bg-blue-maastricht bg-cover h-52 rounded-lg before:content-[''] before:absolute before:bottom-0 before:left-1/2 before:w-5 before:h-5 before:bg-transparent before:rounded-full before:shadow-[-10px_10px_0_#1d313e] after:content-[''] after:absolute after:bottom-16 after:left-0 after:w-5 after:h-5 after:bg-transparent after:rounded-full after:shadow-[-10px_10px_0_#1d313e]"
        style={{ backgroundImage: `url("${image}")` }}
      >
        {feedback ? (
          <RiMessage2Fill
            className="absolute top-5 left-5 text-lg text-pink-600 cursor-pointer"
            onClick={(_) => {
              setFMOpen(true);
              setFeedback(feedback);
            }}
          />
        ) : null}
      </div>
      <div className="relative bg-blue-maastricht min-h-[10rem] rounded-lg rounded-tl-none text-white">
        <span className="absolute -top-20 bg-blue-maastricht w-1/2 h-20 border-solid border-t-[1rem] border-t-blue-yankees border-r-[1rem] border-r-blue-yankees rounded-tr-[3.5rem] before:content-[''] before:absolute before:bg-transparent before:w-5 before:h-5 before:rounded-full before:shadow-[-12px_-10px_0_#1d313e] after:content-[''] after:absolute after:-right-5 after:bottom-0 after:bg-transparent after:w-5 after:h-5 after:rounded-full after:shadow-[-10px_10px_0_#011e30]">
          {!hidden ? (
            !location.pathname.includes("booked-course") ? (
              !location.pathname.includes("enrolled-course") ? (
                status ? (
                  <span className="flex justify-center items-center h-full font-bold text-xs space-x-1">
                    <BsFillInfoSquareFill />
                    <span className="mt-1">{status.toUpperCase()}</span>
                  </span>
                ) : (
                  <span className="flex justify-center items-center h-full">
                    <button
                      className={`btn btn-xs btn-outline ${
                        isBook ||
                        (user && user.role !== "student") ||
                        (user &&
                          user.courses !== undefined &&
                          user.courses.indexOf(id) !== -1) ||
                        purchase === seat
                          ? "btn-disabled border-gray-600 text-gray-600"
                          : "text-pink-600 border-pink-600 hover:bg-pink-600 hover:border-pink-600"
                      } h-auto px-5 py-2 transition-colors duration-500 normal-case`}
                      onClick={(_) => {
                        handleBookCourse(id);
                        user ? setBook(true) : null;
                      }}
                    >
                      {user &&
                      user.courses !== undefined &&
                      user.courses.indexOf(id) !== -1 ? (
                        <FaBookmark />
                      ) : isBook ? (
                        <BsBookmarkStarFill />
                      ) : (
                        <FaRegBookmark />
                      )}
                      <span className="mt-1 -ml-1">
                        {user &&
                        user.courses !== undefined &&
                        user.courses.indexOf(id) !== -1
                          ? "Enrolled"
                          : isBook
                          ? "Booked"
                          : "Book"}
                      </span>
                    </button>
                  </span>
                )
              ) : null
            ) : null
          ) : null}
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
              <span>{(purchase || 0) + "/" + seat}</span>
            </span>
          </div>
          <div className="flex items-center justify-between mt-5">
            <h5 className="inline-flex font-semibold leading-[1.2rem] space-x-1">
              <FaEdit />
              <span>{instructor?.data.name}</span>
            </h5>
            {location.pathname.includes("my-course") ? (
              <button
                className="btn btn-sm rounded-lg"
                onClick={(_) => navigate("?edit=" + id)}
              >
                Edit
              </button>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;

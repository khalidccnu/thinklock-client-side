import React, { useState } from "react";
import { Helmet } from "react-helmet-async";
import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import useAuth from "../hooks/useAuth.js";
import useAxiosIns from "../hooks/useAxiosIns.js";
import useAxiosSecure from "../hooks/useAxiosSecure.js";
import LoginFirstModal from "../components/modal/LoginFirstModal.jsx";
import CourseCard from "../components/CourseCard.jsx";

const Course = () => {
  const { userInfo } = useAuth();
  const axiosIns = useAxiosIns();
  const axiosSecure = useAxiosSecure();
  const [isLFMOpen, setLFMOpen] = useState(false);

  const { isLoading, data: courses } = useQuery({
    queryKey: ["courses.data"],
    queryFn: (_) => axiosIns(`/courses`),
  });

  const handleBookCourse = (id) => {
    if (!userInfo?.uid) {
      setLFMOpen(true);
      return false;
    }

    axiosSecure(`/student/${userInfo.uid}/booked-courses`).then((response) => {
      let bookedCourses = response.data?.courses;

      if (!bookedCourses) bookedCourses = [];

      axiosSecure
        .put(`/student/${userInfo.uid}/booked-courses`, {
          student_id: userInfo.uid,
          courses: [...bookedCourses, id],
        })
        .then((_) => toast.success("Course has been successfully booked!"))
        .catch((_) => toast.error("Something went wrong!"));
    });
  };

  return (
    <section className="pt-28 pb-8">
      <Helmet>
        <title>Course - ThinkLock</title>
      </Helmet>
      <div className="container">
        {!isLoading ? (
          courses.data.length ? (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-7">
                {courses?.data.map((course) => (
                  <CourseCard
                    key={course._id}
                    handleBookCourse={handleBookCourse}
                    course={course}
                  />
                ))}
              </div>
              <LoginFirstModal isLFMOpen={isLFMOpen} setLFMOpen={setLFMOpen} />
            </>
          ) : (
            <div className="alert max-w-sm mx-auto">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="stroke-info shrink-0 w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                ></path>
              </svg>
              <span>No course available!</span>
            </div>
          )
        ) : null}
      </div>
    </section>
  );
};

export default Course;

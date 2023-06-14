import React, { useContext, useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure.js";
import useAuth from "../../hooks/useAuth.js";
import { PaidBalanceContext } from "../../providers/PaidBalanceProvider.jsx";
import CourseCard from "../../components/CourseCard.jsx";

const BookedCourse = () => {
  const [isLoading, setLoading] = useState(true);
  const [, setFetchAll] = useContext(PaidBalanceContext);
  const { loading, userInfo } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [bookedCourses, setBookedCourses] = useState([]);

  const { data: courses, refetch } = useQuery({
    queryKey: [userInfo, "courses.data"],
    enabled: !loading,
    queryFn: (_) => axiosSecure(`/student/${userInfo.uid}/booked-courses`),
  });

  useEffect(
    (_) => {
      if (courses) {
        setFetchAll((prev) => {
          return { ...prev, bcRefetch: refetch };
        });

        axiosSecure
          .post(`/student/${userInfo.uid}/booked-courses`, courses.data.courses)
          .then((response) => {
            setBookedCourses(response.data);
            setLoading(false);
          });
      }
    },
    [courses]
  );

  return !isLoading ? (
    bookedCourses.length ? (
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-7">
        {bookedCourses.map((course) => (
          <CourseCard key={course._id} course={course} />
        ))}
      </div>
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
        <span>You did not book any course yet!</span>
      </div>
    )
  ) : null;
};

export default BookedCourse;

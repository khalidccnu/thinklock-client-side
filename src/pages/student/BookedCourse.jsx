import React, { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure.js";
import useAuth from "../../hooks/useAuth.js";
import CourseCard from "../../components/CourseCard.jsx";

const BookedCourse = () => {
  const { loading, userInfo } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [bookedCourses, setBookedCourses] = useState([]);

  const { data: courses, refetch } = useQuery({
    queryKey: [userInfo, "courses.data"],
    enabled: !loading,
    queryFn: (_) => axiosSecure(`/${userInfo.uid}/booked-courses`),
  });

  useEffect(
    (_) => {
      if (courses)
        axiosSecure
          .post(`/${userInfo.uid}/booked-courses`, courses.data.courses)
          .then((response) => setBookedCourses(response.data));
    },
    [courses]
  );

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-7">
      {bookedCourses.map((course) => (
        <CourseCard key={course._id} course={course} />
      ))}
    </div>
  );
};

export default BookedCourse;

import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../hooks/useAuth.js";
import useAxiosSecure from "../../hooks/useAxiosSecure.js";
import CourseCard from "../../components/CourseCard.jsx";

const MyCourse = () => {
  const { loading, userInfo } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: courses } = useQuery({
    queryKey: [userInfo.uid, "courses.data"],
    enabled: !loading,
    queryFn: (_) => axiosSecure(`/${userInfo.uid}/courses`),
  });

  return (
    <div className="grid grid-cols-3 gap-7">
      {courses?.data.map((course) => (
        <CourseCard key={course._id} course={course} />
      ))}
    </div>
  );
};

export default MyCourse;

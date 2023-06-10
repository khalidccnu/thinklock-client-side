import React, { useState } from "react";
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

  const { data: courses } = useQuery({
    queryKey: ["courses.data"],
    queryFn: (_) => axiosIns(`/courses`),
  });

  const handleBookCourse = (id) => {
    if (!userInfo?.uid) {
      setLFMOpen(true);
      return false;
    }

    axiosSecure(`/${userInfo.uid}/booked-courses`).then((response) => {
      let bookedCourses = response.data?.courses;

      if (!bookedCourses) bookedCourses = [];

      axiosSecure
        .put(`/${userInfo.uid}/booked-courses`, {
          student_id: userInfo.uid,
          courses: [...bookedCourses, id],
        })
        .then((_) => toast.success("Course has been successfully booked!"))
        .catch((_) => toast.error("Something went wrong!"));
    });
  };

  return (
    <section className="pt-28 pb-8">
      <div className="container">
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
      </div>
    </section>
  );
};

export default Course;

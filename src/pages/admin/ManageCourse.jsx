import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../hooks/useAuth.js";
import useAxiosSecure from "../../hooks/useAxiosSecure.js";
import ApproveCourseModal from "../../components/modal/ApproveCourseModal.jsx";
import DenyCourseModal from "../../components/modal/DenyCourseModal.jsx";
import ManageCourseCard from "../../components/ManageCourseCard.jsx";

const ManageCourse = () => {
  const { loading, userInfo } = useAuth();
  const [actionCourse, setActionCourse] = useState({});
  const [isACMOpen, setACMOpen] = useState(false);
  const [isDCMOpen, setDCMOpen] = useState(false);
  const axiosSecure = useAxiosSecure();

  const {
    isLoading,
    data: courses,
    refetch,
  } = useQuery({
    queryKey: [userInfo.uid, "courses.data"],
    enabled: !loading,
    queryFn: (_) => axiosSecure(`/admin/courses`),
  });

  const handleApprove = (id, name) => {
    setActionCourse({ id, name });
    setACMOpen(true);
  };

  const handleDeny = (id, name) => {
    setActionCourse({ id, name });
    setDCMOpen(true);
  };

  return !isLoading ? (
    courses.data.length ? (
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-7">
        {courses.data.map((course) => (
          <ManageCourseCard
            key={course._id}
            handleApprove={handleApprove}
            handleDeny={handleDeny}
            course={course}
          />
        ))}
        <ApproveCourseModal
          isACMOpen={isACMOpen}
          setACMOpen={setACMOpen}
          refetch={refetch}
          actionCourse={actionCourse}
        />
        <DenyCourseModal
          isDCMOpen={isDCMOpen}
          setDCMOpen={setDCMOpen}
          refetch={refetch}
          actionCourse={actionCourse}
        />
      </div>
    ) : (
      <div className="alert bg-blue-maastricht text-white max-w-sm mx-auto">
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
        <span>There is no course to manage!</span>
      </div>
    )
  ) : null;
};

export default ManageCourse;

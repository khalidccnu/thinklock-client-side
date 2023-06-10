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
  let [isACMOpen, setACMOpen] = useState(false);
  let [isDCMOpen, setDCMOpen] = useState(false);
  const axiosSecure = useAxiosSecure();

  const { refetch, data: courses } = useQuery({
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

  return (
    <div className="grid grid-cols-3 gap-7">
      {courses?.data.map((course) => (
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
  );
};

export default ManageCourse;

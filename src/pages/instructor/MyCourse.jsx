import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import qs from "query-string";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../hooks/useAuth.js";
import useAxiosSecure from "../../hooks/useAxiosSecure.js";
import FeedbackModal from "../../components/modal/FeedbackModal.jsx";
import CourseCard from "../../components/CourseCard.jsx";
import EditCourse from "../../components/EditCourse.jsx";

const MyCourse = () => {
  const [params] = useSearchParams();
  const [isModeLoading, setModeLoading] = useState(true);
  const [isEditMode, setEditMode] = useState(false);
  const { loading, userInfo } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [isFMOpen, setFMOpen] = useState(false);
  const [feedback, setFeedback] = useState("");

  const {
    isLoading,
    data: courses,
    refetch: refetchCourses,
  } = useQuery({
    queryKey: [userInfo.uid, "courses.data"],
    enabled: !loading,
    queryFn: (_) => axiosSecure(`/instructor/${userInfo.uid}/courses`),
  });

  useEffect(
    (_) => {
      qs.parse(params.toString()).edit ? setEditMode(true) : setEditMode(false);

      setModeLoading(false);
    },
    [params.size]
  );

  return !isLoading ? (
    courses.data.length ? (
      !isModeLoading ? (
        !isEditMode ? (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-7">
              {courses.data.map((course) => (
                <CourseCard
                  key={course._id}
                  setFMOpen={setFMOpen}
                  setFeedback={setFeedback}
                  setEditMode={setEditMode}
                  course={course}
                />
              ))}
            </div>
            <FeedbackModal
              isFMOpen={isFMOpen}
              setFMOpen={setFMOpen}
              feedback={feedback}
            />
          </>
        ) : (
          <EditCourse
            courseID={qs.parse(params.toString()).edit}
            refetchCourses={refetchCourses}
          />
        )
      ) : null
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
        <span>You did not add any course yet!</span>
      </div>
    )
  ) : null;
};

export default MyCourse;

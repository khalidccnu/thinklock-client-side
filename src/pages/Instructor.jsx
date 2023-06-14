import React from "react";
import { Helmet } from "react-helmet-async";
import { useQuery } from "@tanstack/react-query";
import useAxiosIns from "../hooks/useAxiosIns.js";
import InstructorCard from "../components/InstructorCard.jsx";

const Instructor = () => {
  const axiosIns = useAxiosIns();

  const { isLoading, data: instructors } = useQuery({
    queryKey: ["instructors.data"],
    queryFn: (_) => axiosIns(`/instructors`),
  });

  return (
    <section className="pt-28 pb-8">
      <Helmet>
        <title>Instructor - ThinkLock</title>
      </Helmet>
      <div className="container">
        {!isLoading ? (
          instructors.data.length ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-7">
              {instructors.data.map((instructor) => (
                <InstructorCard key={instructor._id} instructor={instructor} />
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
              <span>No instructor available!</span>
            </div>
          )
        ) : null}
      </div>
    </section>
  );
};

export default Instructor;

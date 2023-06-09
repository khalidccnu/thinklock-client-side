import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosIns from "../hooks/useAxiosIns.js";
import InstructorCard from "../components/InstructorCard.jsx";

const Instructor = () => {
  const axiosIns = useAxiosIns();

  const { data: instructors } = useQuery({
    queryKey: ["instructors.data"],
    queryFn: (_) => axiosIns(`/instructors`),
  });

  return (
    <section className="pt-28 pb-8">
      <div className="container">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-7">
          {instructors?.data.map((instructor) => (
            <InstructorCard key={instructor._id} instructor={instructor} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Instructor;

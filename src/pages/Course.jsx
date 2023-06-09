import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosIns from "../hooks/useAxiosIns.js";
import Card from "../components/Card.jsx";

const Course = () => {
  const axiosIns = useAxiosIns();

  const { data: courses } = useQuery({
    queryKey: ["courses.data"],
    queryFn: (_) => axiosIns(`/courses`),
  });

  return (
    <section className="pt-28 pb-8">
      <div className="container">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-7">
          {courses?.data.map((course) => (
            <Card key={course._id} course={course} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Course;

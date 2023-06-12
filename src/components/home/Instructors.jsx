import React, { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosIns from "../../hooks/useAxiosIns.js";
import imgCS from "../../assets/curved-shape.svg";
import Instructor from "./Instructor.jsx";

const Instructors = () => {
  const axiosIns = useAxiosIns();
  const [shuffleInstructors, setShuffleInstructors] = useState([]);

  const { data: instructors } = useQuery({
    queryKey: ["instructors.data"],
    queryFn: (_) => axiosIns(`/instructors`),
  });

  const handleShuffle = (arr) => {
    let currentIndex = arr.length,
      randomIndex;

    while (currentIndex !== 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      [arr[currentIndex], arr[randomIndex]] = [
        arr[randomIndex],
        arr[currentIndex],
      ];
    }

    return arr;
  };

  useEffect(
    (_) => {
      if (instructors) {
        const response = handleShuffle(instructors.data);
        setShuffleInstructors(response);
      }
    },
    [instructors]
  );

  return (
    <section className="pt-5 pb-10">
      <div className="container">
        <div className="mb-16">
          <div className="relative w-fit mx-auto">
            <h3 className="font-bold text-2xl">Look Our Instructor</h3>
            <img
              src={imgCS}
              alt=""
              className="absolute -top-10 -left-10 w-28 rotate-45 -z-10"
            />
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7 max-w-sm sm:max-w-none mx-auto">
          {shuffleInstructors.slice(0, 6).map((instructor) => (
            <Instructor key={instructor._id} instructor={instructor} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Instructors;

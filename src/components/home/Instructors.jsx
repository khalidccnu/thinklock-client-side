import React, { useEffect, useState } from "react";
import { ThreeDots } from "react-loader-spinner";
import { useQuery } from "@tanstack/react-query";
import useAxiosIns from "../../hooks/useAxiosIns.js";
import imgUnderline from "../../assets/underline.png";
import Instructor from "./Instructor.jsx";

const Instructors = () => {
  const [isLoading, setLoading] = useState(true);
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
        setLoading(false);
      }
    },
    [instructors]
  );

  return (
    <section className="py-16 overflow-y-hidden">
      <div className="container">
        <div className="mb-16 text-white" data-aos="fade-up">
          <div className="relative w-fit mx-auto">
            <h3 className="font-bold text-2xl">Look Our Instructor</h3>
            <img
              src={imgUnderline}
              alt=""
              className="absolute left-[38%] -bottom-2 -translate-x-1/2 w-24"
            />
          </div>
        </div>
        {!isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7">
            {shuffleInstructors.slice(0, 6).map((instructor) => (
              <Instructor key={instructor._id} instructor={instructor} />
            ))}
          </div>
        ) : (
          <ThreeDots
            height="80"
            width="80"
            color="rgb(219, 39, 119)"
            wrapperClass="justify-center"
          />
        )}
      </div>
    </section>
  );
};

export default Instructors;

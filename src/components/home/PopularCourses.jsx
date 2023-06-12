import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper";
import { useQuery } from "@tanstack/react-query";
import useAxiosIns from "../../hooks/useAxiosIns.js";
import CourseCard from "../CourseCard.jsx";

const PopularCourses = () => {
  const axiosIns = useAxiosIns();

  const { data: courses } = useQuery({
    queryKey: ["courses.data"],
    queryFn: (_) => axiosIns(`/courses/popular`),
  });

  return (
    <section className="pt-16 pb-10">
      <div className="container">
        <h3 className="font-bold text-2xl text-center mb-10">Popular Course</h3>
        <Swiper
          className="pb-14"
          modules={[Pagination, Autoplay]}
          pagination={{ clickable: true }}
          autoplay={{ pauseOnMouseEnter: true, disableOnInteraction: false }}
          slidesPerView="1"
          spaceBetween="50"
          breakpoints={{
            640: {
              slidesPerView: 2,
            },
            768: {
              slidesPerView: 3,
            },
            1024: {
              slidesPerView: 4,
            },
          }}
        >
          {courses?.data.map((course) => (
            <SwiperSlide key={course["_id"]}>
              <CourseCard key={course["_id"]} hidden={true} course={course} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default PopularCourses;

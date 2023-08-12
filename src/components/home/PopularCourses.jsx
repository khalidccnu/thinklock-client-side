import React from "react";
import { ThreeDots } from "react-loader-spinner";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper";
import { useQuery } from "@tanstack/react-query";
import useAxiosIns from "../../hooks/useAxiosIns.js";
import imgUnderline from "../../assets/underline.png";
import CourseCard from "../CourseCard.jsx";

const PopularCourses = () => {
  const axiosIns = useAxiosIns();

  const { data: courses, isLoading } = useQuery({
    queryKey: ["courses.data"],
    queryFn: (_) => axiosIns(`/courses/popular`),
  });

  return (
    <section className="pt-16 pb-10">
      <div className="container">
        <div className="mb-16 text-white">
          <div className="relative w-fit mx-auto">
            <h3 className="font-bold text-2xl">Popular Course</h3>
            <img
              src={imgUnderline}
              alt=""
              className="absolute left-[38%] -bottom-2 -translate-x-1/2 w-24"
            />
          </div>
        </div>
        {!isLoading ? (
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

export default PopularCourses;

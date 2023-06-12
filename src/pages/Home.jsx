import React from "react";
import { Helmet } from "react-helmet-async";
import HomeSlider from "../components/home/HomeSlider.jsx";
import PopularCourses from "../components/home/PopularCourses.jsx";
import Instructors from "../components/home/Instructors.jsx";
import Testimonial from "../components/home/Testimonial.jsx";

const Home = () => {
  return (
    <>
      <Helmet>
        <title>Home - ThinkLock</title>
      </Helmet>
      <HomeSlider />
      <PopularCourses />
      <Instructors />
      <Testimonial />
    </>
  );
};

export default Home;

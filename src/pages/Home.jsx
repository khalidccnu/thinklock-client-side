import React, { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import AOS from "aos";
import HomeSlider from "../components/home/HomeSlider.jsx";
import Highlight from "../components/home/Highlight.jsx";
import PopularCourses from "../components/home/PopularCourses.jsx";
import Benefit from "../components/home/Benefit.jsx";
import Instructors from "../components/home/Instructors.jsx";
import Testimonial from "../components/home/Testimonial.jsx";

const Home = () => {
  useEffect((_) => {
    AOS.init({ duration: 3000 });
  }, []);

  return (
    <>
      <Helmet>
        <title>Home - ThinkLock</title>
      </Helmet>
      <HomeSlider />
      <Highlight />
      <PopularCourses />
      <Benefit />
      <Instructors />
      <Testimonial />
    </>
  );
};

export default Home;

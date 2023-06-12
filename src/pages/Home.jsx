import React from "react";
import { Helmet } from "react-helmet-async";
import HomeSlider from "../components/home/HomeSlider.jsx";
import PopularCourses from "../components/home/PopularCourses.jsx";

const Home = () => {
  return (
    <>
      <Helmet>
        <title>Home - ThinkLock</title>
      </Helmet>
      <HomeSlider />
      <PopularCourses />
    </>
  );
};

export default Home;

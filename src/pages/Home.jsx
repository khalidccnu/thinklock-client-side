import React from "react";
import { Helmet } from "react-helmet-async";
import HomeSlider from "../components/HomeSlider.jsx";

const Home = () => {
  return (
    <>
      <Helmet>
        <title>Home - ThinkLock</title>
      </Helmet>
      <HomeSlider />
    </>
  );
};

export default Home;

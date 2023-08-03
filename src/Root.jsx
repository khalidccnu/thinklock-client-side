import React from "react";
import { Outlet, ScrollRestoration } from "react-router-dom";
import Nav from "./components/Nav.jsx";
import Footer from "./components/Footer.jsx";

const Root = () => {
  return (
    <>
      <Nav />
      <Outlet />
      <Footer />
      <ScrollRestoration />
    </>
  );
};

export default Root;

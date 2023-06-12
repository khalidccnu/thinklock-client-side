import React from "react";
import { Navigate } from "react-router-dom";
import useUser from "../hooks/useUser.js";

const InstructorRoute = ({ children }) => {
  const [isUserLoading, user] = useUser();

  return !isUserLoading ? (
    user.role === "instructor" ? (
      children
    ) : (
      <Navigate
        to="/dashboard"
        state={{ mode: "instructor", access: "rejected" }}
      />
    )
  ) : null;
};

export default InstructorRoute;

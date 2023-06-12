import React from "react";
import { Navigate } from "react-router-dom";
import useUser from "../hooks/useUser.js";

const StudentRoute = ({ children }) => {
  const [isUserLoading, user] = useUser();

  return !isUserLoading ? (
    user.role === "student" ? (
      children
    ) : (
      <Navigate
        to="/dashboard"
        state={{ mode: "student", access: "rejected" }}
      />
    )
  ) : null;
};

export default StudentRoute;

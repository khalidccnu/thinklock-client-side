import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth.js";

const PrivateRoute = ({ children }) => {
  const { loading, userInfo } = useAuth();
  const location = useLocation();

  return !loading ? (
    userInfo?.uid ? (
      children
    ) : (
      <Navigate to="/login" state={{ fromURL: location }}></Navigate>
    )
  ) : null;
};

export default PrivateRoute;

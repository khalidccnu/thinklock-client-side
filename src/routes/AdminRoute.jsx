import React from "react";
import { Navigate } from "react-router-dom";
import useUser from "../hooks/useUser.js";

const AdminRoute = ({ children }) => {
  const [isUserLoading, user] = useUser();

  return !isUserLoading ? (
    user.role === "admin" ? (
      children
    ) : (
      <Navigate to="/dashboard" state={{ mode: "admin", access: "rejected" }} />
    )
  ) : null;
};

export default AdminRoute;

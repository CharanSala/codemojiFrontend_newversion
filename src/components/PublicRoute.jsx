import React from "react";
import { Navigate } from "react-router-dom";

const PublicRoute = ({ children }) => {
  const token = localStorage.getItem("token");

  // If already logged in → block these pages
  if (token) {
    return <Navigate to="/signin/events" replace />;
  }

  return children;
};

export default PublicRoute;

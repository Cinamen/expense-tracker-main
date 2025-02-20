import React from "react";
import { Navigate } from "react-router-dom";
import { toast } from "react-toastify";

const PrivateRoute = ({ children }) => {
  const isAuthenticated = sessionStorage.getItem("token");

  if (!isAuthenticated) {
    toast.error("Будь ласка увійдіть для початку")
    return <Navigate to={"/login"} />;
  }
  return <> {children}</>;
};

export default PrivateRoute;

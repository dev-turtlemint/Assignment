import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ component: RouteComponent }) => {
  const data = JSON.parse(localStorage.getItem("tokenData"));
  const accessToken =
    data && +data.issuedAt + +600000 > new Date().getTime()
      ? data
      : null;

  if (accessToken) {
    return <RouteComponent />;
  } else {
    return <Navigate to={"/login"} />;
  }
};

export default ProtectedRoute;

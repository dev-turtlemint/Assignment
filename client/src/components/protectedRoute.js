import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ component: RouteComponent }) => {
  const data = JSON.parse(localStorage.getItem("tokenData"));
  console.log(data);
  console.log("working");
  const accessToken =
    data && data.issuedAt + data.issuedAt * 10 > new Date().getTime()
      ? data
      : null;

  if (accessToken) {
    return <RouteComponent />;
  } else {
    return <Navigate to={"/login"} />;
  }
};

export default ProtectedRoute;

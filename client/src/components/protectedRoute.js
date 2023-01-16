import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ component: RouteComponent }) => {
  const data = JSON.parse(localStorage.getItem("tokenData"));
  console.log(data.issuedAt);
  console.log( +data.issuedAt + +600000 > new Date().getTime()  );
  const accessToken =
    data && +data.issuedAt + +600000 > new Date().getTime()
      ? data
      : null;

  console.log(accessToken);
  if (accessToken) {
    return <RouteComponent />;
  } else {
    return <Navigate to={"/login"} />;
  }
};

export default ProtectedRoute;

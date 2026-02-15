import React, { children } from "react";
import { Navigate, useLocation } from "react-router";
import useAuth from "../Auth/useAuth";
import Loader from "../Loader/Loader";

const PrivetRoute = ({ children }) => {
  const { user, loader } = useAuth();
  const location = useLocation();
  if (loader) {
    return <Loader></Loader>;
  }
  if (user) {
    return children;
  }
  return <Navigate to={"/login"} state={location?.state}></Navigate>;
};

export default PrivetRoute;

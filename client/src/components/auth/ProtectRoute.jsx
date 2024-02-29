import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const ProtectRoute = ({ children, user}) => {
  if (!user) return <Navigate to={"/login"} />
  return children ? children : <Outlet />;
};

export default ProtectRoute;

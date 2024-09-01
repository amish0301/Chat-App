import React from "react";
import { Navigate, Outlet, redirect } from "react-router-dom";

const ProtectRoute = ({ children, user, loading, redirect='/login'}) => {
  if(loading) return null;
  if (!user) return <Navigate to={redirect} />
  return children ? children : <Outlet />;
};

export default ProtectRoute;

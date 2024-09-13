import React from "react";
import { Outlet, Navigate } from "react-router-dom";

import { useAuth } from "../Context/AuthContext";

function PrivateRoute() {
  const { token } = useAuth();
  return token ? <Outlet /> : <Navigate to="/login" />;
}
export default PrivateRoute;

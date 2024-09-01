import React, { ReactNode } from "react";
import { useAppSelector } from "../redux/hooks";
import { useCurrentToken } from "../redux/features/auth/authSlice";
import { Navigate, useLocation } from "react-router-dom";

const ProtectedRoutes: React.FC<{ children: ReactNode }> = ({ children }) => {
  const location = useLocation();
  const token = useAppSelector(useCurrentToken);

if (!token) {
  return <Navigate state={location?.pathname} to={"/signin"} replace={true} />;
}

  return children;
};

export default ProtectedRoutes;

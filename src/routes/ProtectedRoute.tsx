import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import type { RootState } from "../store";
import type { JSX } from "react";

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const isAuthenticated = useSelector((state: RootState) => !!state.auth.user);

  return isAuthenticated ? children : <Navigate to="/auth" replace />;
};

export default ProtectedRoute;

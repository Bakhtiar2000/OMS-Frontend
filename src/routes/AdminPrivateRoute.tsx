import { type ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import PageLoader from "../utils/PageLoader";

const AdminPrivateRoute = ({ children }: { children: ReactNode }) => {
  const { user, loading } = useAuth();
  const location = useLocation();
  if (loading) return <PageLoader />;

  if (user && user.role === "admin") return children;
  else if (user && user.role !== "admin") return <Navigate to="/" replace />;
  return <Navigate to="/login" state={{ from: location }} replace />;
};

export default AdminPrivateRoute;

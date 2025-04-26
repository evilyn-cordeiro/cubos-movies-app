import { Navigate, Outlet } from "react-router-dom";

interface PublicRouteProps {
  restricted?: boolean;
}

const PublicRoute = ({ restricted = false }: PublicRouteProps) => {
  const isAuthenticated = !!localStorage.getItem("token");

  if (isAuthenticated && restricted) {
    return <Navigate to="/home" replace />;
  }

  return <Outlet />;
};

export default PublicRoute;

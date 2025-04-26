import { Route, Navigate } from "react-router-dom";

interface PrivateRouteProps {
  Component: React.ComponentType;
}

const PrivateRoute = ({ Component, ...rest }: PrivateRouteProps) => {
  const isAuthenticated = localStorage.getItem("token");

  return (
    <Route
      {...rest}
      element={isAuthenticated ? <Component /> : <Navigate to="/login" />}
    />
  );
};

export default PrivateRoute;

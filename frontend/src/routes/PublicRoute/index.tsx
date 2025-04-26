import { Navigate, Route } from "react-router-dom";

import { ComponentType } from "react";

interface PublicRouteProps {
  component: ComponentType;
  restricted: boolean;
}

const PublicRoute = ({
  component: Component,
  restricted,
  ...rest
}: PublicRouteProps) => {
  const isAuthenticated = localStorage.getItem("token"); // ou outro método para verificar o token

  return (
    <Route
      {...rest}
      element={
        isAuthenticated && restricted ? (
          <Navigate to="/dashboard" /> // ou outra rota privada
        ) : (
          <Component />
        )
      }
    />
  );
};

export default PublicRoute;

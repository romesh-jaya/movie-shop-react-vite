import { useAuth0 } from "@auth0/auth0-react";
import { useRef } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";

const PrivateRoute = () => {
  const location = useLocation();
  const { user, isLoading, isAuthenticated, error } = useAuth0();
  const isAuthRef = useRef(false);

  if (isAuthenticated && !isAuthRef.current) {
    isAuthRef.current = true;
    console.log("Sign in success", user && user?.email);
  }

  return isAuthenticated || isLoading || error ? (
    <Outlet />
  ) : (
    <Navigate to={{ pathname: "/login" }} state={{ from: location }} />
  );
};

export default PrivateRoute;

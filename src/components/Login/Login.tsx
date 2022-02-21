import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

import Spinner from "../../common/Spinner/Spinner";
import { useLocation, Navigate } from "react-router-dom";
import Button from "../../common/Button";

// Note: the Auth0 hosted Universal classic login screen has been customized in order to pass a custom
//       param - passwordLoginOnly. The customized login screen can be accessed via:
//       Auth0 dashboard -> Universal login -> Login tab -> HTML view.
//       This behaviour is to enforce that guest users need to login via their Google account,
//       whereas admin should login via username/pwd.

// Here is the customized code in the Universal login javascript:
/* 
const connConfig = config.extraParams.passwordLoginOnly? 
  'Username-Password-Authentication' : 'google-oauth2';
const connection = connConfig;
*/

const Login: React.FC = () => {
  const { loginWithRedirect, isLoading, isAuthenticated, error } = useAuth0();
  const location = useLocation();
  const isAdminLogin = location.pathname.includes("login-admin");

  const onLogin = async (): Promise<void> => {
    if (isAdminLogin) {
      loginWithRedirect({ passwordLoginOnly: true, display: "page" });
      return;
    }
    loginWithRedirect();
  };

  if (isLoading) {
    return (
      <div class="grid place-items-center">
        <Spinner />
      </div>
    );
  }

  if (error) {
    return <p class="text-red">{error}</p>;
  }

  return !isAuthenticated ? (
    <div class="flex flex-col bg-black w-full h-full align-middle justify-center">
      <div class="w-11/12 m-auto text-center">
        <div class="mt-5">
          {!isAdminLogin &&
            "Welcome! Sign in to browse movies and TV series at Ultra Movie Shop"}
        </div>
        <div className="pt-10 text-center">
          <Button onClick={onLogin}>
            {isAdminLogin ? "Sign in - Admin" : "Sign in"}
          </Button>
        </div>
      </div>
    </div>
  ) : (
    <Navigate to="/" />
  );
};

export default Login;

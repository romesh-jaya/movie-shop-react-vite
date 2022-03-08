import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import "pure-react-carousel/dist/react-carousel.es.css";
import App from "./App";
import { Auth0Provider } from "@auth0/auth0-react";

const DOMAIN = import.meta.env.VITE_AUTH0_DOMAIN;
const CLIENT_ID = import.meta.env.VITE_AUTH0_CLIENT_ID;
const AUDIENCE = import.meta.env.VITE_AUTH0_AUDIENCE;

ReactDOM.render(
  <Auth0Provider
    domain={DOMAIN}
    clientId={CLIENT_ID}
    audience={AUDIENCE}
    redirectUri={window.location.origin}
  >
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Auth0Provider>,
  document.getElementById("root")
);

import React, { Suspense } from "react";
import { Provider } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faGear,
  faAngleLeft,
  faAngleRight,
} from "@fortawesome/free-solid-svg-icons";

import Header from "./components/Header";
import store from "./redux";
import PrivateRoute from "./components/PrivateRoute";
import { useAuth0 } from "@auth0/auth0-react";
import axios from "./axios";
import ErrorBoundary from "./hoc/ErrorBoundary";

const Login = React.lazy(() => import("./components/Login"));
const Home = React.lazy(() => import("./components/Home"));
const Search = React.lazy(() => import("./components/Search"));
const NotFound = React.lazy(() => import("./components/NotFound"));

library.add(faGear, faAngleLeft, faAngleRight);

const serverPath = import.meta.env.VITE_NODE_SERVER;

function App() {
  const { getAccessTokenSilently } = useAuth0();

  axios.interceptors.request.use(async (req) => {
    if (req.url?.toUpperCase().includes(serverPath.toUpperCase())) {
      // token is auto cached by Auth0, so that multiple requests are not sent each time we need a token
      const token = await getAccessTokenSilently();
      if (req.headers) {
        req.headers.authorization = `Bearer ${token}`;
      }
    }
    return req;
  });

  return (
    <ErrorBoundary>
      <Provider store={store}>
        <BrowserRouter>
          <div class="flex flex-col items-center min-h-full bg-black">
            <Header />
            <div class="flex flex-col flex-1 max-w-screen-xl w-11/12 align-middle justify-center">
              <Suspense fallback={<div />}>
                <Routes>
                  <Route path="/login" element={<Login />} />
                  <Route path="/" element={<PrivateRoute />}>
                    <Route path="/" element={<Home />} />
                    <Route path="/search" element={<Search />} />
                  </Route>
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </Suspense>
            </div>
          </div>
        </BrowserRouter>
      </Provider>
    </ErrorBoundary>
  );
}

export default App;

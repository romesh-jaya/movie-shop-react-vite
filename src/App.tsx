import { Provider } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faGear,
  faAngleLeft,
  faAngleRight,
} from "@fortawesome/free-solid-svg-icons";

import Header from "./components/Header/Header";
import store from "./redux";
import Login from "./components/Login/Login";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import Home from "./components/Home/Home";
import { useAuth0 } from "@auth0/auth0-react";
import axios from "./axios";

library.add(faGear, faAngleLeft, faAngleRight);

const SERVER_PATH = import.meta.env.VITE_NODE_SERVER;

function App() {
  const { getAccessTokenSilently } = useAuth0();

  axios.interceptors.request.use(async (req) => {
    if (req.url?.toUpperCase().includes(SERVER_PATH.toUpperCase())) {
      // token is auto cached by Auth0, so that multiple requests are not sent each time we need a token
      const token = await getAccessTokenSilently();
      if (req.headers) {
        req.headers.authorization = `Bearer ${token}`;
      }
    }
    return req;
  });

  return (
    <Provider store={store}>
      <BrowserRouter>
        <div class="flex flex-col items-center min-h-full bg-black">
          <Header />
          <div class="flex flex-col flex-1 max-w-screen-xl w-11/12 align-middle justify-center">
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/" element={<PrivateRoute />}>
                <Route path="/" element={<Home />} />
              </Route>
            </Routes>
          </div>
        </div>
      </BrowserRouter>
    </Provider>
  );
}

export default App;

import { Provider } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faGear } from "@fortawesome/free-solid-svg-icons";

import Header from "./components/Header/Header";
import store from "./redux";
import Login from "./components/Login/Login";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import Home from "./components/Home/Home";

library.add(faGear);

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <div class="flex flex-col items-center h-full">
          <Header />
          <div class="flex flex-col bg-black w-full h-full align-middle justify-center">
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

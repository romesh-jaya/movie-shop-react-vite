import Header from "./components/Header/Header";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./components/Login/Login";

function App() {
  return (
    <BrowserRouter>
      <div class="flex flex-col items-center h-full">
        <Header />
        <Routes>
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;

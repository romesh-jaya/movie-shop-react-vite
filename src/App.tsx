import Header from "./components/Header";
import { BrowserRouter } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <div class="flex flex-col items-center">
        <Header />
      </div>
    </BrowserRouter>
  );
}

export default App;

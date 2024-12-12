import { BrowserRouter, Routes, Route } from "react-router-dom";
import Product from "./pages/Products";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Product />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

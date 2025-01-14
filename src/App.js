import { BrowserRouter, Routes, Route } from "react-router-dom";
import Product from "./pages/Products";
import ProductAddNew from "./pages/ProductAddNew";
import ProductEdit from "./pages/ProductEdit";
import Checkout from "./pages/Checkout";
import Cart from "./pages/Cart";
import PaymentVerify from "./pages/PaymentVerify";
import Orders from "./pages/Orders";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Categories from "./pages/Categories";
import { Toaster } from "sonner";
import { CookiesProvider } from "react-cookie";
import CategoryEdit from "./pages/CategoryEdit";

function App() {
  return (
    <div className="App">
      <CookiesProvider defaultSetOptions={{ path: "/" }}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Product />} />
            <Route path="/products/new" element={<ProductAddNew />} />
            <Route path="/products/:id/edit" element={<ProductEdit />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/verify-payment" element={<PaymentVerify />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/categories" element={<Categories />} />
            <Route path="/categories/:id/edit" element={<CategoryEdit />} />
          </Routes>
        </BrowserRouter>
        <Toaster expand={true} richColors position="top-right" />
      </CookiesProvider>
    </div>
  );
}

export default App;

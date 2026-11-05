import Dashbaord from "./pages/Dashboard";
import NavBar from "./components/layout/NavBar";
import { Route, Routes } from "react-router-dom";
import Checkout from "./pages/Checkout";
import ItemDetail from "./pages/ItemDetail";
import OrderSuccess from "./pages/OrderSuccess";
import Cart from "./pages/Cart";
import SignUp from "./pages/auth/Register";
import Login from "./pages/auth/Login";

function App() {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 flex flex-col">
      <header>
        <NavBar />
      </header>

      <main className="flex-1">
        <Routes>
          {/* Dashboard pages */}
          <Route path="/" element={<Dashbaord />} />

          {/* Product & Shopping pages */}
          <Route path="/item-detail/:id" element={<ItemDetail />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/order-success" element={<OrderSuccess />} />

          {/* Auth pages */}
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;

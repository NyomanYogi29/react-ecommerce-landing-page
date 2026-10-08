import Dashbaord from "./pages/Dashboard";
import NavBar from "./components/layout/NavBar";
import { Route, Routes } from "react-router-dom";
import Checkout from "./pages/Checkout";
import { useState } from "react";
import ItemDetail from "./pages/ItemDetail";
import OrderSuccess from "./pages/OrderSuccess";
import Cart from "./pages/Cart";
import { CartProvider } from "./context/CartContext";
import { UserProvider } from "./context/UserContext";
import SignUp from "./pages/SignUp";

function App() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <UserProvider>
      <CartProvider>
        <div className="min-h-screen bg-gray-50 text-gray-900 flex flex-col">
        <header>
          <NavBar
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
          />
        </header>

        <main className="flex-1">
          <Routes>
            <Route
              path="/"
              element={
                <Dashbaord
                  selectedCategory={selectedCategory}
                  searchQuery={searchQuery}
                />
              }
            />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/order-success" element={<OrderSuccess />} />
            <Route
              path="/item-detail/:id"
              element={<ItemDetail onSelectCategory={setSelectedCategory} />}
            />
            <Route path="/cart" element={<Cart />} />
            <Route path="/sign-up" element={<SignUp />} />
          </Routes>
        </main>
      </div>
    </CartProvider>
  </UserProvider>
  );
}

export default App;

import Dashbaord from "./pages/Dashboard";
import NavBar from "./components/layout/NavBar";
import { Route, Routes } from "react-router-dom";
import Checkout from "./pages/Checkout";
import OrderSuccess from "./pages/OrderSuccess";
import { useState } from "react";

function App() {
  const [selectedCategory, setSelectedCategory] = useState("All");

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 flex flex-col">
      <header>
        <NavBar
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
        />
      </header>

      <main className="flex-1">
        <Routes>
          <Route
            path="/"
            element={<Dashbaord selectedCategory={selectedCategory} />}
          />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/order-success" element={<OrderSuccess />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;

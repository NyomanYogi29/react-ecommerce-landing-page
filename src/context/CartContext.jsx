import { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext(null);

const STORAGE_KEY = "end1tech_cart";

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch (err) {
      console.error("Gagal membaca cart dari localStorage:", err);
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(cartItems));
    } catch (err) {
      console.error("Gagal menyimpan cart ke localStorage:", err);
    }
  }, [cartItems]);

  const addToCart = (item, quantity = 1) => {
    if (!item) return;
    const addQty = Math.max(1, Number(quantity) || 1);

    setCartItems((prevItems) => {
      const existingIndex = prevItems.findIndex((it) => it.id === item.id);
      if (existingIndex > -1) {
        return prevItems.map((it, idx) =>
          idx === existingIndex
            ? { ...it, quantity: (it.quantity || 1) + addQty }
            : it
        );
      }
      return [...prevItems, { ...item, quantity: addQty }];
    });
  };

  const updateQuantity = (itemId, quantity) => {
    const newQty = Math.max(1, Number(quantity) || 1);
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === itemId ? { ...item, quantity: newQty } : item
      )
    );
  };

  const removeFromCart = (itemIds) => {
    const ids = Array.isArray(itemIds) ? itemIds : [itemIds];
    const idSet = new Set(ids);
    setCartItems((prevItems) => prevItems.filter((item) => !idSet.has(item.id)));
  };

  const removePurchasedItems = (itemIds) => {
    removeFromCart(itemIds);
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const totalQuantity = cartItems.reduce(
    (total, item) => total + (Number(item.quantity) || 1),
    0
  );

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        updateQuantity,
        removeFromCart,
        removePurchasedItems,
        clearCart,
        totalQuantity,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart harus digunakan di dalam CartProvider");
  }
  return context;
}

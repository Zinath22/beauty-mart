

"use client";

import { createContext, useContext, useEffect, useState } from "react";

const CartContext = createContext(null);

// 🔥 SAFE HOOK
export const useCart = () => {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error("useCart must be used inside CartProvider");
  }

  return context;
};

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // 🔥 LOAD CART SAFELY (CLIENT ONLY)
  useEffect(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("cart");

      try {
        if (saved) {
          const parsed = JSON.parse(saved);

          if (Array.isArray(parsed)) {
            setCart(parsed);
          }
        }
      } catch (err) {
        console.log("Cart parse error:", err);
        localStorage.removeItem("cart");
      }

      setIsLoaded(true);
    }
  }, []);

  // 🔥 SAVE CART ONLY AFTER LOAD COMPLETE
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem("cart", JSON.stringify(cart));
    }
  }, [cart, isLoaded]);

  // 🔥 ADD TO CART (NO DUPLICATE)
  const addToCart = (product) => {
    setCart((prev) => {
      const exists = prev.find(
        (item) => item._id === product._id
      );

      if (exists) return prev;

      return [...prev, product];
    });
  };

  // 🔥 REMOVE ITEM
  const removeFromCart = (id) => {
    setCart((prev) =>
      prev.filter((item) => item._id !== id)
    );
  };

  // 🔥 CLEAR CART
  const clearCart = () => {
    setCart([]);
    localStorage.removeItem("cart");
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        clearCart,
        isLoaded, // optional for UI loading state
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
import React, { createContext, useState, useEffect } from "react";
import { storeData, getData } from "../services/storage";

const CART_STORAGE_KEY = "@shopping_cart";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isInitialized, setIsInitialized] = useState(false);
  const [error, setError] = useState(null);

  // 1. Recuperación inicial desde AsyncStorage al montar el Provider
  useEffect(() => {
    const loadCart = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const storedCart = await getData(CART_STORAGE_KEY);

        if (Array.isArray(storedCart)) {
          // Normalizamos precio y cantidad para evitar errores de tipo
          const normalizedCart = storedCart.map((item) => ({
            ...item,
            price: Number(item.price) || 0,
            quantity: Math.max(1, Number(item.quantity) || 1),
          }));
          setCart(normalizedCart);
        }
      } catch (e) {
        setError("No se pudo recuperar el carrito guardado.");
      } finally {
        setIsInitialized(true);
        setIsLoading(false);
      }
    };

    loadCart();
  }, []);

  // 2. Persistencia automática únicamente después de completar la carga inicial
  useEffect(() => {
    if (!isInitialized) return;

    const persistCart = async () => {
      try {
        setError(null);
        await storeData(CART_STORAGE_KEY, cart);
      } catch (e) {
        setError("No se pudieron guardar los cambios del carrito.");
      }
    };

    persistCart();
  }, [cart, isInitialized]);

  // Agrega un producto nuevo (cantidad 1) o incrementa su cantidad si ya existe
  const addToCart = (product) => {
    if (!product || product.id == null) return;

    setCart((prevCart) => {
      const existingProduct = prevCart.find((item) => item.id === product.id);

      if (existingProduct) {
        return prevCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      const newCartItem = {
        id: product.id,
        title: product.title,
        price: Number(product.price) || 0,
        image: product.image,
        quantity: 1,
      };

      return [...prevCart, newCartItem];
    });
  };

  // Aumenta en 1 la cantidad de un producto existente
  const increaseQuantity = (id) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  // Disminuye en 1 la cantidad sin permitir que baje de 1
  const decreaseQuantity = (id) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity - 1) }
          : item
      )
    );
  };

  // Elimina un producto del carrito por su ID
  const removeFromCart = (id) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  };

  // Vacía el carrito por completo
  const clearCart = () => {
    setCart([]);
  };

  // Calcula dinámicamente el total general a partir del estado actual
  const getCartTotal = () => {
    return cart.reduce(
      (total, item) => total + Number(item.price) * item.quantity,
      0
    );
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        increaseQuantity,
        decreaseQuantity,
        removeFromCart,
        clearCart,
        getCartTotal,
        isLoading,
        error,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
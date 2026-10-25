import React, { createContext, useState, useEffect } from "react";
import { storeData, getData } from "../services/storage";

export const FavoritesContext = createContext();

export const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const loadFavorites = async () => {
      const storedFavs = await getData("@favorites_list");
      if (storedFavs) setFavorites(storedFavs);
    };
    loadFavorites();
  }, []);

  const toggleFavorite = (product) => {
    let newFavs;
    if (favorites.find((fav) => fav.id === product.id)) {
      newFavs = favorites.filter((fav) => fav.id !== product.id); // Remover
    } else {
      newFavs = [...favorites, product]; // Agregar
    }
    setFavorites(newFavs);
    storeData("@favorites_list", newFavs);
  };

  const removeFavorite = (productId) => {
    const newFavs = favorites.filter((fav) => fav.id !== productId);
    setFavorites(newFavs);
    storeData("@favorites_list", newFavs);
  };

  const isFavorite = (productId) => {
    return favorites.some((fav) => fav.id === productId);
  };

  // Función necesaria para guardar el nuevo orden post Drag & Drop
  const reorderFavorites = (newOrder) => {
    setFavorites(newOrder);
    storeData("@favorites_list", newOrder);
  };

  return (
    <FavoritesContext.Provider
      value={{
        favorites,
        toggleFavorite,
        removeFavorite,
        isFavorite,
        reorderFavorites,
      }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};

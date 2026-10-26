import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "../constants/theme";

export const FavoriteIcon = ({ isFavorite, size = 24, color }) => {
  return (
    <Ionicons
      name={isFavorite ? "heart" : "heart-outline"}
      size={size}
      // Si le pasamos un color por props lo usa; si no, usa la lógica de favorito
      color={
        color || (isFavorite ? COLORS.danger || "#E74C3C" : COLORS.textLight)
      }
    />
  );
};

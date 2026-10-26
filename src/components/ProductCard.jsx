// src/components/ProductCard.jsx
import React from "react";
import { Pressable, View, Text, Image, StyleSheet } from "react-native";
import { COLORS, SPACING } from "../constants/theme";
import { FavoriteIcon } from "./FavoriteIcon";

export const ProductCard = ({
  item,
  onPress,
  layout = "vertical",
  onLongPress,
  disabled,
  rightAction,
  isFavorite = false,
  onToggleFavorite,
}) => {
  const isVertical = layout === "vertical";

  return (
    <Pressable
      onPress={onPress}
      onLongPress={onLongPress}
      disabled={disabled}
      style={[
        styles.card,
        isVertical ? styles.vertical : styles.horizontal,
        disabled && { backgroundColor: COLORS.background },
      ]}
    >
      <Image
        source={{ uri: item.image }}
        style={isVertical ? styles.imageVertical : styles.imageHorizontal}
        resizeMode="contain"
      />
      <View style={isVertical ? styles.infoVertical : styles.infoHorizontal}>
        {/* Categoría opcional arriba del título (igual que en tu imagen de referencia) */}
        {item.category && (
          <Text style={styles.category}>
            {typeof item.category === "string"
              ? item.category.toUpperCase()
              : "GENERAL"}
          </Text>
        )}

        <Text
          style={[styles.title, isVertical && { textAlign: "center" }]}
          numberOfLines={isVertical ? 2 : 1}
        >
          {item.title}
        </Text>
        {item.price && <Text style={styles.price}>$ {item.price}</Text>}
      </View>

      {/* Si pasamos onToggleFavorite, mostramos el corazón interactivo */}
      {onToggleFavorite ? (
        <Pressable
          onPress={() => onToggleFavorite(item)}
          style={styles.actionContainer}
        >
          <FavoriteIcon isFavorite={isFavorite} size={24} />
        </Pressable>
      ) : (
        rightAction && <View style={styles.actionContainer}>{rightAction}</View>
      )}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.surface,
    borderRadius: 8,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    position: "relative",
  },
  vertical: {
    padding: SPACING.large,
    marginBottom: SPACING.medium,
    alignItems: "center",
  },
  horizontal: {
    flexDirection: "row",
    alignItems: "center",
    padding: SPACING.large,
    marginBottom: SPACING.medium,
  },
  imageVertical: { width: 100, height: 100, marginBottom: SPACING.small },
  imageHorizontal: { width: 50, height: 50, marginRight: SPACING.large },
  infoVertical: { alignItems: "center", width: "100%" },
  infoHorizontal: { flex: 1 },
  category: {
    fontSize: 10,
    fontWeight: "700",
    color: COLORS.primary, // Color primario para la categoría
    letterSpacing: 1,
    marginBottom: 4,
    textAlign: "center",
  },
  title: { fontSize: 16, fontWeight: "600", color: COLORS.text },
  // Cambiamos COLORS.success por COLORS.primary para que el precio sea azul/morado
  price: {
    fontSize: 18,
    fontWeight: "700",
    color: COLORS.primary,
    marginTop: 4,
  },

  actionContainer: {
    position: "absolute",
    top: SPACING.small,
    right: SPACING.small,
    zIndex: 1,
    padding: SPACING.small,
  },
});

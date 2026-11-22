// src/components/ProductCard.jsx
import React from "react";
import {
  Pressable,
  TouchableOpacity,
  View,
  Text,
  Image,
  StyleSheet,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
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
  onAddToCart,
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

        {onAddToCart && (
          <TouchableOpacity
            style={styles.cartButton}
            activeOpacity={0.8}
            onPress={(e) => {
              e.stopPropagation();
              onAddToCart(item);
            }}
          >
            <Ionicons name="cart-outline" size={18} color={COLORS.white} />
            <Text style={styles.cartButtonText}>Agregar al carrito</Text>
          </TouchableOpacity>
        )}
      </View>

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
    color: COLORS.primary,
    letterSpacing: 1,
    marginBottom: 4,
    textAlign: "center",
  },
  title: { fontSize: 16, fontWeight: "600", color: COLORS.text },
  price: {
    fontSize: 18,
    fontWeight: "700",
    color: COLORS.primary,
    marginTop: 4,
  },
  cartButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS.primary,
    paddingVertical: 10,
    paddingHorizontal: SPACING.large,
    borderRadius: 8,
    marginTop: SPACING.medium,
    width: "100%",
    gap: SPACING.small,
  },
  cartButtonText: {
    color: COLORS.white,
    fontSize: 14,
    fontWeight: "600",
  },
  actionContainer: {
    position: "absolute",
    top: SPACING.small,
    right: SPACING.small,
    zIndex: 1,
    padding: SPACING.small,
  },
});
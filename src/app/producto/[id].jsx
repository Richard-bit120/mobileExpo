import React, { useContext } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { useLocalSearchParams } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

// Hooks y Contextos
import { useFetch } from "../../hooks/useFetch";
import { FavoritesContext } from "../../context/FavoritesContext";

// Componentes y Tema
import { AppButton } from "../../components/AppButton";
import { COLORS, SPACING, GLOBAL_STYLES } from "../../constants/theme";
import { notifyFavoriteAdded, notifyCartAdded } from "../../utils/helpers";

export default function ProductDetailScreen() {
  const { id } = useLocalSearchParams();

  // Llamamos a la API con el ID específico
  const {
    data: product,
    loading,
    error,
  } = useFetch(`https://fakestoreapi.com/products/${id}`);

  const { toggleFavorite, isFavorite } = useContext(FavoritesContext);

  // Estados de carga y error usando los contenedores globales
  if (loading || !product) {
    return (
      <View style={GLOBAL_STYLES.centeredContainer}>
        <ActivityIndicator size="large" color={COLORS.primary} />
      </View>
    );
  }

  if (error) {
    return (
      <View style={GLOBAL_STYLES.centeredContainer}>
        <Text style={[GLOBAL_STYLES.bodyText, { color: COLORS.danger }]}>
          Error: {error}
        </Text>
      </View>
    );
  }

  // Verificamos si ya es favorito
  const productIsFav = isFavorite(product.id);

  // Manejador personalizado para la acción de favoritos
  const handleToggleFavorite = () => {
    toggleFavorite(product);

    if (!productIsFav) {
      notifyFavoriteAdded();
    }
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {/* 1. Tarjeta de Imagen (Sincronizada con el estilo card global) */}
      <View style={[GLOBAL_STYLES.card, styles.imageCard]}>
        <Image
          source={{ uri: product.image }}
          style={styles.image}
          resizeMode="contain"
        />
      </View>

      {/* 2. Información General usando la jerarquía tipográfica global */}
      <Text style={styles.category}>
        {product.category ? product.category.toUpperCase() : "GENERAL"}
      </Text>

      <Text style={[GLOBAL_STYLES.titleScreen, styles.titleSpacing]}>
        {product.title}
      </Text>

      <Text style={[GLOBAL_STYLES.priceText, styles.priceSpacing]}>
        $ {product.price}
      </Text>

      <Text style={[GLOBAL_STYLES.bodyText, styles.descriptionSpacing]}>
        {product.description}
      </Text>

      {/* 4. Botones de Acción */}
      <View style={styles.actionsContainer}>
        <AppButton
          title={productIsFav ? "Quitar de Favoritos" : "Agregar a Favoritos"}
          onPress={handleToggleFavorite}
          style={
            productIsFav
              ? { backgroundColor: COLORS.warning || "#F1C40F" }
              : undefined
          }
          icon={
            <Ionicons
              name={productIsFav ? "star" : "star-outline"}
              size={18}
              color={productIsFav ? COLORS.white : COLORS.primary}
            />
          }
          variant="secondary"
        />
        <AppButton
          title="Comprar"
          onPress={notifyCartAdded}
          variant="primary"
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  content: {
    padding: SPACING.large,
  },
  imageCard: {
    alignItems: "center",
    justifyContent: "center",
    padding: SPACING.xlarge,
    marginBottom: SPACING.xlarge,
  },
  image: {
    width: 200,
    height: 250,
  },
  category: {
    fontSize: 12,
    fontWeight: "700",
    color: COLORS.primary,
    letterSpacing: 1,
    marginBottom: SPACING.small,
  },
  titleSpacing: {
    marginBottom: SPACING.small,
  },
  priceSpacing: {
    fontSize: 22, // Ligeramente más grande y destacado para el detalle
    marginBottom: SPACING.medium,
  },
  descriptionSpacing: {
    marginBottom: SPACING.large,
    lineHeight: 22,
  },
  actionsContainer: {
    gap: SPACING.medium,
    paddingBottom: SPACING.xxlarge,
  },
});

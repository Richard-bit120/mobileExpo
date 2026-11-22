import React, { useContext } from "react";
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  StyleSheet,
} from "react-native";
import { useRouter } from "expo-router";
import { useFetch } from "../../hooks/useFetch";
import { AppButton } from "../../components/AppButton";
import { ProductCard } from "../../components/ProductCard";
import { COLORS, SPACING, GLOBAL_STYLES } from "../../constants/theme";
import { notifyFavoriteAdded, notifyCartAdded } from "../../utils/helpers";
import { FavoritesContext } from "../../context/FavoritesContext";
import { CartContext } from "../../context/CartContext";

export default function CatalogScreen() {
  const router = useRouter();
  const { data, loading, error, refetch } = useFetch(
    "https://fakestoreapi.com/products",
  );

  const { toggleFavorite, isFavorite } = useContext(FavoritesContext);
  const { addToCart } = useContext(CartContext);

  const handleToggleFavorite = (product) => {
    const wasFav = isFavorite(product.id);
    toggleFavorite(product);

    if (!wasFav) {
      notifyFavoriteAdded();
    }
  };

  const handleAddToCart = (product) => {
    addToCart(product);
    notifyCartAdded();
  };

  if (loading && !data) {
    return (
      <View style={GLOBAL_STYLES.centeredContainer}>
        <ActivityIndicator size="large" color={COLORS.primary} />
      </View>
    );
  }

  if (error) {
    return (
      <View style={GLOBAL_STYLES.centeredContainer}>
        <Text style={[GLOBAL_STYLES.bodyText, styles.errorText]}>
          Error: {error}
        </Text>
        <AppButton title="Reintentar" onPress={refetch} variant="primary" />
      </View>
    );
  }

  const renderItem = ({ item }) => (
    <ProductCard
      item={item}
      layout="vertical"
      isFavorite={isFavorite(item.id)}
      onToggleFavorite={handleToggleFavorite}
      onAddToCart={handleAddToCart}
      onPress={() => router.push(`/producto/${item.id}`)}
    />
  );

  return (
    <FlatList
      data={data}
      keyExtractor={(item) => item.id.toString()}
      renderItem={renderItem}
      contentContainerStyle={styles.list}
      onRefresh={refetch}
      refreshing={loading}
    />
  );
}

const styles = StyleSheet.create({
  list: { padding: SPACING.large },
  errorText: {
    color: COLORS.danger,
    marginBottom: SPACING.large,
    textAlign: "center",
  },
});
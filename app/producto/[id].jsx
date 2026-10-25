import React, { useContext } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  ActivityIndicator,
  Button,
} from "react-native";
import { useLocalSearchParams } from "expo-router";
import { useFetch } from "../../hooks/useFetch";
import { FavoritesContext } from "../../context/FavoritesContext";

export default function ProductDetailScreen() {
  const { id } = useLocalSearchParams();
  const { data, loading, error } = useFetch(
    `https://fakestoreapi.com/products/${id}`,
  );
  const { toggleFavorite, isFavorite } = useContext(FavoritesContext);

  if (loading) return <ActivityIndicator size="large" style={styles.center} />;
  if (error || !data)
    return <Text style={styles.center}>Error al cargar producto.</Text>;

  const favorite = isFavorite(data.id);

  return (
    <View style={styles.container}>
      <Image
        source={{ uri: data.image }}
        style={styles.image}
        resizeMode="contain"
      />
      <Text style={styles.title}>{data.title}</Text>
      <Text style={styles.desc}>{data.description}</Text>
      <Text style={styles.price}>${data.price}</Text>
      <Button
        title={favorite ? "Quitar de Favoritos" : "Agregar a Favoritos"}
        color={favorite ? "red" : "blue"}
        onPress={() => toggleFavorite(data)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  center: { flex: 1, justifyContent: "center", alignItems: "center" },
  container: { flex: 1, padding: 20, backgroundColor: "#fff" },
  image: { width: "100%", height: 250, marginBottom: 20 },
  title: { fontSize: 20, fontWeight: "bold", marginBottom: 10 },
  desc: { fontSize: 14, color: "#666", marginBottom: 20 },
  price: {
    fontSize: 24,
    color: "green",
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
});

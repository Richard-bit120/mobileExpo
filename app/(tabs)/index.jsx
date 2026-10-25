import React from "react";
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  StyleSheet,
  Image,
  Pressable,
  Button,
} from "react-native";
import { useRouter } from "expo-router";
import { useFetch } from "../../hooks/useFetch";

export default function CatalogScreen() {
  const router = useRouter();
  // Usamos FakeStoreAPI por defecto como se acostumbra en clase
  const { data, loading, error, refetch } = useFetch(
    "https://fakestoreapi.com/products",
  );

  if (loading && !data)
    return <ActivityIndicator size="large" style={styles.center} />;
  if (error)
    return (
      <View style={styles.center}>
        <Text>Error: {error}</Text>
        <Button title="Reintentar" onPress={refetch} />
      </View>
    );

  const renderItem = ({ item }) => (
    <Pressable
      style={styles.card}
      onPress={() => router.push(`/producto/${item.id}`)}
    >
      <Image
        source={{ uri: item.image }}
        style={styles.image}
        resizeMode="contain"
      />
      <Text style={styles.title} numberOfLines={2}>
        {item.title}
      </Text>
      <Text style={styles.price}>${item.price}</Text>
    </Pressable>
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
  center: { flex: 1, justifyContent: "center", alignItems: "center" },
  list: { padding: 16 },
  card: {
    backgroundColor: "#fff",
    padding: 16,
    marginBottom: 12,
    borderRadius: 8,
    elevation: 2,
    alignItems: "center",
  },
  image: { width: 100, height: 100, marginBottom: 8 },
  title: { fontSize: 16, fontWeight: "bold", textAlign: "center" },
  price: { fontSize: 18, color: "green", marginTop: 4 },
});

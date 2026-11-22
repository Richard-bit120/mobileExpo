import React, { useContext } from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { useRouter } from "expo-router"; // <-- 1. Importamos useRouter
import DraggableFlatList, {
  ScaleDecorator,
} from "react-native-draggable-flatlist";
import Swipeable from "react-native-gesture-handler/Swipeable";
import { FavoritesContext } from "../../context/FavoritesContext";
import { COLORS, SPACING, GLOBAL_STYLES } from "../../constants/theme";
import { ProductCard } from "../../components/ProductCard";
import { Ionicons } from "@expo/vector-icons";
import { confirmDelete } from "../../utils/helpers";

export default function FavoritesScreen() {
  const router = useRouter(); // <-- 2. Inicializamos el router
  const { favorites, removeFavorite, reorderFavorites } =
    useContext(FavoritesContext);

  const renderRightActions = (id) => (
    <Pressable
      style={styles.deleteAction}
      onPress={() => confirmDelete(() => removeFavorite(id))}
    >
      <Text style={styles.actionText}>Eliminar</Text>
    </Pressable>
  );

  const renderItem = ({ item, drag, isActive }) => (
    <ScaleDecorator>
      <Swipeable renderRightActions={() => renderRightActions(item.id)}>
        <ProductCard
          item={item}
          layout="horizontal"
          onPress={() => router.push(`/producto/${item.id}`)} // <-- 3. Navegación al detalle
          onLongPress={drag}
          disabled={isActive}
          rightAction={
            <Ionicons name="menu" size={28} color={COLORS.textLight} />
          }
        />
      </Swipeable>
    </ScaleDecorator>
  );

  if (favorites.length === 0) {
    return (
      <View style={GLOBAL_STYLES.centeredContainer}>
        <Ionicons
          name="heart-outline"
          size={48}
          color={COLORS.textLight}
          style={{ marginBottom: SPACING.medium }}
        />
        <Text style={[GLOBAL_STYLES.bodyText, { textAlign: "center" }]}>
          No hay favoritos guardados.
        </Text>
      </View>
    );
  }

  return (
    <DraggableFlatList
      data={favorites}
      onDragEnd={({ data }) => reorderFavorites(data)}
      keyExtractor={(item) => item.id.toString()}
      renderItem={renderItem}
      contentContainerStyle={{ padding: SPACING.large }}
      containerStyle={{ flex: 1, backgroundColor: COLORS.background }}
    />
  );
}

const styles = StyleSheet.create({
  deleteAction: {
    backgroundColor: COLORS.danger,
    justifyContent: "center",
    alignItems: "center",
    width: 80,
    marginBottom: SPACING.medium,
    borderRadius: 8,
  },
  actionText: { color: COLORS.white, fontWeight: "600" },
});
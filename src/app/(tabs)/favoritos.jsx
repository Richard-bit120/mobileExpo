import React, { useContext } from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import DraggableFlatList, {
  ScaleDecorator,
} from "react-native-draggable-flatlist";
import Swipeable from "react-native-gesture-handler/Swipeable";
import { FavoritesContext } from "../../context/FavoritesContext";
import { COLORS, SPACING, GLOBAL_STYLES } from "../../constants/theme";
import { ProductCard } from "../../components/ProductCard";
import { Ionicons } from "@expo/vector-icons";
import { confirmDelete } from "../../utils/helpers"; // <-- Importamos correctamente desde helpers

export default function FavoritesScreen() {
  const { favorites, removeFavorite, reorderFavorites } =
    useContext(FavoritesContext);

  // ❌ Eliminamos la función local duplicada y usamos directamente la importada de helpers.
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

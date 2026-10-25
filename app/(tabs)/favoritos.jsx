import React, { useContext } from "react";
import { View, Text, Image, StyleSheet, Alert, Pressable } from "react-native";
import DraggableFlatList, {
  ScaleDecorator,
} from "react-native-draggable-flatlist";
import Swipeable from "react-native-gesture-handler/Swipeable";
import { FavoritesContext } from "../../context/FavoritesContext";

export default function FavoritesScreen() {
  const { favorites, removeFavorite, reorderFavorites } =
    useContext(FavoritesContext);

  const confirmDelete = (id) => {
    Alert.alert("Eliminar", "¿Seguro que deseas quitar este favorito?", [
      { text: "Cancelar", style: "cancel" },
      {
        text: "Eliminar",
        style: "destructive",
        onPress: () => removeFavorite(id),
      },
    ]);
  };

  const renderRightActions = (id) => (
    <Pressable style={styles.deleteAction} onPress={() => confirmDelete(id)}>
      <Text style={styles.actionText}>Eliminar</Text>
    </Pressable>
  );

  const renderItem = ({ item, drag, isActive }) => (
    <ScaleDecorator>
      <Swipeable renderRightActions={() => renderRightActions(item.id)}>
        <Pressable
          onLongPress={drag}
          disabled={isActive}
          style={[
            styles.itemContainer,
            { backgroundColor: isActive ? "#f0f0f0" : "#fff" },
          ]}
        >
          <Image
            source={{ uri: item.image }}
            style={styles.image}
            resizeMode="contain"
          />
          <Text style={styles.title} numberOfLines={1}>
            {item.title}
          </Text>
          <Text style={styles.dragText}>☰</Text>
        </Pressable>
      </Swipeable>
    </ScaleDecorator>
  );

  if (favorites.length === 0) {
    return (
      <View style={styles.center}>
        <Text>No hay favoritos guardados.</Text>
      </View>
    );
  }

  return (
    <DraggableFlatList
      data={favorites}
      onDragEnd={({ data }) => reorderFavorites(data)}
      keyExtractor={(item) => item.id.toString()}
      renderItem={renderItem}
      containerStyle={{ flex: 1 }}
    />
  );
}

const styles = StyleSheet.create({
  center: { flex: 1, justifyContent: "center", alignItems: "center" },
  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    borderBottomWidth: 1,
    borderColor: "#eee",
  },
  image: { width: 50, height: 50, marginRight: 15 },
  title: { flex: 1, fontSize: 16 },
  dragText: { fontSize: 24, color: "#ccc", padding: 10 },
  deleteAction: {
    backgroundColor: "red",
    justifyContent: "center",
    alignItems: "center",
    width: 80,
  },
  actionText: { color: "white", fontWeight: "bold" },
});

import React, { useContext } from "react";
import { View, Text, Button, Image, StyleSheet, Alert } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { UserContext } from "../../context/UserContext";

export default function ProfileScreen() {
  const { user, updateAvatar } = useContext(UserContext);

  const takePhoto = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("Permiso denegado", "Se necesita acceso a la cámara.");
      return;
    }
    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.5,
    });
    if (!result.canceled) updateAvatar(result.assets[0].uri);
  };

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("Permiso denegado", "Se necesita acceso a la galería.");
      return;
    }
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.5,
    });
    if (!result.canceled) updateAvatar(result.assets[0].uri);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.name}>{user.nombre}</Text>
      <View style={styles.avatarContainer}>
        {user.avatar ? (
          <Image source={{ uri: user.avatar }} style={styles.avatar} />
        ) : (
          <Text style={styles.placeholder}>Sin Foto</Text>
        )}
      </View>

      <View style={styles.buttonContainer}>
        <Button title="Tomar Foto" onPress={takePhoto} />
        <View style={{ height: 10 }} />
        <Button title="Cargar de Galería" onPress={pickImage} color="green" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: "center", padding: 20 },
  name: { fontSize: 24, fontWeight: "bold", marginBottom: 20 },
  avatarContainer: {
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: "#ddd",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 30,
    overflow: "hidden",
  },
  avatar: { width: "100%", height: "100%" },
  placeholder: { color: "#666" },
  buttonContainer: { width: "80%" },
});

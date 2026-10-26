import React, { useContext } from "react";
import { View, Text, Image, StyleSheet, Alert, Pressable } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { Ionicons } from "@expo/vector-icons";
import { UserContext } from "../../context/UserContext";
import { AppButton } from "../../components/AppButton";
import { COLORS, SPACING, GLOBAL_STYLES } from "../../constants/theme";
import { confirmRemoveAvatar } from "../../utils/helpers";

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
      mediaTypes: ["images"],
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.5,
    });
    if (!result.canceled) updateAvatar(result.assets[0].uri);
  };

  const removeAvatar = () => {
    updateAvatar(null);
  };

  return (
    <View style={[GLOBAL_STYLES.screenContainer, { alignItems: "stretch" }]}>
      {/* Tarjeta 1: Información del Usuario */}
      <View style={GLOBAL_STYLES.card}>
        <View style={styles.avatarWrapper}>
          <View style={styles.avatarContainer}>
            {user.avatar ? (
              <Image source={{ uri: user.avatar }} style={styles.avatar} />
            ) : (
              <Ionicons name="person" size={60} color={COLORS.textLight} />
            )}
          </View>
        </View>
        {/* Usamos GLOBAL_STYLES en lugar de estilos sueltos */}
        <Text style={[GLOBAL_STYLES.titleScreen, styles.name]}>
          {user.nombre || "Arzamendia Ricardo"}
        </Text>
        <Text style={[GLOBAL_STYLES.bodyText, styles.email]}>
          {user.email || "34364969@roquegonzalez.org"}
        </Text>
      </View>

      {/* Tarjeta 2: Acciones de fotografía */}
      <View style={GLOBAL_STYLES.card}>
        <Text style={GLOBAL_STYLES.sectionTitle}>Foto de perfil</Text>
        <Text style={[GLOBAL_STYLES.bodyText, styles.descriptionSpacing]}>
          Elegí una imagen de tu galería o capturá una nueva con la cámara del
          dispositivo.
        </Text>

        <AppButton
          title="Elegir de la galería"
          onPress={pickImage}
          variant="primary"
          icon={
            <Ionicons name="image-outline" size={20} color={COLORS.white} />
          }
        />

        <AppButton
          title="Tomar una fotografía"
          onPress={takePhoto}
          variant="secondary"
          icon={
            <Ionicons name="camera-outline" size={20} color={COLORS.primary} />
          }
        />

        <Pressable
          onPress={() => confirmRemoveAvatar(user.avatar, removeAvatar)}
          style={styles.removeAction}
        >
          <Text style={styles.removeText}>Quitar foto de perfil</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  avatarWrapper: {
    alignItems: "center",
    marginBottom: SPACING.large,
  },
  avatarContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: COLORS.background,
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
    borderWidth: 3,
    borderColor: COLORS.primary,
  },
  avatar: {
    width: "100%",
    height: "100%",
  },
  name: {
    textAlign: "center",
    marginBottom: 4,
    fontSize: 20, // Ajustado armónicamente con la escala global
  },
  email: {
    textAlign: "center",
  },
  descriptionSpacing: {
    marginBottom: SPACING.xlarge,
  },
  removeAction: {
    marginTop: SPACING.large,
    alignItems: "center",
    paddingVertical: SPACING.small,
  },
  removeText: {
    color: COLORS.danger,
    fontWeight: "600",
    fontSize: 14,
  },
});

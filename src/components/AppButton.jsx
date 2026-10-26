import React from "react";
import {
  TouchableOpacity,
  Text,
  ActivityIndicator,
  StyleSheet,
} from "react-native";

export const AppButton = ({
  title,
  onPress,
  variant = "primary",
  disabled = false,
  loading = false,
  icon,
  style,
}) => {
  // Determinamos el estilo base según la variante (puedes ajustar los colores a tu diseño)
  const isPrimary = variant === "primary";

  const backgroundColor = isPrimary ? "#007AFF" : "#E8F0FE";
  const textColor = isPrimary ? "#FFFFFF" : "#007AFF";
  const disabledColor = "#A1A1AA";

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.8}
      style={[
        styles.button,
        { backgroundColor: disabled ? disabledColor : backgroundColor },
        style, // Permite sobrescribir estilos desde el componente padre si es estrictamente necesario
      ]}
    >
      {loading ? (
        <ActivityIndicator color={textColor} />
      ) : (
        <Text style={[styles.text, { color: textColor }]}>{title}</Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    height: 52,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 16,
    flexDirection: "row",
    marginVertical: 8,
  },
  text: {
    fontSize: 16,
    fontWeight: "600",
  },
});

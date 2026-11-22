import React from "react";
import {
  TouchableOpacity,
  Text,
  ActivityIndicator,
  StyleSheet,
} from "react-native";
import { COLORS, SPACING } from "../constants/theme";

const VARIANT_STYLES = {
  primary: {
    backgroundColor: COLORS.primary,
    textColor: COLORS.white,
  },
  secondary: {
    backgroundColor: COLORS.primaryLight,
    textColor: COLORS.primary,
  },
  danger: {
    backgroundColor: COLORS.danger,
    textColor: COLORS.white,
  },
};

export const AppButton = ({
  title,
  onPress,
  variant = "primary",
  disabled = false,
  loading = false,
  icon,
  style,
}) => {
  const currentVariant = VARIANT_STYLES[variant] || VARIANT_STYLES.primary;
  const backgroundColor = disabled
    ? COLORS.textMuted
    : currentVariant.backgroundColor;
  const textColor = currentVariant.textColor;

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.8}
      style={[styles.button, { backgroundColor }, style]}
    >
      {loading ? (
        <ActivityIndicator color={textColor} />
      ) : (
        <>
          {icon}
          <Text style={[styles.text, { color: textColor }]}>{title}</Text>
        </>
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
    paddingHorizontal: SPACING.large,
    flexDirection: "row",
    gap: SPACING.small,
    marginVertical: SPACING.small,
  },
  text: {
    fontSize: 16,
    fontWeight: "600",
  },
});
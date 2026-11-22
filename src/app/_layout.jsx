import { Stack } from "expo-router";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { FavoritesProvider } from "../context/FavoritesContext";
import { UserProvider } from "../context/UserContext";
import { CartProvider } from "../context/CartContext";
import { StyleSheet } from "react-native";

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={styles.container}>
      <UserProvider>
        <FavoritesProvider>
          <CartProvider>
            <Stack>
              <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
              <Stack.Screen name="producto/[id]" options={{ title: "Volver" }} />
            </Stack>
          </CartProvider>
        </FavoritesProvider>
      </UserProvider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
});
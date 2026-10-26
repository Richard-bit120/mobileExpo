import { Tabs } from "expo-router";
// 1. Importamos nuestro sistema de colores
import { COLORS } from "../../constants/theme";
// Agregamos Ionicons (una de las librerías más populares para apps móviles)
import { Ionicons } from "@expo/vector-icons";
import { LogBox } from "react-native";
import { FavoriteIcon } from "../../components/FavoriteIcon";

LogBox.ignoreLogs([
  "InteractionManager has been deprecated", // <-- Oculta el aviso de la lista arrastrable
]);

// 2. Oculta el aviso de texto en la terminal de comandos
const originalWarn = console.warn;
console.warn = (...args) => {
  const message = args.join(" ");
  // Si el mensaje contiene la advertencia específica, lo ignoramos silenciosamente
  if (message.includes("InteractionManager has been deprecated")) {
    return;
  }
  // Si es cualquier otro error, lo mostramos normalmente
  originalWarn(...args);
};

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        // 2. Reemplazamos el "blue" hardcodeado por nuestro color primario
        tabBarActiveTintColor: COLORS.primary,
        // Añadimos el color para las pestañas inactivas
        tabBarInactiveTintColor: COLORS.textLight,

        // 3. Estilizamos la barra inferior (Tab Bar) para un look moderno y plano
        tabBarStyle: {
          backgroundColor: COLORS.surface,
          borderTopColor: COLORS.border,
          borderTopWidth: 1,
          elevation: 0, // Quita la sombra en Android
          shadowOpacity: 0, // Quita la sombra en iOS
        },

        // 4. Estilizamos el encabezado superior (Header) para que coincida
        headerStyle: {
          backgroundColor: COLORS.surface,
          borderBottomColor: COLORS.border,
          borderBottomWidth: 1,
          elevation: 0,
          shadowOpacity: 0,
        },
        headerTintColor: COLORS.text,
        headerTitleStyle: {
          fontWeight: "600",
        },

        // 5. Aplicamos el color de fondo base a todas las pantallas de las tabs
        sceneContainerStyle: {
          backgroundColor: COLORS.background,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Catálogo",
          tabBarLabel: "Productos",
          // Agregamos el icono de tienda/catálogo
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="storefront" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="favoritos"
        options={{
          title: "Mis Favoritos",
          tabBarLabel: "Favoritos",
          tabBarIcon: ({ color, size }) => (
            <FavoriteIcon
              isFavorite={true}
              name="heart"
              size={size}
              color={color} // <-- Hereda el color dinámico de la pestaña activa/inactiva
            />
          ),
        }}
      />
      <Tabs.Screen
        name="perfil"
        options={{
          title: "Mi Perfil",
          tabBarLabel: "Perfil",
          // Agregamos el icono de usuario
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}

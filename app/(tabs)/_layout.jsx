import { Tabs } from "expo-router";

export default function TabLayout() {
  return (
    <Tabs screenOptions={{ tabBarActiveTintColor: "blue" }}>
      <Tabs.Screen
        name="index"
        options={{ title: "Catálogo", tabBarLabel: "Productos" }}
      />
      <Tabs.Screen
        name="favoritos"
        options={{ title: "Mis Favoritos", tabBarLabel: "Favoritos" }}
      />
      <Tabs.Screen
        name="perfil"
        options={{ title: "Mi Perfil", tabBarLabel: "Perfil" }}
      />
    </Tabs>
  );
}

import React, { useContext } from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

// Contexto, componentes y tema del proyecto
import { CartContext } from "../../context/CartContext";
import { AppButton } from "../../components/AppButton";
import { COLORS, SPACING, GLOBAL_STYLES } from "../../constants/theme";
import {
  confirmRemoveFromCart,
  confirmCheckout,
  notifyCheckoutSuccess,
} from "../../utils/helpers";

export default function CarritoScreen() {
  const router = useRouter();
  const {
    cart,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
    clearCart,
    getCartTotal,
    isLoading,
    error,
  } = useContext(CartContext);

  // Confirmación clara antes de eliminar un producto del carrito
  const handleConfirmRemove = (item) => {
    confirmRemoveFromCart(item.title, () => removeFromCart(item.id));
  };

  // Confirmación y cierre de compra simulada
  const handleCheckout = () => {
    confirmCheckout(getCartTotal(), () => {
      clearCart();
      notifyCheckoutSuccess();
    });
  };

  // Estado 1: Cargando datos iniciales desde AsyncStorage
  if (isLoading) {
    return (
      <View style={GLOBAL_STYLES.centeredContainer}>
        <ActivityIndicator size="large" color={COLORS.primary} />
      </View>
    );
  }

  // Estado 2: Carrito vacío
  if (cart.length === 0) {
    return (
      <View style={[GLOBAL_STYLES.centeredContainer, styles.emptyContainer]}>
        {error ? (
          <View style={styles.errorBanner}>
            <Text style={styles.errorText}>{error}</Text>
          </View>
        ) : null}

        <Ionicons
          name="cart-outline"
          size={64}
          color={COLORS.textMuted}
          style={styles.emptyIcon}
        />
        <Text style={GLOBAL_STYLES.sectionTitle}>Tu carrito está vacío</Text>
        <Text style={[GLOBAL_STYLES.bodyText, styles.emptySubtitle]}>
          Agrega productos desde el catálogo para verlos aquí.
        </Text>
        <AppButton
          title="Ir al catálogo"
          onPress={() => router.push("/")}
          variant="primary"
          style={styles.emptyButton}
        />
      </View>
    );
  }

  // Cálculo derivado del total general
  const totalGeneral = getCartTotal();

  // Renderizado de cada producto dentro de la FlatList
  const renderCartItem = ({ item }) => {
    const unitPrice = Number(item.price) || 0;
    const subtotal = unitPrice * item.quantity;
    const isMinQuantity = item.quantity <= 1;

    return (
      <View style={[GLOBAL_STYLES.card, styles.itemCard]}>
        <Image
          source={{ uri: item.image }}
          style={styles.productImage}
          resizeMode="contain"
        />

        <View style={styles.itemContent}>
          {/* Título y botón independiente para eliminar */}
          <View style={styles.headerRow}>
            <Text style={styles.productTitle} numberOfLines={2}>
              {item.title}
            </Text>
            <TouchableOpacity
              onPress={() => handleConfirmRemove(item)}
              style={styles.deleteButton}
              accessibilityLabel="Eliminar producto"
            >
              <Ionicons name="trash-outline" size={20} color={COLORS.danger} />
            </TouchableOpacity>
          </View>

          {/* Precio unitario */}
          <Text style={styles.unitPrice}>
            Precio unitario: $ {unitPrice.toFixed(2)}
          </Text>

          {/* Controles de cantidad y subtotal del producto */}
          <View style={styles.footerRow}>
            <View style={styles.quantityControls}>
              <TouchableOpacity
                onPress={() => decreaseQuantity(item.id)}
                disabled={isMinQuantity}
                style={[
                  styles.qtyButton,
                  isMinQuantity && styles.qtyButtonDisabled,
                ]}
              >
                <Text
                  style={[
                    styles.qtyButtonText,
                    isMinQuantity && styles.qtyButtonTextDisabled,
                  ]}
                >
                  -
                </Text>
              </TouchableOpacity>

              <Text style={styles.quantityValue}>{item.quantity}</Text>

              <TouchableOpacity
                onPress={() => increaseQuantity(item.id)}
                style={styles.qtyButton}
              >
                <Text style={styles.qtyButtonText}>+</Text>
              </TouchableOpacity>
            </View>

            <Text style={styles.subtotalText}>
              Subtotal: $ {subtotal.toFixed(2)}
            </Text>
          </View>
        </View>
      </View>
    );
  };

  // Estado 3: Carrito con productos
  return (
    <View style={styles.container}>
      {error ? (
        <View style={styles.errorBanner}>
          <Text style={styles.errorText}>{error}</Text>
        </View>
      ) : null}

      <FlatList
        data={cart}
        keyExtractor={(item) => String(item.id)}
        renderItem={renderCartItem}
        contentContainerStyle={styles.listContent}
      />

      {/* Resumen del Total General y Botón de Compra */}
      <View style={styles.summaryContainer}>
        <View style={styles.totalRow}>
          <Text style={styles.totalLabel}>Total del carrito</Text>
          <Text style={styles.totalAmount}>$ {totalGeneral.toFixed(2)}</Text>
        </View>

        <AppButton
          title="Finalizar compra"
          onPress={handleCheckout}
          variant="primary"
          style={styles.checkoutButton}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  listContent: {
    padding: SPACING.large,
    paddingBottom: SPACING.xxlarge,
  },
  emptyContainer: {
    padding: SPACING.xlarge,
  },
  emptyIcon: {
    marginBottom: SPACING.medium,
  },
  emptySubtitle: {
    textAlign: "center",
    marginBottom: SPACING.large,
  },
  emptyButton: {
    minWidth: 180,
  },
  errorBanner: {
    backgroundColor: COLORS.surface,
    borderColor: COLORS.danger,
    borderWidth: 1,
    borderRadius: 8,
    padding: SPACING.medium,
    margin: SPACING.large,
    marginBottom: 0,
  },
  errorText: {
    color: COLORS.danger,
    fontSize: 13,
    textAlign: "center",
  },
  itemCard: {
    flexDirection: "row",
    alignItems: "center",
    padding: SPACING.medium,
  },
  productImage: {
    width: 68,
    height: 68,
    borderRadius: 8,
    backgroundColor: COLORS.white,
    marginRight: SPACING.medium,
  },
  itemContent: {
    flex: 1,
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    gap: SPACING.small,
  },
  productTitle: {
    flex: 1,
    fontSize: 14,
    fontWeight: "600",
    color: COLORS.text,
    marginBottom: 4,
  },
  deleteButton: {
    padding: 4,
  },
  unitPrice: {
    fontSize: 13,
    color: COLORS.textLight,
    marginBottom: SPACING.small,
  },
  footerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 4,
  },
  quantityControls: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.background,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  qtyButton: {
    width: 30,
    height: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  qtyButtonDisabled: {
    opacity: 0.4,
  },
  qtyButtonText: {
    fontSize: 16,
    fontWeight: "700",
    color: COLORS.primary,
  },
  qtyButtonTextDisabled: {
    color: COLORS.textMuted,
  },
  quantityValue: {
    minWidth: 28,
    textAlign: "center",
    fontSize: 14,
    fontWeight: "600",
    color: COLORS.text,
  },
  subtotalText: {
    fontSize: 14,
    fontWeight: "700",
    color: COLORS.primary,
  },
  summaryContainer: {
    backgroundColor: COLORS.surface,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    padding: SPACING.large,
  },
  totalRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  totalLabel: {
    fontSize: 16,
    fontWeight: "600",
    color: COLORS.text,
  },
  totalAmount: {
    fontSize: 20,
    fontWeight: "700",
    color: COLORS.primary,
  },
  checkoutButton: {
    marginTop: SPACING.medium,
    marginBottom: 0,
  },
});
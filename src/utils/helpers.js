import { Alert } from "react-native";

// ==========================================
// 1. FUNCIONES BASE REUTILIZABLES
// ==========================================

const showInfo = (title, message) => {
    Alert.alert(title, message);
};

const confirmAction = ({
    title,
    message,
    confirmText = "Eliminar",
    isDestructive = true,
    onConfirm,
}) => {
    Alert.alert(title, message, [
        { text: "Cancelar", style: "cancel" },
        {
            text: confirmText,
            style: isDestructive ? "destructive" : "default",
            onPress: onConfirm,
        },
    ]);
};

// ==========================================
// 2. ALERTAS DE LA APLICACIÓN
// ==========================================

/**
 * Muestra una alerta estándar cuando se agrega un producto a favoritos.
 */
export const notifyFavoriteAdded = () => {
    showInfo("¡Éxito!", "Producto agregado a favorito");
};

export const confirmDelete = (onDelete) => {
    confirmAction({
        title: "Eliminar",
        message: "¿Seguro que deseas quitar este favorito?",
        onConfirm: onDelete,
    });
};

export const notifyCartAdded = () => {
    showInfo("Carrito", "¡Añadido al carrito!");
};

export const confirmRemoveFromCart = (productTitle, onConfirm) => {
    confirmAction({
        title: "Eliminar producto",
        message: `¿Seguro que deseas quitar "${productTitle}" del carrito?`,
        onConfirm,
    });
};

export const confirmCheckout = (total, onConfirm) => {
    confirmAction({
        title: "Finalizar compra",
        message: `¿Confirmás tu compra por un total de $ ${total.toFixed(2)}?`,
        confirmText: "Confirmar",
        isDestructive: false,
        onConfirm,
    });
};

export const notifyCheckoutSuccess = () => {
    showInfo("¡Compra realizada!", "Tu pedido fue procesado con éxito.");
};

export const confirmRemoveAvatar = (currentAvatar, onConfirm) => {
    if (!currentAvatar) return;

    confirmAction({
        title: "Eliminar foto",
        message: "¿Estás seguro de que deseas quitar tu foto de perfil?",
        onConfirm,
    });
};
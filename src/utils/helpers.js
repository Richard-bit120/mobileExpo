import { Alert } from "react-native";

/**
 * Muestra una alerta estándar cuando se agrega un producto a favoritos.
 */
export const notifyFavoriteAdded = () => {
    Alert.alert("¡Éxito!", "Producto agregado a favorito");
};

export const confirmDelete = (onDelete) => {
    Alert.alert("Eliminar", "¿Seguro que deseas quitar este favorito?", [
        { text: "Cancelar", style: "cancel" },
        {
            text: "Eliminar",
            style: "destructive",
            onPress: onDelete,
        },
    ]);
};

export const notifyCartAdded = () => {
    Alert.alert("Carrito", "¡Añadido al carrito!");
};

export const confirmRemoveAvatar = (currentAvatar, onConfirm) => {
    // Si no hay foto, no hacemos nada
    if (!currentAvatar) return;

    Alert.alert(
        "Eliminar foto",
        "¿Estás seguro de que deseas quitar tu foto de perfil?",
        [
            { text: "Cancelar", style: "cancel" },
            {
                text: "Eliminar",
                style: "destructive",
                onPress: onConfirm,
            },
        ]
    );
};
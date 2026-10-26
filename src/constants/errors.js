// src/constants/errors.js

// 1. Centralización de códigos de estado HTTP (Evitar "Magic Numbers")
export const HTTP_STATUS = {
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    TIMEOUT: 408,
    SERVER_ERROR: 500,
};

export const ERROR_MESSAGES = {
    NETWORK_ERROR: 'No hay conexión a internet. Verifica tu red e intenta de nuevo.',
    TIMEOUT_ERROR: 'El servidor está tardando demasiado en responder.',
    BAD_REQUEST: 'Los datos enviados no son válidos. Por favor, revísalos.',
    NOT_FOUND: 'El recurso solicitado no existe.',
    UNAUTHORIZED: 'No tienes permisos o tu sesión expiró. Inicia sesión.',
    SERVER_ERROR: 'Hubo un problema en nuestros servidores. Inténtalo más tarde.',
    UNKNOWN: 'Ocurrió un error inesperado. Por favor, vuelve a intentarlo.',
};

// 2. Mapa de errores (Diccionario) en lugar de múltiples sentencias IF
const ERROR_MAP = {
    [HTTP_STATUS.BAD_REQUEST]: ERROR_MESSAGES.BAD_REQUEST,
    [HTTP_STATUS.UNAUTHORIZED]: ERROR_MESSAGES.UNAUTHORIZED,
    [HTTP_STATUS.FORBIDDEN]: ERROR_MESSAGES.UNAUTHORIZED,
    [HTTP_STATUS.NOT_FOUND]: ERROR_MESSAGES.NOT_FOUND,
    [HTTP_STATUS.TIMEOUT]: ERROR_MESSAGES.TIMEOUT_ERROR,
};

/**
 * Función utilitaria para mapear el estado HTTP al mensaje correcto
 */
export const getErrorMessageByStatus = (status) => {
    if (status >= HTTP_STATUS.SERVER_ERROR) {
        return ERROR_MESSAGES.SERVER_ERROR;
    }

    return ERROR_MAP[status] || ERROR_MESSAGES.UNKNOWN;
};
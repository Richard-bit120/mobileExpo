// src/constants/theme.js
import { StyleSheet } from 'react-native';

export const COLORS = {
    // Fondos y Superficies
    background: '#F8FAFC', // Slate 50: Fondo ultra limpio
    surface: '#FFFFFF',    // Blanco puro para tarjetas

    // Color de Marca / Acciones
    primary: '#4F46E5',    // Indigo moderno
    primaryLight: '#E0E7FF',// Indigo suave para estados active/selected

    // Textos
    text: '#0F172A',       // Slate 900: Texto principal nítido
    textLight: '#64748B',  // Slate 500: Subtítulos e iconos
    textMuted: '#94A3B8',  // Slate 400: Textos secundarios o deshabilitados

    // Bordes y separadores
    border: '#E2E8F0',     // Slate 200: Sutil y elegante

    // Semánticos
    danger: '#EF4444',     // Rojo moderno
    success: '#10B981',    // Verde esmeralda

    white: '#FFFFFF',
};

export const SPACING = {
    small: 8,
    medium: 12,
    large: 16,
    xlarge: 20,
    xxlarge: 30,
};

export const GLOBAL_STYLES = StyleSheet.create({
    centeredContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: COLORS.background,
    },
    screenContainer: {
        flex: 1,
        padding: SPACING.large,
        backgroundColor: COLORS.background,
    },
    // Tipografías modernas unificadas
    titleScreen: {
        fontSize: 24,
        fontWeight: '700',
        color: COLORS.text,
        marginBottom: SPACING.medium,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: COLORS.text,
        marginBottom: SPACING.small,
    },
    bodyText: {
        fontSize: 14,
        fontWeight: '400',
        color: COLORS.textLight,
        lineHeight: 20,
    },
    priceText: {
        fontSize: 18,
        fontWeight: '700',
        color: COLORS.primary,
    },
    // Estándar de Tarjeta Moderna (Soft shadow + bordes limpios)
    card: {
        backgroundColor: COLORS.surface,
        borderRadius: 16, // Bordes más redondeados, tendencia actual
        padding: SPACING.large,
        marginBottom: SPACING.medium,
        borderWidth: 1,
        borderColor: COLORS.border, // Borde sutil tipo "Card border style" de Tailwind
        elevation: 2,
        shadowColor: '#0F172A',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.03,
        shadowRadius: 8,
    },
});
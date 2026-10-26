import { useState, useEffect, useCallback } from 'react';
import { ERROR_MESSAGES, getErrorMessageByStatus } from '../constants/errors';

export const useFetch = (url) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchData = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await fetch(url);

            // 1. Manejo de errores HTTP (404, 500, etc.)
            if (!response.ok) {
                throw new Error(getErrorMessageByStatus(response.status));
            }

            const result = await response.json();
            setData(result);
        } catch (err) {
            // 2. Manejo de caídas de red o errores de ejecución
            // Si el error original de JS indica un fallo de red, usamos tu constante NETWORK_ERROR
            const isNetworkError = err.message.includes('Network request failed') || err.message.includes('Failed to fetch');

            setError(isNetworkError ? ERROR_MESSAGES.NETWORK_ERROR : err.message);
        } finally {
            setLoading(false);
        }
    }, [url]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    return { data, loading, error, refetch: fetchData };
};
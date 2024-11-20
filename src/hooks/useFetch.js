import React from 'react';
import { getToken } from '../authService';

const useFetch = () => {
    const [data, setData] = React.useState(null);
    const [error, setError] = React.useState(null);
    const [loading, setLoading] = React.useState(false);

    const getData = React.useCallback(async (endpoint, options = {}) => {
        try {
            const token = getToken();
            setLoading(true);
            setError(null);
            const response = await fetch(endpoint, {
                method: 'GET',
                headers: {
                    Authorization: token ? `Bearer ${token}` : undefined,
                    'Content-Type': 'application/json',
                    ...options.headers,
                },
                ...options,
            });

            const result = await response.json();

            if (response.status >= 300) {
                setError(result);
                return {
                    result,
                    hasError: true,
                };
            } 
            setData(result);
            return {
                result,
                hasError: false,
            };
        } catch (err) {
           setError(err);
        } finally {
            setLoading(false);
        }
    }, []);

    return { getData, loading, data, error };
}

export default useFetch;
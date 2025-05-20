export const fetchWithToken = async (url, options = {}) => {
    let token = localStorage.getItem('token');

    const response = await fetch(url, {
        ...options,
        headers: {
            ...options.headers,
            Authorization: `Bearer ${token}`,
        },
    });

    if (response.status === 401) {
        // Token expired, try refreshing it
        const refreshToken = localStorage.getItem('refreshToken');
        if (!refreshToken) {
            throw new Error('Session expired. Please log in again.');
        }

        const refreshResponse = await fetch('http://localhost:5000/api/refresh-token', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ token: refreshToken }),
        });

        if (refreshResponse.ok) {
            const data = await refreshResponse.json();
            localStorage.setItem('token', data.accessToken);

            // Retry the original request with the new token
            return fetch(url, {
                ...options,
                headers: {
                    ...options.headers,
                    Authorization: `Bearer ${data.accessToken}`,
                },
            });
        } else {
            throw new Error('Session expired. Please log in again.');
        }
    }

    return response;
};
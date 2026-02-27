import axios from 'axios';

// Base instance for public calls (Login, Refresh)
export const axiosPublic = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL || 'https://api.raga.ai/v1',
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true // Important for HTTP-only cookies
});

// Private instance with interceptors for memory-token
const axiosPrivate = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL || 'https://api.raga.ai/v1',
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true
});

export const setupInterceptors = (getAccessToken, setAccessToken, logout) => {
    // REQUEST INTERCEPTOR: Inject the in-memory token
    const requestIntercept = axiosPrivate.interceptors.request.use(
        config => {
            if (!config.headers['Authorization']) {
                const token = getAccessToken();
                if (token) {
                    config.headers['Authorization'] = `Bearer ${token}`;
                }
            }
            return config;
        },
        error => Promise.reject(error)
    );

    // RESPONSE INTERCEPTOR: Handle 401 and Silent Refresh
    const responseIntercept = axiosPrivate.interceptors.response.use(
        response => response,
        async (error) => {
            const prevRequest = error?.config;

            // If error is 401 and we haven't retried yet
            if (error?.response?.status === 401 && !prevRequest?.sent) {
                prevRequest.sent = true;

                try {
                    // Attempt silent refresh via HTTP-only cookie
                    const result = await axiosPublic.post('/auth/refresh');
                    const newAccessToken = result.data.accessToken;

                    setAccessToken(newAccessToken);

                    // Retry original request with new token
                    prevRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
                    return axiosPrivate(prevRequest);
                } catch (refreshError) {
                    // Refresh failed (cookie expired or invalid)
                    logout();
                    return Promise.reject(refreshError);
                }
            }
            return Promise.reject(error);
        }
    );

    return () => {
        axiosPrivate.interceptors.request.eject(requestIntercept);
        axiosPrivate.interceptors.response.eject(responseIntercept);
    };
};

export default axiosPrivate;

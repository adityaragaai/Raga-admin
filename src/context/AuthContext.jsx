import React, { createContext, useContext, useState, useEffect } from 'react';
import { axiosPublic, setupInterceptors } from '../api/axios';

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [accessToken, setAccessToken] = useState(null);
    const [isHydrating, setIsHydrating] = useState(true);

    // Logout function
    const logout = () => {
        setUser(null);
        setAccessToken(null);
        // Optional: call backend logout to clear HTTP-only cookie
        axiosPublic.post('/auth/logout').catch(() => { });
    };

    // Helper for interceptors to get latest token
    const getAccessToken = () => accessToken;

    // Use effect to set up interceptors whenever accessToken setter changes
    useEffect(() => {
        const cleanup = setupInterceptors(getAccessToken, setAccessToken, logout);
        return cleanup;
    }, [accessToken]);

    // Session Hydration: Attempt to get a new access token on mount/refresh
    useEffect(() => {
        const hydrateSession = async () => {
            try {
                // Request new access token using the HTTP-only Refresh Cookie
                const response = await axiosPublic.post('/auth/refresh');
                const { user, accessToken } = response.data;
                setUser(user);
                setAccessToken(accessToken);
            } catch (err) {
                console.log("No active session found.");
            } finally {
                setIsHydrating(false);
            }
        };

        hydrateSession();
    }, []);

    const login = async (credentials) => {
        // DEMO MODE: For testing purposes before backend integration
        if (credentials.email === 'admin@raga.ai' && credentials.password === 'admin123') {
            await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate lag
            const mockData = {
                user: {
                    name: 'RagaAI Admin',
                    role: 'Super Admin',
                    email: 'admin@raga.ai',
                    avatar: 'https://i.pravatar.cc/150?u=aditya'
                },
                accessToken: 'mock-jwt-token-for-demo'
            };
            setUser(mockData.user);
            setAccessToken(mockData.accessToken);
            return mockData.user;
        }

        // Real API Call
        const response = await axiosPublic.post('/auth/login', credentials);
        const { user: userData, accessToken: token } = response.data;
        setUser(userData);
        setAccessToken(token);
        return userData;
    };

    return (
        <AuthContext.Provider value={{
            user,
            accessToken,
            isHydrating,
            login,
            logout,
            isAuthenticated: !!accessToken
        }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);

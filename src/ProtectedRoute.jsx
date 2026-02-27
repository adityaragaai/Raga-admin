import React from 'react';
import { useAuth } from './context/AuthContext';
import SignIn from './components/SignIn';

const ProtectedRoute = ({ children }) => {
    const { isAuthenticated, isHydrating } = useAuth();

    // Show a high-end loader while checking session hydration
    if (isHydrating) {
        return (
            <div className="flex min-h-screen w-full bg-[#0A0F1E] items-center justify-center">
                <div className="relative group">
                    <div className="absolute -inset-4 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200 animate-pulse"></div>
                    <div className="relative w-16 h-16 border-4 border-blue-600/20 border-t-blue-600 rounded-full animate-spin shadow-2xl shadow-blue-600/30"></div>
                </div>
            </div>
        );
    }

    if (!isAuthenticated) {
        return <SignIn />;
    }

    return children;
};

export default ProtectedRoute;

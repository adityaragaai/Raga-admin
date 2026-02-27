import React from 'react';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './ProtectedRoute';
import Dashboard from './components/Dashboard';

function App() {
  return (
    <AuthProvider>
      <main>
        <ProtectedRoute>
          <Dashboard />
        </ProtectedRoute>
      </main>
    </AuthProvider>
  );
}

export default App;

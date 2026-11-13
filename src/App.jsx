import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Patients from './pages/Patients';
import MedicalHistory from './pages/MedicalHistory';
import Reports from './pages/Reports';
import Consultations from './pages/Consultations';
import Nutrition from './pages/Nutrition';
import Wellness from './pages/Wellness';
import AccessControl from './pages/AccessControl';
import NotFound from './pages/NotFound';
import Signup from './pages/Signup';

function ProtectedRoute({ children, adminOnly = false }) {
  const { isAuthenticated, currentUser } = useAuth();
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  if (adminOnly && currentUser?.role !== 'Admin') return <Navigate to="/dashboard" replace />;
  return children;
}

function AppRoutes() {
  const { isAuthenticated } = useAuth();
  return (
    <Routes>
      <Route path="/login" element={isAuthenticated ? <Navigate to="/dashboard" replace /> : <Login />} />
      <Route path="/signup" element={isAuthenticated ? <Navigate to="/dashboard" replace /> : <Signup />} />
      <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
      <Route path="/patients" element={<ProtectedRoute><Patients /></ProtectedRoute>} />
      <Route path="/medical-history" element={<ProtectedRoute><MedicalHistory /></ProtectedRoute>} />
      <Route path="/reports" element={<ProtectedRoute><Reports /></ProtectedRoute>} />
      <Route path="/consultations" element={<ProtectedRoute><Consultations /></ProtectedRoute>} />
      <Route path="/nutrition" element={<ProtectedRoute><Nutrition /></ProtectedRoute>} />
      <Route path="/wellness" element={<ProtectedRoute><Wellness /></ProtectedRoute>} />
      <Route path="/access-control" element={<ProtectedRoute adminOnly><AccessControl /></ProtectedRoute>} />
      <Route path="/" element={<Navigate to={isAuthenticated ? "/dashboard" : "/login"} replace />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter basename="/healthcare-platform">
        <AppRoutes />
      </BrowserRouter>
    </AuthProvider>
  );
}

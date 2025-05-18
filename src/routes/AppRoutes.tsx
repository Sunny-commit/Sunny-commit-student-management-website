import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

// Layouts
import DashboardLayout from '../layouts/DashboardLayout';
import AuthLayout from '../layouts/AuthLayout';

// Auth pages
import Login from '../pages/auth/Login';
import ForgotPassword from '../pages/auth/ForgotPassword';

// Dashboard pages
import Dashboard from '../pages/dashboard/Dashboard';
import Students from '../pages/dashboard/Students';
import StudentDetail from '../pages/dashboard/StudentDetail';
import Courses from '../pages/dashboard/Courses';
import Attendance from '../pages/dashboard/Attendance';
import Grades from '../pages/dashboard/Grades';
import Documents from '../pages/dashboard/Documents';
import Profile from '../pages/dashboard/Profile';
import Announcements from '../pages/dashboard/Announcements';

// Protected route component
const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

// Routes component
const AppRoutes = () => {
  return (
    <Routes>
      {/* Auth routes */}
      <Route element={<AuthLayout />}>
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
      </Route>

      {/* Protected routes */}
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <DashboardLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Dashboard />} />
        <Route path="students" element={<Students />} />
        <Route path="students/:id" element={<StudentDetail />} />
        <Route path="courses" element={<Courses />} />
        <Route path="attendance" element={<Attendance />} />
        <Route path="grades" element={<Grades />} />
        <Route path="documents" element={<Documents />} />
        <Route path="announcements" element={<Announcements />} />
        <Route path="profile" element={<Profile />} />
      </Route>

      {/* Redirect to dashboard if already logged in */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default AppRoutes;
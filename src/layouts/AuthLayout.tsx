import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { GraduationCap } from 'lucide-react';

const AuthLayout: React.FC = () => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="min-h-screen flex bg-gray-50">
      {/* Left side with background image and branding */}
      <div className="hidden lg:block lg:w-1/2 bg-blue-600 relative">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/90 to-blue-700/90"></div>
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-12">
          <GraduationCap size={64} className="mb-6" />
          <h1 className="text-4xl font-bold mb-4">EduManager Pro</h1>
          <p className="text-xl mb-8 text-center max-w-lg">
            The complete solution for educational institutions to manage students, courses, attendance, and more.
          </p>
          <div className="grid grid-cols-2 gap-8 w-full max-w-md">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <h3 className="font-semibold text-lg mb-2">For Administrators</h3>
              <p className="text-sm">Manage institution operations efficiently with powerful tools and reports.</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <h3 className="font-semibold text-lg mb-2">For Teachers</h3>
              <p className="text-sm">Easily manage attendance, grades, and communicate with students and parents.</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <h3 className="font-semibold text-lg mb-2">For Students</h3>
              <p className="text-sm">Access your grades, attendance, and course materials in one place.</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <h3 className="font-semibold text-lg mb-2">For Parents</h3>
              <p className="text-sm">Stay updated with your child's academic progress and school announcements.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Right side with auth forms */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6">
        <div className="w-full max-w-md">
          <div className="flex items-center justify-center mb-8 lg:hidden">
            <GraduationCap size={40} className="text-blue-600 mr-3" />
            <h1 className="text-2xl font-bold text-gray-800">EduManager Pro</h1>
          </div>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
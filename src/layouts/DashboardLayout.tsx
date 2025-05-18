import React, { useState } from 'react';
import { Outlet, NavLink, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import {
  GraduationCap,
  Home,
  Users,
  BookOpen,
  ClipboardCheck,
  LineChart,
  FileText,
  Bell,
  Menu,
  X,
  LogOut,
  User,
  ChevronDown,
  Settings,
} from 'lucide-react';
import clsx from 'clsx';

interface NavItemProps {
  to: string;
  icon: React.ReactNode;
  label: string;
  onClick?: () => void;
}

const NavItem: React.FC<NavItemProps> = ({ to, icon, label, onClick }) => {
  const location = useLocation();
  const isActive = location.pathname === to || location.pathname.startsWith(`${to}/`);

  return (
    <NavLink
      to={to}
      className={clsx(
        'flex items-center px-4 py-3 rounded-lg transition-colors',
        isActive
          ? 'bg-blue-600 text-white'
          : 'text-gray-600 hover:bg-gray-100'
      )}
      onClick={onClick}
    >
      <span className="mr-3">{icon}</span>
      <span>{label}</span>
    </NavLink>
  );
};

const DashboardLayout: React.FC = () => {
  const { user, logout } = useAuth();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const closeSidebar = () => setIsSidebarOpen(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <button
                type="button"
                className="lg:hidden p-2 rounded-md text-gray-600 hover:bg-gray-100"
                onClick={toggleSidebar}
              >
                <Menu size={24} />
              </button>
              <div className="flex items-center">
                <GraduationCap size={32} className="text-blue-600" />
                <h1 className="ml-2 text-xl font-bold text-gray-800">EduManager Pro</h1>
              </div>
            </div>

            {/* Profile dropdown */}
            <div className="relative">
              <button
                type="button"
                className="flex items-center px-3 py-2 text-sm rounded-full hover:bg-gray-100"
                onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
              >
                {user.avatar ? (
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="h-8 w-8 rounded-full object-cover"
                  />
                ) : (
                  <div className="h-8 w-8 rounded-full bg-blue-600 flex items-center justify-center text-white">
                    {user.name.charAt(0)}
                  </div>
                )}
                <span className="ml-2 hidden md:block">{user.name}</span>
                <ChevronDown size={16} className="ml-1" />
              </button>

              {isProfileMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
                  <div className="px-4 py-2 text-sm text-gray-500">
                    Signed in as <span className="font-medium">{user.email}</span>
                  </div>
                  <hr className="my-1" />
                  <NavLink
                    to="/profile"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    onClick={() => setIsProfileMenuOpen(false)}
                  >
                    <div className="flex items-center">
                      <User size={16} className="mr-2" />
                      Your Profile
                    </div>
                  </NavLink>
                  <NavLink
                    to="/settings"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    onClick={() => setIsProfileMenuOpen(false)}
                  >
                    <div className="flex items-center">
                      <Settings size={16} className="mr-2" />
                      Settings
                    </div>
                  </NavLink>
                  <hr className="my-1" />
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                  >
                    <div className="flex items-center">
                      <LogOut size={16} className="mr-2" />
                      Sign out
                    </div>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar for mobile */}
        {isSidebarOpen && (
          <div className="fixed inset-0 z-40 lg:hidden" onClick={closeSidebar}>
            <div className="fixed inset-0 bg-gray-600 bg-opacity-75" />
            <div className="fixed inset-y-0 left-0 flex flex-col w-64 bg-white shadow-lg z-50">
              <div className="h-16 flex items-center justify-between px-4 border-b">
                <div className="flex items-center">
                  <GraduationCap size={24} className="text-blue-600" />
                  <h1 className="ml-2 text-lg font-bold text-gray-800">EduManager Pro</h1>
                </div>
                <button
                  type="button"
                  className="text-gray-500 hover:text-gray-700"
                  onClick={closeSidebar}
                >
                  <X size={24} />
                </button>
              </div>
              <div className="flex-1 overflow-y-auto p-4 space-y-1">
                <NavItem
                  to="/"
                  icon={<Home size={20} />}
                  label="Dashboard"
                  onClick={closeSidebar}
                />
                {user.role !== 'student' && (
                  <NavItem
                    to="/students"
                    icon={<Users size={20} />}
                    label="Students"
                    onClick={closeSidebar}
                  />
                )}
                <NavItem
                  to="/courses"
                  icon={<BookOpen size={20} />}
                  label="Courses"
                  onClick={closeSidebar}
                />
                <NavItem
                  to="/attendance"
                  icon={<ClipboardCheck size={20} />}
                  label="Attendance"
                  onClick={closeSidebar}
                />
                <NavItem
                  to="/grades"
                  icon={<LineChart size={20} />}
                  label="Grades"
                  onClick={closeSidebar}
                />
                <NavItem
                  to="/documents"
                  icon={<FileText size={20} />}
                  label="Documents"
                  onClick={closeSidebar}
                />
                <NavItem
                  to="/announcements"
                  icon={<Bell size={20} />}
                  label="Announcements"
                  onClick={closeSidebar}
                />
              </div>
              <div className="p-4 border-t">
                <button
                  onClick={handleLogout}
                  className="flex items-center px-4 py-3 text-red-600 hover:bg-gray-100 rounded-lg w-full"
                >
                  <LogOut size={20} className="mr-3" />
                  <span>Sign out</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Sidebar for desktop */}
        <div className="hidden lg:flex lg:flex-shrink-0">
          <div className="flex flex-col w-64 border-r border-gray-200 bg-white">
            <div className="h-0 flex-1 flex flex-col overflow-y-auto">
              <div className="p-4 space-y-1">
                <NavItem to="/" icon={<Home size={20} />} label="Dashboard" />
                {user.role !== 'student' && (
                  <NavItem to="/students" icon={<Users size={20} />} label="Students" />
                )}
                <NavItem to="/courses" icon={<BookOpen size={20} />} label="Courses" />
                <NavItem
                  to="/attendance"
                  icon={<ClipboardCheck size={20} />}
                  label="Attendance"
                />
                <NavItem to="/grades" icon={<LineChart size={20} />} label="Grades" />
                <NavItem to="/documents" icon={<FileText size={20} />} label="Documents" />
                <NavItem to="/announcements" icon={<Bell size={20} />} label="Announcements" />
              </div>
            </div>
            <div className="p-4 border-t">
              <div className="flex items-center">
                {user.avatar ? (
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="h-10 w-10 rounded-full object-cover"
                  />
                ) : (
                  <div className="h-10 w-10 rounded-full bg-blue-600 flex items-center justify-center text-white">
                    {user.name.charAt(0)}
                  </div>
                )}
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-700">{user.name}</p>
                  <p className="text-xs text-gray-500 capitalize">{user.role}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main content */}
        <div className="flex-1 overflow-auto">
          <main className="py-6 px-4 sm:px-6 lg:px-8">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
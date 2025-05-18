import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { Mail, Lock, EyeOff, Eye, AlertCircle } from 'lucide-react';
import toast from 'react-hot-toast';

const Login: React.FC = () => {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);

    try {
      await login(email, password);
      toast.success('Login successful!');
    } catch (err) {
      setError('Invalid email or password');
      toast.error('Login failed!');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Demo accounts info
  const demoAccounts = [
    { email: 'admin@school.edu', role: 'Admin' },
    { email: 'teacher@school.edu', role: 'Teacher' },
    { email: 'student@school.edu', role: 'Student' },
    { email: 'parent@example.com', role: 'Parent' },
  ];

  const setDemoAccount = (email: string) => {
    setEmail(email);
    setPassword('password');
  };

  return (
    <div className="bg-white shadow rounded-lg p-8">
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Sign in to your account</h2>
      
      {error && (
        <div className="bg-red-50 text-red-600 p-3 rounded-lg mb-4 flex items-start">
          <AlertCircle size={20} className="flex-shrink-0 mr-2 mt-0.5" />
          <p>{error}</p>
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
            Email address
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Mail size={18} className="text-gray-400" />
            </div>
            <input
              id="email"
              name="email"
              type="email"
              required
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="pl-10 block w-full rounded-md border border-gray-300 py-2 px-3 text-gray-900 placeholder-gray-400 focus:border-blue-600 focus:outline-none focus:ring-blue-600 sm:text-sm"
              placeholder="Enter your email"
            />
          </div>
        </div>

        <div className="mb-6">
          <div className="flex items-center justify-between mb-1">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <Link to="/forgot-password" className="text-sm text-blue-600 hover:text-blue-800">
              Forgot password?
            </Link>
          </div>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Lock size={18} className="text-gray-400" />
            </div>
            <input
              id="password"
              name="password"
              type={showPassword ? 'text' : 'password'}
              autoComplete="current-password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="pl-10 block w-full rounded-md border border-gray-300 py-2 px-3 text-gray-900 placeholder-gray-400 focus:border-blue-600 focus:outline-none focus:ring-blue-600 sm:text-sm"
              placeholder="Enter your password"
            />
            <button
              type="button"
              className="absolute inset-y-0 right-0 pr-3 flex items-center"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <EyeOff size={18} className="text-gray-400" />
              ) : (
                <Eye size={18} className="text-gray-400" />
              )}
            </button>
          </div>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full flex justify-center py-2.5 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-600 disabled:bg-blue-400 disabled:cursor-not-allowed"
        >
          {isSubmitting ? 'Signing in...' : 'Sign in'}
        </button>
      </form>

      <div className="mt-8">
        <p className="text-sm text-gray-600 text-center mb-4">Demo accounts (password: password)</p>
        <div className="grid grid-cols-2 gap-2">
          {demoAccounts.map((account) => (
            <button
              key={account.email}
              onClick={() => setDemoAccount(account.email)}
              className="text-xs px-3 py-2 border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <span className="block font-medium">{account.role}</span>
              <span className="block text-gray-500 truncate">{account.email}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Login;
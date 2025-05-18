import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, ArrowLeft, CheckCircle2 } from 'lucide-react';

const ForgotPassword: React.FC = () => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitted(true);
      setIsSubmitting(false);
    }, 1500);
  };

  if (isSubmitted) {
    return (
      <div className="bg-white shadow rounded-lg p-8">
        <div className="text-center">
          <CheckCircle2 size={48} className="mx-auto text-green-500 mb-4" />
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Check your email</h2>
          <p className="text-gray-600 mb-6">
            We've sent a password reset link to <strong>{email}</strong>. Please check your inbox and follow the instructions.
          </p>
          <Link
            to="/login"
            className="inline-flex items-center text-blue-600 hover:text-blue-800"
          >
            <ArrowLeft size={16} className="mr-1" />
            Back to login
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white shadow rounded-lg p-8">
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-2">Reset your password</h2>
      <p className="text-center text-gray-600 mb-6">
        Enter your email address and we'll send you a link to reset your password.
      </p>

      <form onSubmit={handleSubmit}>
        <div className="mb-6">
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
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="pl-10 block w-full rounded-md border border-gray-300 py-2 px-3 text-gray-900 placeholder-gray-400 focus:border-blue-600 focus:outline-none focus:ring-blue-600 sm:text-sm"
              placeholder="Enter your email"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full flex justify-center py-2.5 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-600 disabled:bg-blue-400 disabled:cursor-not-allowed"
        >
          {isSubmitting ? 'Sending...' : 'Send reset link'}
        </button>
      </form>

      <div className="mt-6 text-center">
        <Link
          to="/login"
          className="inline-flex items-center text-blue-600 hover:text-blue-800"
        >
          <ArrowLeft size={16} className="mr-1" />
          Back to login
        </Link>
      </div>
    </div>
  );
};

export default ForgotPassword;
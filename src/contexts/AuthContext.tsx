import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// Define user roles
export type UserRole = 'admin' | 'teacher' | 'student' | 'parent';

// Define user interface
export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
}

// Define the context interface
interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}

// Create the context with default values
const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  login: async () => {},
  logout: () => {},
  isAuthenticated: false,
});

// Mock users for demo purposes
const mockUsers: User[] = [
  {
    id: '1',
    name: 'Admin User',
    email: 'admin@school.edu',
    role: 'admin',
    avatar: 'https://images.pexels.com/photos/3861958/pexels-photo-3861958.jpeg?auto=compress&cs=tinysrgb&w=150',
  },
  {
    id: '2',
    name: 'Teacher Smith',
    email: 'teacher@school.edu',
    role: 'teacher',
    avatar: 'https://images.pexels.com/photos/3861943/pexels-photo-3861943.jpeg?auto=compress&cs=tinysrgb&w=150',
  },
  {
    id: '3',
    name: 'Student Johnson',
    email: 'student@school.edu',
    role: 'student',
    avatar: 'https://images.pexels.com/photos/5212324/pexels-photo-5212324.jpeg?auto=compress&cs=tinysrgb&w=150',
  },
  {
    id: '4',
    name: 'Parent Davis',
    email: 'parent@example.com',
    role: 'parent',
    avatar: 'https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=150',
  },
];

// Auth Provider component
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Check if user is already logged in
  useEffect(() => {
    const savedUser = localStorage.getItem('sms_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  // Login function
  const login = async (email: string, password: string): Promise<void> => {
    setLoading(true);
    
    // Simulate API call
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const foundUser = mockUsers.find(u => u.email.toLowerCase() === email.toLowerCase());
        
        if (foundUser && password === 'password') { // In a real app, passwords would be hashed
          setUser(foundUser);
          localStorage.setItem('sms_user', JSON.stringify(foundUser));
          setLoading(false);
          resolve();
        } else {
          setLoading(false);
          reject(new Error('Invalid email or password'));
        }
      }, 1000);
    });
  };

  // Logout function
  const logout = () => {
    setUser(null);
    localStorage.removeItem('sms_user');
    navigate('/login');
  };

  const contextValue: AuthContextType = {
    user,
    loading,
    login,
    logout,
    isAuthenticated: !!user,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the auth context
export const useAuth = () => useContext(AuthContext);
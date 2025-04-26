
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useToast } from "@/hooks/use-toast";

type User = {
  id: string;
  name: string;
  email: string;
  role: 'customer' | 'admin';
};

type AuthContextType = {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, name: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
  isAdmin: boolean;
};

// Create context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  // Check if user is already logged in on component mount
  useEffect(() => {
    const storedUser = localStorage.getItem('bb_user');
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
      } catch (error) {
        console.error('Error parsing stored user:', error);
        localStorage.removeItem('bb_user');
      }
    }
    setLoading(false);
  }, []);

  // Mock login function - In a real app, this would make an API call
  const login = async (email: string, password: string) => {
    setLoading(true);
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // For demo purposes, we'll allow any email/password with simple validation
      if (password.length < 6) {
        throw new Error("Invalid credentials");
      }

      // Create a mock user based on the email
      const newUser: User = {
        id: Math.random().toString(36).substring(2), // Generate a random ID
        name: email.split('@')[0], // Use part of email as name
        email,
        role: email.includes('admin') ? 'admin' : 'customer', // Simple role assignment
      };
      
      setUser(newUser);
      localStorage.setItem('bb_user', JSON.stringify(newUser));
      
      return Promise.resolve();
    } catch (error: any) {
      return Promise.reject(error);
    } finally {
      setLoading(false);
    }
  };

  // Mock register function
  const register = async (email: string, password: string, name: string) => {
    setLoading(true);
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Simple validation
      if (password.length < 6) {
        throw new Error("Password must be at least 6 characters");
      }

      // Create a new user
      const newUser: User = {
        id: Math.random().toString(36).substring(2),
        name,
        email,
        role: 'customer', // Default role for new users
      };
      
      setUser(newUser);
      localStorage.setItem('bb_user', JSON.stringify(newUser));
      
      return Promise.resolve();
    } catch (error: any) {
      return Promise.reject(error);
    } finally {
      setLoading(false);
    }
  };

  // Logout function
  const logout = () => {
    setUser(null);
    localStorage.removeItem('bb_user');
    toast({
      title: "Logged out",
      description: "You have been successfully logged out.",
    });
  };

  // Computed properties
  const isAuthenticated = user !== null;
  const isAdmin = user?.role === 'admin';

  // Context value
  const value = {
    user,
    loading,
    login,
    register,
    logout,
    isAuthenticated,
    isAdmin,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Custom hook to use the auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

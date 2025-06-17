
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useToast } from '@/hooks/use-toast';

export interface User {
  id: string;
  email: string;
  name: string;
  role: 'farmer' | 'buyer' | 'admin';
  avatar?: string;
  phone?: string;
  address?: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  register: (userData: RegisterData) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
  forgotPassword: (email: string) => Promise<void>;
}

interface RegisterData {
  email: string;
  password: string;
  name: string;
  role: 'farmer' | 'buyer';
  phone?: string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    // Check for existing auth token on app start
    const token = localStorage.getItem('agroconnect_token');
    const userData = localStorage.getItem('agroconnect_user');
    
    if (token && userData) {
      try {
        setUser(JSON.parse(userData));
      } catch (error) {
        console.error('Error parsing user data:', error);
        localStorage.removeItem('agroconnect_token');
        localStorage.removeItem('agroconnect_user');
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      // Simulate API call - replace with actual API integration
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock user data based on role
      const isFarmer = email.includes('farmer') || email.includes('farm');
      const mockUser: User = {
        id: '1',
        email,
        name: isFarmer ? 'John Farmer' : 'Jane Buyer',
        role: isFarmer ? 'farmer' : 'buyer',
        avatar: '',
        phone: '+1234567890',
        address: '123 Main St, City, State'
      };

      const mockToken = 'mock-jwt-token-' + Date.now();
      
      localStorage.setItem('agroconnect_token', mockToken);
      localStorage.setItem('agroconnect_user', JSON.stringify(mockUser));
      
      setUser(mockUser);
      toast({
        title: "Login Successful",
        description: `Welcome back, ${mockUser.name}!`,
      });
    } catch (error) {
      toast({
        title: "Login Failed",
        description: "Invalid credentials. Please check your email and password.",
        variant: "destructive",
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (userData: RegisterData) => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const newUser: User = {
        id: Date.now().toString(),
        email: userData.email,
        name: userData.name,
        role: userData.role,
        phone: userData.phone,
      };

      const mockToken = 'mock-jwt-token-' + Date.now();
      
      localStorage.setItem('agroconnect_token', mockToken);
      localStorage.setItem('agroconnect_user', JSON.stringify(newUser));
      
      setUser(newUser);
      toast({
        title: "Registration Successful",
        description: `Welcome to AgroConnect, ${newUser.name}!`,
      });
    } catch (error) {
      toast({
        title: "Registration Failed",
        description: "Failed to create account. Please try again.",
        variant: "destructive",
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('agroconnect_token');
    localStorage.removeItem('agroconnect_user');
    setUser(null);
    toast({
      title: "Logged Out",
      description: "You have been successfully logged out.",
    });
  };

  const forgotPassword = async (email: string) => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast({
        title: "Password Reset Email Sent",
        description: "Please check your email for reset instructions.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to send reset email. Please try again.",
        variant: "destructive",
      });
      throw error;
    }
  };

  const value = {
    user,
    login,
    register,
    logout,
    isLoading,
    forgotPassword,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

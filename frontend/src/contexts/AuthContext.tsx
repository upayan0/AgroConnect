import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useToast } from '../hooks/use-toast';
import { authService, User, RegisterData } from '../services/authService';

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  register: (userData: RegisterData) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
  forgotPassword: (email: string) => Promise<void>;
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

  // Periodic token validation
  // useEffect(() => {
  //   if (!user) return;

  //   const validateToken = async () => {
  //     try {
  //       if (authService.isTokenExpiringSoon()) {
  //         console.log('Token expiring soon, refreshing user data...');
  //         const { user: freshUser } = await authService.getProfile();
  //         setUser(freshUser);
  //         localStorage.setItem('agroconnect_user', JSON.stringify(freshUser));
  //       }
  //     } catch (error) {
  //       console.error('Token validation failed:', error);
  //       // Token is invalid, log out user
  //       logout();
  //     }
  //   };

  //   // Check token every 30 minutes
  //   const interval = setInterval(validateToken, 30 * 60 * 1000);
  //   return () => clearInterval(interval);
  // }, [user]);

  useEffect(() => {
    // Check for existing auth token and validate with backend
    const initializeAuth = async () => {
      try {
        const token = authService.getToken();
        const storedUser = authService.getStoredUser();

        if (token) {
  
          if (storedUser) {
            setUser(storedUser);
          }

          // Validate token with backend and refresh user data
          try {
            const { user } = await authService.getProfile();
            setUser(user);
            localStorage.setItem('agroconnect_user', JSON.stringify(user));
          } catch (apiError) {
            console.error('Error validating token with backend:', apiError);

            const isNetworkError = !navigator.onLine ||
              (apiError instanceof Error &&
               (apiError.message.includes('fetch') ||
                apiError.message.includes('network') ||
                apiError.message.includes('Failed to fetch')));

            if (storedUser && isNetworkError) {
            
              console.log('Using stored user data due to network error');
            } else if (storedUser && !isNetworkError) {
            
              console.log('Auth validation failed; keeping stored user until next secure action');
            } else {
              // No stored data and validation failed; clear token
              authService.removeToken();
              setUser(null);
            }
          }
        } else {
          setUser(null);
        }
      } catch (error) {
        console.error('Error during auth initialization:', error);
        // Critical error, clear everything
        authService.removeToken();
        localStorage.removeItem('agroconnect_user');
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };

    initializeAuth();
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      const response = await authService.login({ email, password });
      
      // Store token and user data
      authService.setToken(response.token);
      localStorage.setItem('agroconnect_user', JSON.stringify(response.user));
      
      setUser(response.user);
      toast({
        title: "Login Successful",
        description: `Welcome back, ${response.user.name}!`,
      });
    } catch (error) {
      toast({
        title: "Login Failed",
        description: error instanceof Error ? error.message : "Invalid credentials. Please check your email and password.",
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
      const response = await authService.register(userData);
      
      // Store token and user data
      authService.setToken(response.token);
      localStorage.setItem('agroconnect_user', JSON.stringify(response.user));
      
      setUser(response.user);
      toast({
        title: "Registration Successful",
        description: `Welcome to AgroConnect, ${response.user.name}!`,
      });
    } catch (error) {
      toast({
        title: "Registration Failed",
        description: error instanceof Error ? error.message : "Failed to create account. Please try again.",
        variant: "destructive",
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    authService.removeToken();
    localStorage.removeItem('agroconnect_user');
    setUser(null);
    toast({
      title: "Logged Out",
      description: "You have been successfully logged out.",
    });
  };

  const forgotPassword = async (email: string) => {
    try {
      await authService.forgotPassword(email);
      toast({
        title: "Password Reset Email Sent",
        description: "Please check your email for reset instructions.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to send reset email. Please try again.",
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

// authService.ts
const API_BASE_URL = import.meta.env.MODE === 'production'
    ? 'https://agro-connect-p7j2-upayanchatterjee7-gmailcoms-projects.vercel.app/api'
    : 'http://localhost:5000/api';

export interface User {
  id: string;
  email: string;
  name: string;
  role: 'farmer' | 'buyer' | 'admin';
  avatar?: string;
  phone?: string;
  address?: string;
}

export interface RegisterData {
  email: string;
  password: string;
  name: string;
  role: 'farmer' | 'buyer';
  phone?: string;
  address?: string;
}

export interface LoginData {
  email: string;
  password: string;
}

export interface AuthResponse {
  message: string;
  token: string;
  user: User;
}

class AuthService {
  // Decode a JWT payload safely (base64url -> JSON)
  private decodeJwtPayload(token: string): any | null {
    try {
      const parts = token.split('.');
      if (parts.length !== 3) return null;

      // Convert base64url to base64 and add padding
      const base64Url = parts[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const padded = base64.padEnd(base64.length + (4 - (base64.length % 4 || 4)) % 4, '=');

      // Decode and parse
      const json = atob(padded);
      return JSON.parse(json);
    } catch (e) {
      console.error('Failed to decode JWT payload:', e);
      return null;
    }
  }

  private getAuthHeaders(): HeadersInit {
    const token = localStorage.getItem('agroconnect_token');
    return {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
    };
  }

  async register(userData: RegisterData): Promise<AuthResponse> {
    const response = await fetch(`${API_BASE_URL}/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
      credentials: 'include',
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Registration failed');
    }

    return response.json();
  }

  async login(loginData: LoginData): Promise<AuthResponse> {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(loginData),
      credentials: 'include',
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Login failed');
    }

    return response.json();
  }

  async forgotPassword(email: string): Promise<{ message: string }> {
    const response = await fetch(`${API_BASE_URL}/auth/forgot-password`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email }),
      credentials: 'include',
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to send reset email');
    }

    return response.json();
  }

  async getProfile(): Promise<{ user: User }> {
    const response = await fetch(`${API_BASE_URL}/auth/profile`, {
      method: 'GET',
      headers: this.getAuthHeaders(),
      credentials: 'include',
    });

    if (!response.ok) {
      if (response.status === 401) {
        // Unauthorized; let caller decide whether to clear session
        throw new Error('Unauthorized');
      }
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to get profile');
    }

    return response.json();
  }

  async updateProfile(profileData: Partial<User>): Promise<{ message: string; user: User }> {
    const response = await fetch(`${API_BASE_URL}/auth/profile`, {
      method: 'PUT',
      headers: this.getAuthHeaders(),
      body: JSON.stringify(profileData),
      credentials: 'include',
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to update profile');
    }

    return response.json();
  }

  isAuthenticated(): boolean {
    const token = localStorage.getItem('agroconnect_token');
    if (!token) return false;

    try {
      // Basic JWT token structure validation (without signature verification)
      const parts = token.split('.');
      if (parts.length !== 3) return false;

      // Decode payload to check expiration (handle base64url)
      const payload = this.decodeJwtPayload(token);
      if (!payload) {
        // If we cannot decode, don't immediately log out; treat as unauthenticated
        return false;
      }
      const currentTime = Math.floor(Date.now() / 1000);

      // Check if token is expired
      if (payload.exp && payload.exp < currentTime) {
        // Token is expired, remove it
        this.removeToken();
        localStorage.removeItem('agroconnect_user');
        return false;
      }

      return true;
    } catch (error) {
      console.error('Error validating token structure:', error);
      // If token is malformed, remove it
      this.removeToken();
      localStorage.removeItem('agroconnect_user');
      return false;
    }
  }

  getToken(): string | null {
    return localStorage.getItem('agroconnect_token');
  }

  setToken(token: string): void {
    localStorage.setItem('agroconnect_token', token);
  }

  removeToken(): void {
    localStorage.removeItem('agroconnect_token');
  }

  // Check if token is close to expiring (within 1 hour)
  isTokenExpiringSoon(): boolean {
    const token = localStorage.getItem('agroconnect_token');
    if (!token) return false;

    try {
  const parts = token.split('.');
  if (parts.length !== 3) return false;

  const payload = this.decodeJwtPayload(token);
  if (!payload) return false;
      const currentTime = Math.floor(Date.now() / 1000);
      const oneHour = 60 * 60; // 1 hour in seconds

      return payload.exp && (payload.exp - currentTime) < oneHour;
    } catch (error) {
      return false;
    }
  }

  // Get stored user data without API call
  getStoredUser(): User | null {
    try {
      const storedUser = localStorage.getItem('agroconnect_user');
      return storedUser ? JSON.parse(storedUser) : null;
    } catch (error) {
      console.error('Error parsing stored user data:', error);
      localStorage.removeItem('agroconnect_user');
      return null;
    }
  }

  // Handle authentication errors consistently
  handleAuthError(error: any): void {
    if (error.message?.includes('Authentication expired') ||
        error.message?.includes('Invalid token')) {
      this.removeToken();
      localStorage.removeItem('agroconnect_user');
    }
  }

  // Check if error is network-related
  isNetworkError(error: any): boolean {
    return !navigator.onLine ||
           error.name === 'TypeError' ||
           error.message?.includes('fetch') ||
           error.message?.includes('network') ||
           error.message?.includes('Failed to fetch');
  }
}

export const authService = new AuthService(); 
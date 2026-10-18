import React, { createContext, useContext, useState, useEffect } from 'react';

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  companyName?: string;
  truckType?: string;
  createdAt: string;
}

export interface RegisterData {
  name: string;
  email: string;
  phone: string;
  password: string;
  companyName?: string;
  truckType?: string;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isAuthModalOpen: boolean;
  authModalMode: 'register' | 'login';
  openAuthModal: (mode?: 'register' | 'login') => void;
  closeAuthModal: () => void;
  setAuthModalMode: (mode: 'register' | 'login') => void;
  login: (email: string, password: string) => Promise<{ success: boolean; message?: string }>;
  register: (data: RegisterData) => Promise<{ success: boolean; message?: string; errors?: Record<string, string> }>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const STORAGE_KEY = 'truck_service_si_auth';

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalMode, setAuthModalMode] = useState<'register' | 'login'>('register');

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (parsed.user && parsed.token) {
          setUser(parsed.user);
          setToken(parsed.token);
        }
      }
    } catch (e) {
      console.warn('Failed to parse stored auth session:', e);
    }
  }, []);

  const openAuthModal = (mode: 'register' | 'login' = 'register') => {
    setAuthModalMode(mode);
    setIsAuthModalOpen(true);
  };

  const closeAuthModal = () => {
    setIsAuthModalOpen(false);
  };

  const login = async (email: string, password: string) => {
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        return { success: false, message: data.message || 'Login failed.' };
      }

      setUser(data.user);
      setToken(data.token);
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ user: data.user, token: data.token }));
      setIsAuthModalOpen(false);
      return { success: true, message: data.message };
    } catch {
      return { success: false, message: 'Network error connecting to login server.' };
    }
  };

  const register = async (regData: RegisterData) => {
    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(regData),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        return {
          success: false,
          message: data.message || 'Registration failed.',
          errors: data.errors,
        };
      }

      setUser(data.user);
      setToken(data.token);
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ user: data.user, token: data.token }));
      setIsAuthModalOpen(false);
      return { success: true, message: data.message };
    } catch {
      return { success: false, message: 'Network error connecting to server.' };
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem(STORAGE_KEY);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated: !!user,
        isAuthModalOpen,
        authModalMode,
        openAuthModal,
        closeAuthModal,
        setAuthModalMode,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

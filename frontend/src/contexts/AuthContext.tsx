import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { authService } from '@/services/auth';
import { getStoredAccessToken, clearAuthData } from '@/lib/api';
import type { User, LoginRequest, SignupRequest } from '@/types/user';

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (credentials: LoginRequest) => Promise<void>;
  register: (userData: SignupRequest) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const queryClient = useQueryClient();

  // Check if user is authenticated on app start
  const { isLoading } = useQuery({
    queryKey: ['auth', 'me'],
    queryFn: async () => {
      const token = getStoredAccessToken();
      if (!token) {
        return null;
      }
      
      // For mock data, just return the mock user if token exists
      if (import.meta.env.VITE_USE_MOCK_DATA === 'true') {
        const { mockUser } = await import('@/data/mockData');
        setUser(mockUser);
        return mockUser;
      }

      // In real implementation, validate token with backend
      // For now, just assume token is valid if it exists
      const { mockUser } = await import('@/data/mockData');
      setUser(mockUser);
      return mockUser;
    },
    enabled: !!getStoredAccessToken(),
    retry: false,
  });

  const loginMutation = useMutation({
    mutationFn: authService.login,
    onSuccess: (data) => {
      setUser(data.user);
      queryClient.setQueryData(['auth', 'me'], data.user);
    },
    onError: () => {
      clearAuthData();
      setUser(null);
    },
  });

  const registerMutation = useMutation({
    mutationFn: authService.register,
    onSuccess: (data) => {
      setUser(data.user);
      queryClient.setQueryData(['auth', 'me'], data.user);
    },
    onError: () => {
      clearAuthData();
      setUser(null);
    },
  });

  const logoutMutation = useMutation({
    mutationFn: authService.logout,
    onSuccess: () => {
      setUser(null);
      queryClient.clear();
      queryClient.setQueryData(['auth', 'me'], null);
    },
  });

  const login = async (credentials: LoginRequest) => {
    await loginMutation.mutateAsync(credentials);
  };

  const register = async (userData: SignupRequest) => {
    await registerMutation.mutateAsync(userData);
  };

  const logout = async () => {
    await logoutMutation.mutateAsync();
  };

  const isAuthenticated = !!user;

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        isAuthenticated,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
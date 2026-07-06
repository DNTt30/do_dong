/**
 * AuthContext — provides authentication state to the entire application.
 * Tracks current user and admin role via Supabase Auth.
 */

'use client';

import React, { createContext, useEffect, useState, type ReactNode } from 'react';
import type { User } from '@supabase/supabase-js';
import { onAuthChange, signInWithEmail, signOut, checkAdminRole } from '@/lib/auth';

interface AuthContextValue {
  user: User | null;
  isAdmin: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextValue | null>(null);

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthChange(async (currentUser, session) => {
      setUser(currentUser);

      if (currentUser) {
        const adminStatus = await checkAdminRole(currentUser);
        setIsAdmin(adminStatus);
      } else {
        setIsAdmin(false);
      }

      setIsLoading(false);
    });

    return unsubscribe;
  }, []);

  const login = async (email: string, password: string): Promise<void> => {
    await signInWithEmail(email, password);
  };

  const logout = async (): Promise<void> => {
    await signOut();
    setIsAdmin(false);
  };

  return (
    <AuthContext.Provider value={{ user, isAdmin, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

/**
 * useAuth hook — provides current user, admin status, and auth actions.
 * Consumes AuthContext — must be used inside AppProviders.
 */

'use client';

import { useContext } from 'react';
import { AuthContext } from '@/contexts/AuthContext';

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthContext.Provider');
  }
  return context;
}

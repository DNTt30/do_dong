/**
 * AppProviders — root provider composition.
 * Wraps the application with all required context providers.
 */

'use client';

import React, { type ReactNode } from 'react';
import { AuthProvider } from '@/contexts/AuthContext';
import { Toaster } from 'sonner';

interface AppProvidersProps {
  children: ReactNode;
}

export function AppProviders({ children }: AppProvidersProps) {
  return (
    <AuthProvider>
      {children}
      <Toaster
        position="top-right"
        richColors
        closeButton
        toastOptions={{
          style: {
            fontFamily: 'var(--font-be-vietnam-pro)',
          },
        }}
      />
    </AuthProvider>
  );
}

/**
 * Admin layout — applies AdminLayout to all admin routes.
 */

import React, { type ReactNode } from 'react';
import AdminLayout from '@/components/layout/AdminLayout';

export default function Layout({ children }: { children: ReactNode }) {
  return <AdminLayout>{children}</AdminLayout>;
}

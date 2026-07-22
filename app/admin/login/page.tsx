/**
 * Admin login page — server component shell wrapping client form in Suspense.
 * Required because AdminLoginForm uses useSearchParams().
 */

import { Suspense } from 'react';
import AdminLoginForm from './AdminLoginForm';

export default function AdminLoginPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 flex items-center justify-center">
          <div className="w-8 h-8 rounded-full border-4 border-[#B8860B] border-t-transparent animate-spin" />
        </div>
      }
    >
      <AdminLoginForm />
    </Suspense>
  );
}

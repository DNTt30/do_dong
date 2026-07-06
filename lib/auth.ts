/**
 * Supabase Authentication helpers.
 * Centralizes all auth logic — sign in, sign out, token validation.
 */

import { supabase } from '@/lib/supabase';
import type { User, Session } from '@supabase/supabase-js';

/**
 * Sign in with email and password.
 */
export async function signInWithEmail(email: string, password: string) {
  const { data, error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) throw error;
  return data;
}

/**
 * Sign out the current user.
 */
export async function signOut(): Promise<void> {
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
}

/**
 * Get the current Supabase user (asynchronous).
 * Returns null if not authenticated.
 */
export async function getCurrentUser(): Promise<User | null> {
  const { data: { user } } = await supabase.auth.getUser();
  return user;
}

/**
 * Subscribe to auth state changes.
 * Returns an unsubscribe function.
 */
export function onAuthChange(callback: (user: User | null, session: Session | null) => void) {
  const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
    callback(session?.user || null, session);
  });
  return () => subscription.unsubscribe();
}

/**
 * Check if current user has admin role via app_metadata.
 * In Supabase, you can set role in user.app_metadata.role or query a specific 'users_roles' table.
 */
export async function checkAdminRole(user: User): Promise<boolean> {
  // Simple check: check if user.app_metadata has admin role, or specific email.
  // We can default to checking app_metadata for 'admin' or just return true if it's the owner email.
  // This depends on how Supabase is configured.
  return user.app_metadata?.role === 'admin' || user.email === 'admin@dodongnamdinh.vn'; // Example fallback
}

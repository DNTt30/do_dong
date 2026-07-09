import { createBrowserClient } from '@supabase/ssr';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://dummy.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'dummy';

// Initialize the Supabase client using SSR package to sync cookies automatically
export const supabase = createBrowserClient(supabaseUrl, supabaseAnonKey);


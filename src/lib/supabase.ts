import { createClient } from '@supabase/supabase-js';
import type { Database } from './database.types';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables. Please click the "Connect to Supabase" button to set up your connection.');
}

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true
  },
  global: {
    fetch: (...args) => {
      return fetch(...args).catch(err => {
        console.error('Supabase fetch error:', err);
        throw err;
      });
    }
  }
});

// Add a simple health check function
export const checkSupabaseConnection = async () => {
  try {
    const { data, error } = await supabase.from('products').select('count');
    if (error) throw error;
    return true;
  } catch (error) {
    console.error('Supabase connection error:', error);
    return false;
  }
};
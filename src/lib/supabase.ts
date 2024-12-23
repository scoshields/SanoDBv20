import { createClient } from '@supabase/supabase-js';
import type { ImportMetaEnv } from '../vite-env';

// Use environment variables based on runtime environment
const getEnvVar = (key: keyof ImportMetaEnv): string => {
  // Check Node.js environment variables first
  if (typeof process !== 'undefined' && process.env && process.env[key]) {
    return process.env[key] as string;
  }
  
  // Fall back to Vite's import.meta.env for browser environment
  if (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env[key]) {
    return import.meta.env[key];
  }
  
  throw new Error(`Missing required environment variable: ${key}`);
};

const supabaseUrl = getEnvVar('VITE_SUPABASE_URL');
const supabaseKey = getEnvVar('VITE_SUPABASE_ANON_KEY');

export const supabase = createClient(supabaseUrl, supabaseKey);
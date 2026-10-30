import { createClient, SupabaseClient } from '@supabase/supabase-js';

let serviceClient: SupabaseClient | null = null;

export function supabaseAdmin(): SupabaseClient {
  if (!serviceClient) {
    const url = process.env.SUPABASE_URL;
    const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
    if (!url || !key) throw new Error('Supabase is not configured yet');
    serviceClient = createClient(url, key, { auth: { persistSession: false } });
  }
  return serviceClient;
}

export const STATUSES = [
  'submitted',
  'under review',
  'additional info required',
  'documents received',
  'in final review',
  'approved in principle',
  'documentation stage',
  'approved',
  'declined',
  'withdrawn',
] as const;

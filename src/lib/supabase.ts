import "server-only";

import { createClient, type SupabaseClient } from "@supabase/supabase-js";

type SupabaseEnvironment = {
  url: string;
  anonKey: string;
  serviceRoleKey?: string;
};

function readEnvironment(): SupabaseEnvironment | null {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim();
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.trim();

  if (!url || !anonKey) return null;
  return { url, anonKey, serviceRoleKey: process.env.SUPABASE_SERVICE_ROLE_KEY?.trim() };
}

function createStatelessClient(url: string, key: string): SupabaseClient {
  return createClient(url, key, {
    auth: {
      autoRefreshToken: false,
      detectSessionInUrl: false,
      persistSession: false,
    },
  });
}

export function getSupabaseClient(): SupabaseClient | null {
  const environment = readEnvironment();
  if (!environment) return null;
  return createStatelessClient(environment.url, environment.anonKey);
}

export function getSupabaseAdminClient(): SupabaseClient | null {
  const environment = readEnvironment();
  if (!environment?.serviceRoleKey) return null;
  return createStatelessClient(environment.url, environment.serviceRoleKey);
}
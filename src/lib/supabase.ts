import "server-only";

import { getCloudflareContext } from "@opennextjs/cloudflare";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";

type SupabaseEnvironment = {
  url: string;
  anonKey: string;
  serviceRoleKey?: string;
};

async function readEnvironment(): Promise<SupabaseEnvironment | null> {
  let runtimeEnvironment: Partial<SupabaseEnvironment> = {};
  try {
    const context = await getCloudflareContext({ async: true });
    const bindings = context.env as typeof context.env & {
      NEXT_PUBLIC_SUPABASE_URL?: string;
      NEXT_PUBLIC_SUPABASE_ANON_KEY?: string;
      SUPABASE_SERVICE_ROLE_KEY?: string;
    };
    runtimeEnvironment = {
      url: bindings.NEXT_PUBLIC_SUPABASE_URL,
      anonKey: bindings.NEXT_PUBLIC_SUPABASE_ANON_KEY,
      serviceRoleKey: bindings.SUPABASE_SERVICE_ROLE_KEY,
    };
  } catch {
    // The context is unavailable in plain Node/Next runtimes; use process env there.
  }

  const url = (runtimeEnvironment.url || process.env.NEXT_PUBLIC_SUPABASE_URL)?.trim();
  const anonKey = (runtimeEnvironment.anonKey || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY)?.trim();

  if (!url || !anonKey) return null;
  return {
    url,
    anonKey,
    serviceRoleKey: (runtimeEnvironment.serviceRoleKey || process.env.SUPABASE_SERVICE_ROLE_KEY)?.trim(),
  };
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

export async function getSupabaseClient(): Promise<SupabaseClient | null> {
  const environment = await readEnvironment();
  if (!environment) return null;
  return createStatelessClient(environment.url, environment.anonKey);
}

export async function getSupabaseAdminClient(): Promise<SupabaseClient | null> {
  const environment = await readEnvironment();
  if (!environment?.serviceRoleKey) return null;
  return createStatelessClient(environment.url, environment.serviceRoleKey);
}
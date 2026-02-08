import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY;

const hasSupabaseEnv = Boolean(supabaseUrl && supabaseKey);

if (!hasSupabaseEnv) {
  console.warn(
    "[supabase] VITE_SUPABASE_URL/VITE_SUPABASE_KEY not set. Auth/upload features will be disabled in this build."
  );
}

export const supabase = createClient(
  supabaseUrl ?? "https://example.supabase.co",
  supabaseKey ?? "public-anon-key"
);

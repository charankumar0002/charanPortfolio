import { createClient, type SupabaseClient } from "@supabase/supabase-js";

const url = import.meta.env.VITE_SUPABASE_URL;
const key = import.meta.env.VITE_SUPABASE_KEY;

// Null when the env vars aren't set, so the site still works (contact form falls back to email).
export const supabase: SupabaseClient | null =
  url && key ? createClient(url, key, { auth: { persistSession: false } }) : null;

export interface ContactMessage {
  name: string;
  email: string;
  message: string;
}

export async function saveMessage(msg: ContactMessage): Promise<void> {
  if (!supabase) throw new Error("Supabase is not configured");
  const { error } = await supabase.from("messages").insert(msg);
  if (error) throw error;
}

const COUNTED_KEY = "pv-counted";

// Counts one view per browser session, and returns the total either way.
export async function getViewCount(slug = "home"): Promise<number | null> {
  if (!supabase) return null;

  let counted = false;
  try {
    counted = sessionStorage.getItem(COUNTED_KEY) === "1";
  } catch {
    // Storage blocked (private mode etc.) – just count the view.
  }

  const fn = counted ? "get_page_views" : "increment_page_view";
  const { data, error } = await supabase.rpc(fn, { page_slug: slug });
  if (error) return null;

  if (!counted) {
    try {
      sessionStorage.setItem(COUNTED_KEY, "1");
    } catch {
      /* ignore */
    }
  }
  return Number(data);
}

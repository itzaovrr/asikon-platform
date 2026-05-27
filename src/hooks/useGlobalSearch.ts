import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export interface SearchResults {
  products: Array<{ id: string; name: string; slug: string; image_url: string | null; price: number }>;
  courses: Array<{ id: string; title: string; slug: string; cover_url: string | null; price: number; is_free: boolean }>;
  digital: Array<{ id: string; title: string; slug: string; cover_url: string | null; price: number; is_free: boolean }>;
  services: Array<{ id: string; title: string; slug: string; cover_url: string | null; price: number; is_free: boolean }>;
  mentors: Array<{ id: string; name: string; slug: string; avatar_url: string | null; subjects: string[] }>;
  posts: Array<{ id: string; content: string | null; user_id: string }>;
}

const EMPTY: SearchResults = { products: [], courses: [], digital: [], services: [], mentors: [], posts: [] };

function useDebounced<T>(value: T, ms = 250): T {
  const [v, setV] = useState(value);
  useEffect(() => {
    const t = setTimeout(() => setV(value), ms);
    return () => clearTimeout(t);
  }, [value, ms]);
  return v;
}

export function useGlobalSearch(rawQuery: string) {
  const query = useDebounced(rawQuery.trim(), 250);
  const enabled = query.length >= 2;

  return useQuery({
    queryKey: ["global-search", query],
    enabled,
    staleTime: 30_000,
    queryFn: async (): Promise<SearchResults> => {
      const like = `%${query.replace(/[%_]/g, "\\$&")}%`;
      const [prod, content, mentors, posts] = await Promise.all([
        supabase
          .from("products")
          .select("id,name,slug,image_url,price")
          .or(`name.ilike.${like},description.ilike.${like}`)
          .limit(5),
        supabase
          .from("content_items")
          .select("id,kind,title,slug,cover_url,price,is_free")
          .eq("status", "published")
          .or(`title.ilike.${like},summary.ilike.${like}`)
          .limit(15),
        supabase
          .from("mentors")
          .select("id,name,slug,avatar_url,subjects")
          .eq("is_active", true)
          .ilike("name", like)
          .limit(5),
        supabase.from("posts").select("id,content,user_id").ilike("content", like).limit(5),
      ]);

      const items = (content.data ?? []) as any[];
      return {
        products: (prod.data ?? []) as any,
        courses: items.filter((i) => i.kind === "course").slice(0, 5),
        digital: items.filter((i) => i.kind === "digital").slice(0, 5),
        services: items.filter((i) => i.kind === "service").slice(0, 5),
        mentors: (mentors.data ?? []) as any,
        posts: (posts.data ?? []) as any,
      };
    },
    placeholderData: (prev) => prev,
    initialData: enabled ? undefined : EMPTY,
  });
}

const RECENT_KEY = "asikon:recent-searches";
const MAX_RECENT = 6;

export function getRecentSearches(): string[] {
  try {
    const raw = localStorage.getItem(RECENT_KEY);
    return raw ? (JSON.parse(raw) as string[]).slice(0, MAX_RECENT) : [];
  } catch {
    return [];
  }
}

export function pushRecentSearch(term: string) {
  const t = term.trim();
  if (!t) return;
  try {
    const cur = getRecentSearches().filter((x) => x.toLowerCase() !== t.toLowerCase());
    cur.unshift(t);
    localStorage.setItem(RECENT_KEY, JSON.stringify(cur.slice(0, MAX_RECENT)));
  } catch {
    /* ignore */
  }
}

export function clearRecentSearches() {
  try {
    localStorage.removeItem(RECENT_KEY);
  } catch {
    /* ignore */
  }
}

export const TRENDING_TERMS = [
  "AI courses",
  "Prompt engineering",
  "Free templates",
  "Mentorship",
  "Bangla tutorials",
  "Notion",
];

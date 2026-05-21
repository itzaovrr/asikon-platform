import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export type HomeBannerKind = "hero" | "offer";

export interface HomeBanner {
  id: string;
  kind: HomeBannerKind;
  image_url: string;
  link_url: string | null;
  alt_text: string | null;
  display_order: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export function useHomeBanners(kind: HomeBannerKind) {
  return useQuery({
    queryKey: ["home-banners", kind],
    queryFn: async () => {
      const { data, error } = await (supabase as any)
        .from("home_banners")
        .select("*")
        .eq("kind", kind)
        .eq("is_active", true)
        .order("display_order", { ascending: true });
      if (error) throw error;
      return (data ?? []) as HomeBanner[];
    },
  });
}

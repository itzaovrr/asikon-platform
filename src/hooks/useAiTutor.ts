import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";

export interface AiThread {
  id: string;
  title: string;
  created_at: string;
  updated_at: string;
}

export function useAiThreads() {
  const { user } = useAuth();
  return useQuery({
    queryKey: ["ai-threads", user?.id],
    enabled: !!user,
    queryFn: async (): Promise<AiThread[]> => {
      const { data, error } = await supabase
        .from("ai_threads")
        .select("id,title,created_at,updated_at")
        .order("updated_at", { ascending: false });
      if (error) throw error;
      return data ?? [];
    },
  });
}

export function useCreateAiThread() {
  const { user } = useAuth();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (): Promise<AiThread> => {
      if (!user) throw new Error("Not authenticated");
      const { data, error } = await supabase
        .from("ai_threads")
        .insert({ user_id: user.id, title: "New chat" })
        .select("id,title,created_at,updated_at")
        .single();
      if (error) throw error;
      return data as AiThread;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["ai-threads"] }),
  });
}

export function useDeleteAiThread() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("ai_threads").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["ai-threads"] }),
  });
}

export function useAiThreadMessages(threadId: string | undefined) {
  return useQuery({
    queryKey: ["ai-messages", threadId],
    enabled: !!threadId,
    queryFn: async () => {
      const { data, error } = await supabase
        .from("ai_messages")
        .select("id,role,parts,created_at")
        .eq("thread_id", threadId!)
        .order("created_at", { ascending: true });
      if (error) throw error;
      return (data ?? []).map((m) => ({
        id: m.id,
        role: m.role as "user" | "assistant" | "system",
        parts: (m.parts as any) ?? [],
      }));
    },
  });
}

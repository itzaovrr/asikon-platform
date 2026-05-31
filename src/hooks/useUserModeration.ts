import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "./useAuth";
import { useToast } from "./use-toast";

export function useReportUser() {
  const { user } = useAuth();
  const { toast } = useToast();
  return useMutation({
    mutationFn: async (input: { reportedUserId: string; reason: string; details?: string }) => {
      if (!user) throw new Error("Not authenticated");
      const { data, error } = await supabase
        .from("user_reports")
        .insert({
          reporter_id: user.id,
          reported_user_id: input.reportedUserId,
          reason: input.reason,
          details: input.details ?? null,
        })
        .select()
        .single();
      if (error) {
        if (error.code === "23505") {
          toast({ title: "Already reported", description: "You've already reported this user." });
          return null;
        }
        throw error;
      }
      toast({ title: "Report submitted", description: "Thanks — our team will review it." });
      return data;
    },
    onError: (e: any) => {
      toast({ title: "Could not submit report", description: e.message, variant: "destructive" });
    },
  });
}

export function useBlockUser() {
  const { user } = useAuth();
  const qc = useQueryClient();
  const { toast } = useToast();
  return useMutation({
    mutationFn: async (blockedId: string) => {
      if (!user) throw new Error("Not authenticated");
      const { error } = await supabase
        .from("user_blocks")
        .insert({ blocker_id: user.id, blocked_id: blockedId });
      if (error && error.code !== "23505") throw error;
      // Best-effort: unfollow both directions
      await supabase
        .from("user_followers")
        .delete()
        .or(
          `and(follower_id.eq.${user.id},following_id.eq.${blockedId}),and(follower_id.eq.${blockedId},following_id.eq.${user.id})`,
        );
      return blockedId;
    },
    onSuccess: (blockedId) => {
      toast({ title: "User blocked" });
      qc.invalidateQueries({ queryKey: ["followers", blockedId] });
      qc.invalidateQueries({ queryKey: ["following", blockedId] });
      qc.invalidateQueries({ queryKey: ["followers", user?.id] });
      qc.invalidateQueries({ queryKey: ["following", user?.id] });
      qc.invalidateQueries({ queryKey: ["user-blocks", user?.id] });
    },
    onError: (e: any) => {
      toast({ title: "Could not block user", description: e.message, variant: "destructive" });
    },
  });
}

export function useIsBlocked(targetUserId?: string) {
  const { user } = useAuth();
  return useQuery({
    queryKey: ["user-blocks", user?.id, targetUserId],
    enabled: !!user && !!targetUserId,
    queryFn: async () => {
      const { data, error } = await supabase
        .from("user_blocks")
        .select("id")
        .eq("blocker_id", user!.id)
        .eq("blocked_id", targetUserId!)
        .maybeSingle();
      if (error) throw error;
      return !!data;
    },
  });
}

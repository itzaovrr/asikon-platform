import { useQuery } from "@tanstack/react-query";
import { Flame, Trophy, Clock, Target } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useLearnerProfile } from "@/hooks/useLearnerProfile";
import { db } from "@/lib/db";

function useWeeklyStats() {
  const { user } = useAuth();
  return useQuery({
    queryKey: ["weekly-stats", user?.id],
    enabled: !!user,
    staleTime: 60_000,
    queryFn: async () => {
      const since = new Date();
      since.setDate(since.getDate() - 7);
      const { data } = await db
        .from("lesson_completions")
        .select("lesson_id, completed_at, lessons(duration_min)")
        .eq("user_id", user!.id)
        .gte("completed_at", since.toISOString());
      const rows = (data ?? []) as any[];
      const minutes = rows.reduce((s, r) => s + (r.lessons?.duration_min ?? 0), 0);
      return { missions: rows.length, minutes };
    },
  });
}

export function ProgressSnapshot() {
  const { data: profile } = useLearnerProfile();
  const { data: stats } = useWeeklyStats();
  const xp = profile?.xp ?? 0;
  const streak = profile?.streak_days ?? 0;

  return (
    <section className="section-x">
      <p className="text-[10px] uppercase tracking-[0.2em] text-black/60 font-bold mb-3">This week</p>
      <div className="grid grid-cols-4 gap-2.5">
        <Stat icon={Trophy} label="XP" value={xp} accent />
        <Stat icon={Flame} label="Streak" value={`${streak}d`} />
        <Stat icon={Clock} label="Minutes" value={stats?.minutes ?? 0} />
        <Stat icon={Target} label="Done" value={stats?.missions ?? 0} accent />
      </div>
    </section>
  );
}

function Stat({ icon: Icon, label, value, accent }: { icon: any; label: string; value: any; accent?: boolean }) {
  return (
    <div
      className={`rounded-2xl border-2 border-black p-3 flex flex-col items-center justify-center text-center shadow-[3px_3px_0_0_rgba(0,0,0,1)] ${
        accent ? "bg-primary text-primary-foreground" : "bg-white text-black"
      }`}
    >
      <Icon className="h-4 w-4 mb-1.5" strokeWidth={2.25} />
      <span className="font-grotesk font-black text-sm leading-none tabular-nums">{value}</span>
      <span className={`text-[9px] font-bold uppercase tracking-wider mt-1.5 ${accent ? "text-primary-foreground/80" : "text-black/60"}`}>{label}</span>
    </div>
  );
}

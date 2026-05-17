import { Link } from "react-router-dom";
import { CalendarClock, Target, ArrowRight } from "lucide-react";
import { useLearnerProfile } from "@/hooks/useLearnerProfile";
import { useQuery } from "@tanstack/react-query";
import { db } from "@/lib/db";
import { useAuth } from "@/hooks/useAuth";

function useNextLesson() {
  const { user } = useAuth();
  const { data: profile } = useLearnerProfile();
  return useQuery({
    queryKey: ["next-lesson", user?.id, profile?.active_track_id],
    enabled: !!user && !!profile?.active_track_id,
    queryFn: async () => {
      const { data: comps } = await db
        .from("lesson_completions").select("lesson_id").eq("user_id", user!.id);
      const done = new Set((comps ?? []).map((r: any) => r.lesson_id));
      const { data: lessons } = await db
        .from("lessons").select("id, title, duration_min, order")
        .eq("track_id", profile!.active_track_id!)
        .order("order");
      return (lessons ?? []).find((l: any) => !done.has(l.id)) ?? null;
    },
  });
}

export function UpcomingCard() {
  const { data: profile } = useLearnerProfile();
  const { data: next } = useNextLesson();
  const weeklyGoal = 5;
  const xpThisWeek = profile?.xp ?? 0;
  const goalPct = Math.min(100, (xpThisWeek % (weeklyGoal * 10)) / (weeklyGoal * 10) * 100);

  return (
    <section className="section-x">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <div className="rounded-2xl glass border border-border/60 p-4">
          <div className="flex items-center gap-2 mb-2">
            <CalendarClock className="h-4 w-4 text-primary" />
            <p className="text-[11px] uppercase tracking-[0.16em] font-semibold text-muted-foreground">Up next</p>
          </div>
          {next ? (
            <>
              <p className="font-semibold text-sm line-clamp-2">{next.title}</p>
              <Link to={`/lesson/${next.id}`} className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-primary">
                Start lesson <ArrowRight className="h-3 w-3" />
              </Link>
            </>
          ) : (
            <p className="text-sm text-muted-foreground">Pick a track to schedule your next mission.</p>
          )}
        </div>
        <div className="rounded-2xl glass border border-border/60 p-4">
          <div className="flex items-center gap-2 mb-2">
            <Target className="h-4 w-4 text-emerald-400" />
            <p className="text-[11px] uppercase tracking-[0.16em] font-semibold text-muted-foreground">Weekly goal</p>
          </div>
          <p className="font-semibold text-sm">Finish {weeklyGoal} lessons</p>
          <div className="mt-3 h-1.5 rounded-full bg-border/60 overflow-hidden">
            <div className="h-full gradient-primary" style={{ width: `${goalPct}%` }} />
          </div>
        </div>
      </div>
    </section>
  );
}

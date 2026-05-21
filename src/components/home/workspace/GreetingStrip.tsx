import { Flame } from "lucide-react";
import { Link } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuth } from "@/hooks/useAuth";
import { useProfile } from "@/hooks/useProfile";
import { useLearnerProfile } from "@/hooks/useLearnerProfile";

function timeGreeting(d = new Date()) {
  const h = d.getHours();
  if (h < 12) return "Good morning";
  if (h < 17) return "Good afternoon";
  return "Good evening";
}

const STATES = [
  "You're making steady progress.",
  "One small step today beats none.",
  "Momentum loves a curious mind.",
  "Tiny wins compound. Keep going.",
];

export function GreetingStrip() {
  const { user } = useAuth();
  const { data: profile } = useProfile(user?.id);
  const { data: learner } = useLearnerProfile();
  const name = profile?.full_name?.split(" ")[0] || profile?.username || "friend";
  const streak = learner?.streak_days ?? 0;
  const state = STATES[new Date().getDate() % STATES.length];
  const initial = (name[0] || "A").toUpperCase();

  return (
    <section className="section-x">
      <div className="flex items-center gap-3 rounded-2xl glass border border-border/60 px-4 py-3">
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2 flex-wrap">
            <p className="font-semibold text-sm truncate">{timeGreeting()}, {name} 👋</p>
            {streak > 0 && (
              <span className="inline-flex items-center gap-1 text-[11px] font-semibold rounded-full px-2 py-0.5 bg-primary/15 text-primary border border-primary/30">
                <Flame className="h-3 w-3" />
                {streak}d
              </span>
            )}
          </div>
          <p className="text-xs text-muted-foreground truncate mt-0.5">{state}</p>
        </div>
        <Link to="/profile" className="focus-ring rounded-full">
          <Avatar className="h-10 w-10 border border-border/60">
            <AvatarImage src={profile?.avatar_url ?? undefined} alt={name} />
            <AvatarFallback className="bg-primary/15 text-primary text-xs font-semibold">{initial}</AvatarFallback>
          </Avatar>
        </Link>
      </div>
    </section>
  );
}

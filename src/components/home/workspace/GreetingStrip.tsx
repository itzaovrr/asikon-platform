import { Bell, SlidersHorizontal } from "lucide-react";
import { Link } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuth } from "@/hooks/useAuth";
import { useProfile } from "@/hooks/useProfile";

export function GreetingStrip() {
  const { user } = useAuth();
  const { data: profile } = useProfile(user?.id);
  const name = profile?.full_name || profile?.username || "Learner";
  const initial = (name[0] || "A").toUpperCase();

  return (
    <section className="section-x">
      <div className="flex items-center justify-between gap-3">
        <div className="min-w-0">
          <p className="text-[10px] uppercase tracking-[0.2em] text-black/60 font-bold">Welcome</p>
          <h1 className="font-grotesk text-[22px] sm:text-[26px] font-black tracking-tight truncate leading-tight">
            {name}
          </h1>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <Link
            to="/profile"
            aria-label="Notifications"
            className="relative h-10 w-10 rounded-2xl border-2 border-black bg-white shadow-[2px_2px_0_0_rgba(0,0,0,1)] flex items-center justify-center transition-transform hover:-translate-y-0.5"
          >
            <Bell className="h-[18px] w-[18px] text-black" strokeWidth={2.25} />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-primary border-2 border-black" />
          </Link>
          <Link to="/profile" aria-label="Profile">
            <Avatar className="h-10 w-10 rounded-2xl border-2 border-black shadow-[2px_2px_0_0_rgba(0,0,0,1)]">
              <AvatarImage src={profile?.avatar_url ?? undefined} alt={name} className="rounded-2xl" />
              <AvatarFallback className="rounded-2xl bg-primary text-primary-foreground text-sm font-black font-grotesk">{initial}</AvatarFallback>
            </Avatar>
          </Link>
          <Link
            to="/settings"
            aria-label="Settings"
            className="h-10 w-10 rounded-2xl border-2 border-black bg-white shadow-[2px_2px_0_0_rgba(0,0,0,1)] flex items-center justify-center transition-transform hover:-translate-y-0.5"
          >
            <SlidersHorizontal className="h-[18px] w-[18px] text-black" strokeWidth={2.25} />
          </Link>
        </div>
      </div>
    </section>
  );
}

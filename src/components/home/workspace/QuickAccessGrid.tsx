import { Link } from "react-router-dom";
import {
  Sparkles, BookOpenText, CalendarCheck2, LineChart, GraduationCap, Wand2,
  ShoppingBag, Gamepad2,
} from "lucide-react";
import { Reveal } from "@/components/transitions/Reveal";

type Tile = { icon: any; label: string; href: string; accent?: boolean };

const TILES: Tile[] = [
  { icon: BookOpenText,   label: "Continue", href: "/learn", accent: true },
  { icon: Sparkles,       label: "AI Tutor", href: "/learn" },
  { icon: CalendarCheck2, label: "Planner",  href: "/learn" },
  { icon: LineChart,      label: "Progress", href: "/profile" },
  { icon: GraduationCap,  label: "Mentors",  href: "/mentors", accent: true },
  { icon: Wand2,          label: "Prompts",  href: "/prompts" },
  { icon: ShoppingBag,    label: "Explore",  href: "/shop" },
  { icon: Gamepad2,       label: "Games",    href: "/game" },
];

function Tile({ Icon, label, href, accent }: { Icon: any; label: string; href: string; accent?: boolean }) {
  return (
    <Link to={href} className="shrink-0 flex flex-col items-center gap-1.5 group">
      <div
        className={`w-14 h-14 rounded-2xl border-2 border-black flex items-center justify-center shadow-[3px_3px_0_0_rgba(0,0,0,1)] transition-transform group-hover:-translate-y-0.5 ${
          accent ? "bg-primary text-primary-foreground" : "bg-white text-black"
        }`}
      >
        <Icon className="h-5 w-5" strokeWidth={2.25} />
      </div>
      <span className="text-[10px] font-bold uppercase tracking-wider">{label}</span>
    </Link>
  );
}

export function QuickAccessGrid() {
  return (
    <Reveal as="section" className="section-x">
      <div className="flex items-end justify-between mb-3">
        <h2 className="font-grotesk font-black text-base tracking-tight">Quick Actions</h2>
        <Link to="/profile" className="text-[11px] font-bold uppercase tracking-wider text-primary underline underline-offset-4">See all</Link>
      </div>

      {/* Mobile: single-row scroll */}
      <div className="md:hidden flex gap-3 overflow-x-auto no-scrollbar -mx-4 px-4 pb-1">
        {TILES.map(({ icon, label, href, accent }) => (
          <Tile key={label} Icon={icon} label={label} href={href} accent={accent} />
        ))}
      </div>

      {/* Desktop: grid */}
      <div className="hidden md:grid grid-cols-8 gap-3">
        {TILES.map(({ icon, label, href, accent }) => (
          <Tile key={label} Icon={icon} label={label} href={href} accent={accent} />
        ))}
      </div>
    </Reveal>
  );
}

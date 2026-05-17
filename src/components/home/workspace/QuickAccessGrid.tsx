import { Link } from "react-router-dom";
import { Sparkles, BookOpen, CalendarCheck, TrendingUp, Users, GraduationCap, NotebookPen, Heart, ShoppingBag, Bookmark } from "lucide-react";
import { Reveal } from "@/components/transitions/Reveal";

const TILES = [
  { icon: BookOpen, label: "Continue", href: "/learn" },
  { icon: Sparkles, label: "AI Tutor", href: "/learn" },
  { icon: CalendarCheck, label: "Planner", href: "/learn" },
  { icon: TrendingUp, label: "Progress", href: "/profile" },
  { icon: Users, label: "Community", href: "/community" },
  { icon: GraduationCap, label: "Mentors", href: "/mentors" },
  { icon: NotebookPen, label: "Prompts", href: "/prompts" },
  { icon: Bookmark, label: "Saved", href: "/wishlist" },
];

export function QuickAccessGrid() {
  return (
    <Reveal as="section" className="section-x">
      <p className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground font-semibold mb-2">Quick access</p>
      {/* Mobile: 2 rows × 4 cols horizontal carousel via snap. Desktop: responsive grid */}
      <div className="md:hidden -mx-4 px-4 overflow-x-auto no-scrollbar snap-x snap-mandatory">
        <div className="grid grid-rows-2 grid-flow-col auto-cols-[22%] gap-2 pr-4">
          {TILES.map((t) => <Tile key={t.label} {...t} />)}
        </div>
      </div>
      <div className="hidden md:grid grid-cols-4 lg:grid-cols-8 gap-3">
        {TILES.map((t) => <Tile key={t.label} {...t} />)}
      </div>
    </Reveal>
  );
}

function Tile({ icon: Icon, label, href }: { icon: any; label: string; href: string }) {
  return (
    <Link
      to={href}
      className="snap-start pressable focus-ring flex flex-col items-center justify-center gap-1.5 aspect-square rounded-2xl glass border border-border/60 hover:border-primary/40 transition-colors p-2"
    >
      <div className="w-9 h-9 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center">
        <Icon className="h-4.5 w-4.5 text-primary" />
      </div>
      <span className="text-[11px] font-medium leading-tight text-center">{label}</span>
    </Link>
  );
}

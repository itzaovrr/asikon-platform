import { Link } from "react-router-dom";
import useEmblaCarousel from "embla-carousel-react";
import {
  Sparkles, BookOpenText, CalendarCheck2, LineChart, GraduationCap, Wand2,
  Heart, ShoppingBag, PackageCheck, Compass, PlayCircle, Gamepad2, MessagesSquare,
  BellRing, Settings2, Info, PlusCircle, Store, Users, UserCircle2, LifeBuoy,
} from "lucide-react";
import { Reveal } from "@/components/transitions/Reveal";
import { cn } from "@/lib/utils";

type Tile = {
  icon: any;
  label: string;
  href: string;
  /** Tailwind gradient classes for the icon chip. */
  tone: string;
};

// All tiles use the brand dark-red gradient. Subtle opacity variations keep
// the row visually rhythmic without breaking the single-brand identity.
const BRAND_A = "from-primary to-primary/70";
const BRAND_B = "from-primary/85 to-primary/55";
const BRAND_C = "from-primary/95 to-primary/65";
const TILES: Tile[] = [
  { icon: BookOpenText,   label: "Continue", href: "/learn",              tone: BRAND_A },
  { icon: Sparkles,       label: "AI Tutor", href: "/learn",              tone: BRAND_B },
  { icon: CalendarCheck2, label: "Planner",  href: "/learn",              tone: BRAND_C },
  { icon: LineChart,      label: "Progress", href: "/profile",            tone: BRAND_A },
  { icon: GraduationCap,  label: "Mentors",  href: "/mentors",            tone: BRAND_B },
  { icon: Wand2,          label: "Prompts",  href: "/prompts",            tone: BRAND_C },
  { icon: Store,          label: "Shop",     href: "/shop",               tone: BRAND_A },
  { icon: Users,          label: "Community",href: "/community",          tone: BRAND_B },
  { icon: Heart,          label: "Saved",    href: "/wishlist",           tone: BRAND_C },
  { icon: ShoppingBag,    label: "Cart",     href: "/cart",               tone: BRAND_A },
  { icon: PackageCheck,   label: "Orders",   href: "/orders",             tone: BRAND_B },
  { icon: Compass,        label: "Tracks",   href: "/shop?type=courses",  tone: BRAND_C },
  { icon: PlayCircle,     label: "Lessons",  href: "/learn",              tone: BRAND_A },
  { icon: Gamepad2,       label: "Games",    href: "/game",               tone: BRAND_B },
  { icon: MessagesSquare, label: "Messages", href: "/community",          tone: BRAND_C },
  { icon: BellRing,       label: "Alerts",   href: "/profile",            tone: BRAND_A },
  { icon: PlusCircle,     label: "Create",   href: "/create",             tone: BRAND_B },
  { icon: UserCircle2,    label: "Profile",  href: "/profile",            tone: BRAND_C },
  { icon: LifeBuoy,       label: "Help",     href: "/about",              tone: BRAND_A },
  { icon: Info,           label: "About",    href: "/about",              tone: BRAND_B },
  { icon: Settings2,      label: "Settings", href: "/settings",           tone: BRAND_C },
];

export function QuickAccessGrid() {
  const [emblaRef] = useEmblaCarousel({
    align: "start",
    dragFree: true,
    containScroll: "trimSnaps",
  });

  // chunk into pairs (2 rows on mobile)
  const pairs: Tile[][] = [];
  for (let i = 0; i < TILES.length; i += 2) pairs.push(TILES.slice(i, i + 2));

  return (
    <Reveal as="section" className="section-x">
      <div className="flex items-end justify-between mb-2.5">
        <p className="eyebrow text-muted-foreground">Quick access</p>
        <span className="text-[10.5px] text-muted-foreground/70">Swipe →</span>
      </div>

      {/* Mobile: 2-row embla carousel */}
      <div className="md:hidden -mx-3 px-3 overflow-hidden" ref={emblaRef}>
        <div className="flex gap-2.5">
          {pairs.map((pair, i) => (
            <div key={i} className="shrink-0 flex flex-col gap-2.5 w-[74px]">
              {pair.map((t) => <Tile key={t.label} {...t} />)}
            </div>
          ))}
        </div>
      </div>

      {/* Desktop: responsive grid */}
      <div className="hidden md:grid grid-cols-6 lg:grid-cols-10 xl:grid-cols-11 gap-2.5 lg:gap-3">
        {TILES.map((t) => <Tile key={t.label} {...t} />)}
      </div>
    </Reveal>
  );
}

function Tile({ icon: Icon, label, href, tone }: Tile) {
  return (
    <Link
      to={href}
      className="group focus-ring flex flex-col items-center gap-1.5 lg:gap-2 rounded-2xl py-2.5 lg:py-3 px-1.5 active:scale-[0.94] hover:-translate-y-0.5 transition-transform"
    >
      <div
        className={cn(
          "w-[52px] h-[52px] lg:w-[58px] lg:h-[58px] rounded-[18px] bg-gradient-to-br shadow-[0_6px_14px_-6px_hsl(var(--primary)/0.45)]",
          "flex items-center justify-center ring-1 ring-primary/20",
          "group-hover:shadow-[0_14px_28px_-8px_hsl(var(--primary)/0.65)] group-hover:ring-primary/40 transition-all duration-300",
          tone,
        )}
      >
        <Icon className="h-[22px] w-[22px] lg:h-6 lg:w-6 text-primary-foreground" strokeWidth={2.25} />
      </div>
      <span className="text-[10.5px] lg:text-[11.5px] font-medium leading-tight text-center truncate w-full text-foreground/85 group-hover:text-foreground transition-colors">
        {label}
      </span>
    </Link>
  );
}

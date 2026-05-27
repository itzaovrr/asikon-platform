import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowUpRight, BookOpen, GraduationCap, Sparkles } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import courseImg from "@/assets/course-ai-ml.jpg";
import bookImg from "@/assets/book-hardcover.jpg";
import teachImg from "@/assets/ai-tutor.jpg";

type Item = {
  chip: string;
  title: string;
  subtitle: string;
  eta: string;
  href: string;
  image: string;
  Icon: typeof BookOpen;
  tone: "primary" | "glass" | "accent";
};

const ITEMS: Item[] = [
  {
    chip: "Course",
    title: "Agentic AI Engineering",
    subtitle: "Build production AI agents end-to-end.",
    eta: "Launches Q3",
    href: "/courses",
    image: courseImg,
    Icon: GraduationCap,
    tone: "primary",
  },
  {
    chip: "Book",
    title: "Prompting in Practice",
    subtitle: "A field guide for serious AI users.",
    eta: "Next month",
    href: "/shop",
    image: bookImg,
    Icon: BookOpen,
    tone: "glass",
  },
  {
    chip: "1-on-1 Teaching",
    title: "Python for Kids",
    subtitle: "Personal tutor, weekly live sessions.",
    eta: "Waitlist open",
    href: "/mentors",
    image: teachImg,
    Icon: Sparkles,
    tone: "accent",
  },
];

const toneClass: Record<Item["tone"], string> = {
  primary:
    "bg-[linear-gradient(160deg,hsl(var(--primary)/0.22),hsl(var(--background)/0.6))] border-primary/30",
  glass:
    "bg-card/60 border-border/60 backdrop-blur-md",
  accent:
    "bg-[linear-gradient(160deg,hsl(var(--accent)/0.18),hsl(var(--background)/0.6))] border-accent/30",
};

export default function ComingSoonTrio() {
  const { toast } = useToast();

  return (
    <section className="section-x">
      <div className="mb-4 flex items-end justify-between gap-3">
        <div>
          <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">
            What's next
          </p>
          <h2 className="font-grotesk text-2xl font-semibold text-foreground sm:text-3xl">
            New <span className="text-primary">·</span> Coming soon
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Fresh drops landing soon — a course, a book, and 1-on-1 teaching.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {ITEMS.map((item, i) => (
          <motion.article
            key={item.title}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
            whileHover={{ y: -4 }}
            className={`group relative overflow-hidden rounded-3xl border p-5 shadow-[0_10px_40px_-20px_hsl(var(--primary)/0.5)] transition-shadow hover:shadow-[0_20px_60px_-20px_hsl(var(--primary)/0.7)] ${toneClass[item.tone]}`}
          >
            <div className="flex items-center justify-between">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-border/60 bg-background/70 px-2.5 py-1 text-[11px] font-medium text-foreground/80 backdrop-blur">
                <item.Icon className="h-3.5 w-3.5 text-primary" />
                {item.chip}
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/15 px-2.5 py-1 text-[11px] font-medium text-primary">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-primary" />
                </span>
                {item.eta}
              </span>
            </div>

            <h3 className="mt-4 font-grotesk text-xl font-semibold text-foreground">
              {item.title}
            </h3>
            <p className="mt-1 text-sm text-muted-foreground">{item.subtitle}</p>

            <div className="mt-4 overflow-hidden rounded-2xl border border-border/40">
              <div className="relative aspect-[16/10] w-full overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-background/10 to-transparent" />
              </div>
            </div>

            <div className="mt-4 flex items-center gap-2">
              <Button
                size="sm"
                variant="secondary"
                className="rounded-full"
                onClick={() =>
                  toast({
                    title: "You're on the list",
                    description: `We'll notify you when ${item.title} launches.`,
                  })
                }
              >
                Notify me
              </Button>
              <Button asChild size="sm" variant="ghost" className="rounded-full">
                <Link to={item.href} className="inline-flex items-center gap-1">
                  Preview
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </Link>
              </Button>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
}

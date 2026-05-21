import { Link } from "react-router-dom";
import { GraduationCap, ShieldCheck, Languages, UserCheck, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export function MentorshipHomeSection() {
  return (
    <section className="section-x">
      <div
        className="relative overflow-hidden rounded-3xl border border-primary/25 p-5 lg:p-10"
        style={{ background: "var(--gradient-primary-soft)" }}
      >
        {/* Ambient glow accents */}
        <div
          aria-hidden
          className="pointer-events-none absolute -top-24 -right-24 h-72 w-72 rounded-full opacity-50 blur-3xl"
          style={{ background: "radial-gradient(circle, hsl(var(--primary) / 0.35), transparent 70%)" }}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -bottom-32 -left-20 h-80 w-80 rounded-full opacity-40 blur-3xl"
          style={{ background: "radial-gradient(circle, hsl(var(--primary) / 0.25), transparent 70%)" }}
        />

        <div className="relative grid lg:grid-cols-[1.4fr_1fr] gap-8 items-center">
          <div>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/15 text-primary text-[10px] font-semibold uppercase tracking-[0.18em] px-2.5 py-1">
              New · Coming soon
            </span>

            <div className="mt-3 flex items-start gap-4">
              <div className="hidden sm:flex w-14 h-14 lg:w-16 lg:h-16 rounded-2xl gradient-primary items-center justify-center shadow-[var(--shadow-glow)] shrink-0">
                <GraduationCap className="h-7 w-7 lg:h-8 lg:w-8 text-primary-foreground" />
              </div>
              <div className="min-w-0">
                <h2 className="font-display font-bold text-lg lg:text-3xl xl:text-4xl leading-tight tracking-tight">
                  Book a personal teacher for your child
                </h2>
                <p className="text-sm lg:text-base text-muted-foreground mt-2 max-w-xl">
                  1-on-1 mentorship with verified tutors — built for parents who want focused, accountable progress.
                </p>
              </div>
            </div>

            <div className="mt-5 lg:mt-7 flex flex-wrap items-center gap-2 lg:gap-3">
              <Button asChild variant="premium" size="lg">
                <Link to="/mentors" className="inline-flex items-center gap-1.5">
                  Join the waitlist
                  <ArrowUpRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link to="/mentors">Meet the mentors</Link>
              </Button>
            </div>
          </div>

          <ul className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-1 gap-2 lg:gap-3">
            <Trust icon={ShieldCheck} text="Background-checked tutors" />
            <Trust icon={Languages} text="Bangla & English support" />
            <Trust icon={UserCheck} text="One-on-one, parent updates" />
          </ul>
        </div>
      </div>
    </section>
  );
}

function Trust({ icon: Icon, text }: { icon: any; text: string }) {
  return (
    <li className="flex items-center gap-2 rounded-xl bg-background/60 backdrop-blur-sm border border-border/40 px-3 py-2">
      <Icon className="h-4 w-4 text-primary shrink-0" />
      <span className="text-xs font-medium">{text}</span>
    </li>
  );
}

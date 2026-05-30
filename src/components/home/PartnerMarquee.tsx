const PARTNERS = [
  "Spotify",
  "Coinbase",
  "Slack",
  "Dropbox",
  "Webflow",
  "Zoom",
  "Notion",
  "Figma",
];

export function PartnerMarquee() {
  return (
    <section className="bg-secondary/40 border-y border-border/60 overflow-hidden">
      <div className="group relative">
        <div className="flex gap-12 sm:gap-16 py-5 sm:py-7 animate-marquee whitespace-nowrap will-change-transform group-hover:[animation-play-state:paused]">
          {[...PARTNERS, ...PARTNERS].map((p, i) => (
            <span
              key={`${p}-${i}`}
              className="font-display font-bold text-xl sm:text-2xl text-muted-foreground/70 hover:text-foreground transition-colors shrink-0"
            >
              {p}
            </span>
          ))}
        </div>
        {/* edge fade */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 left-0 w-12 sm:w-24"
          style={{
            background:
              "linear-gradient(to right, hsl(var(--secondary)/0.4), transparent)",
          }}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 right-0 w-12 sm:w-24"
          style={{
            background:
              "linear-gradient(to left, hsl(var(--secondary)/0.4), transparent)",
          }}
        />
      </div>
    </section>
  );
}

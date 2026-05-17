import { Lightbulb } from "lucide-react";

const TIPS = [
  { tag: "Learning", text: "Review yesterday's lesson for 2 minutes before starting today's — it doubles retention." },
  { tag: "AI tip", text: "Ask the tutor to explain like you're 10. Then ask it to explain like a senior engineer." },
  { tag: "Focus", text: "Close one tab before starting. Just one. Your attention will thank you." },
  { tag: "Habit", text: "Same time, same place, every day. Boring schedules build extraordinary skills." },
  { tag: "Prompt", text: "Add 'step by step, with examples' to any prompt — instantly better answers." },
];

export function InsightCard() {
  const tip = TIPS[new Date().getDate() % TIPS.length];
  return (
    <section className="section-x">
      <div className="rounded-2xl border border-border/60 bg-card p-4 flex gap-3 items-start">
        <div className="w-8 h-8 rounded-lg bg-amber-400/15 border border-amber-400/30 flex items-center justify-center shrink-0">
          <Lightbulb className="h-4 w-4 text-amber-400" />
        </div>
        <div className="min-w-0">
          <p className="text-[10px] uppercase tracking-[0.16em] font-semibold text-muted-foreground">{tip.tag}</p>
          <p className="text-sm text-foreground/90 mt-1 leading-relaxed">{tip.text}</p>
        </div>
      </div>
    </section>
  );
}

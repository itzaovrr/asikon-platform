import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Sparkles, ArrowRight } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const ALL_CHIPS = [
  "Explain SSC Physics",
  "Make a study plan",
  "Quiz me on HSC Math",
  "Summarise a chapter",
  "Help me with English grammar",
  "Explain the water cycle",
  "What is photosynthesis?",
  "Help me memorise vocabulary",
];

export function AiAssistantBox() {
  const [q, setQ] = useState("");
  const nav = useNavigate();
  const CHIPS = useMemo(() => {
    const shuffled = [...ALL_CHIPS].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, 3);
  }, []);
  const go = (text: string) => {
    const trimmed = text.trim();
    if (!trimmed) return nav("/learn");
    nav(`/learn?q=${encodeURIComponent(trimmed)}`);
  };
  return (
    <section className="section-x">
      <div className="rounded-2xl border border-primary/25 p-4" style={{ background: "var(--gradient-primary-soft)" }}>
        <div className="flex items-center gap-2 mb-3">
          <div className="w-8 h-8 rounded-lg gradient-primary flex items-center justify-center shadow-[var(--shadow-glow)]">
            <Sparkles className="h-4 w-4 text-primary-foreground" />
          </div>
          <p className="font-semibold text-sm">Ask the AI tutor</p>
        </div>
        <form
          onSubmit={(e) => { e.preventDefault(); go(q); }}
          className="flex items-center gap-2"
        >
          <Input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Ask anything in Bangla or English…"
            className="bg-background/60 border-border/60"
          />
          <Button type="submit" variant="premium" size="icon" aria-label="Ask">
            <ArrowRight className="h-4 w-4" />
          </Button>
        </form>
        <div className="flex gap-2 mt-3 flex-wrap">
          {CHIPS.map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => go(c)}
              className="text-[11px] px-2.5 py-1 rounded-full border border-border/60 bg-background/40 hover:border-primary/40 hover:text-primary transition-colors"
            >
              {c}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

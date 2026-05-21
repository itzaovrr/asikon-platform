import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { adminNavItems } from "@/pages/admin/adminNav";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  recent?: { label: string; url: string }[];
}

export function AdminCommandPalette({ open, onOpenChange, recent = [] }: Props) {
  const navigate = useNavigate();
  const [q, setQ] = useState("");

  useEffect(() => {
    if (!open) setQ("");
  }, [open]);

  const filtered = useMemo(() => {
    const term = q.trim().toLowerCase();
    if (!term) return adminNavItems;
    return adminNavItems.filter((i) => i.title.toLowerCase().includes(term));
  }, [q]);

  const go = (url: string) => {
    navigate(url);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="p-0 overflow-hidden max-w-xl glass-strong">
        <div className="flex items-center gap-2 border-b border-border/50 px-3">
          <Search className="h-4 w-4 text-muted-foreground" />
          <Input
            autoFocus
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search admin pages…"
            className="border-0 bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 h-12"
            onKeyDown={(e) => {
              if (e.key === "Enter" && filtered[0]) go(filtered[0].url);
            }}
          />
          <kbd className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-muted text-muted-foreground mr-2">
            ESC
          </kbd>
        </div>
        <div className="max-h-[60vh] overflow-y-auto p-2">
          {recent.length > 0 && !q && (
            <div className="mb-2">
              <p className="px-2 pt-1 pb-1 text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
                Recent
              </p>
              {recent.slice(0, 5).map((r, i) => (
                <button
                  key={i}
                  onClick={() => go(r.url)}
                  className="w-full text-left flex items-center px-2 py-2 rounded-lg hover:bg-muted/60 text-sm"
                >
                  {r.label}
                </button>
              ))}
            </div>
          )}
          <p className="px-2 pt-1 pb-1 text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
            Pages
          </p>
          {filtered.length === 0 && (
            <p className="px-2 py-6 text-sm text-muted-foreground text-center">
              No matches.
            </p>
          )}
          {filtered.map((item) => (
            <button
              key={item.url}
              onClick={() => go(item.url)}
              className="w-full text-left flex items-center gap-3 px-2 py-2 rounded-lg hover:bg-muted/60 text-sm"
            >
              <span className="grid place-items-center h-8 w-8 rounded-lg bg-muted/60 text-muted-foreground">
                <item.icon className="h-4 w-4" />
              </span>
              <span className="font-medium flex-1">{item.title}</span>
              <span className="text-[10px] text-muted-foreground/70 hidden sm:inline">
                {item.section}
              </span>
            </button>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}

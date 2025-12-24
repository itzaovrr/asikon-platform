import { cn } from "@/lib/utils";

interface CategoryPillProps {
  name: string;
  icon?: string;
  isActive?: boolean;
  onClick?: () => void;
}

export function CategoryPill({ name, icon, isActive, onClick }: CategoryPillProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium",
        "border transition-all duration-200 whitespace-nowrap",
        isActive
          ? "gradient-primary border-transparent text-foreground"
          : "bg-secondary/50 border-border text-muted-foreground hover:text-foreground hover:border-primary/50"
      )}
    >
      {icon && <span>{icon}</span>}
      {name}
    </button>
  );
}

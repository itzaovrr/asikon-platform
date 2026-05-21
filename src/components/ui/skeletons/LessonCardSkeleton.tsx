import { Skeleton } from "@/components/ui/skeleton";

export function LessonCardSkeleton() {
  return (
    <div className="flex items-center gap-3 rounded-2xl border border-border/50 bg-card p-3">
      <Skeleton className="h-11 w-11 rounded-xl shrink-0" />
      <div className="flex-1 min-w-0 space-y-2">
        <Skeleton className="h-3.5 w-3/4" />
        <Skeleton className="h-2.5 w-1/3" />
      </div>
      <Skeleton className="h-7 w-14 rounded-full" />
    </div>
  );
}

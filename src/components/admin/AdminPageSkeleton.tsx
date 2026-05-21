import { Skeleton } from "@/components/ui/skeleton";

/** Loading skeleton for admin pages — 4 stat cards + a table-ish list. */
export function AdminPageSkeleton() {
  return (
    <div className="space-y-6 animate-in fade-in-50">
      <div>
        <Skeleton className="h-3 w-24 mb-2" />
        <Skeleton className="h-7 w-72" />
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="glass rounded-2xl p-4 space-y-3">
            <Skeleton className="h-3 w-20" />
            <Skeleton className="h-7 w-16" />
            <Skeleton className="h-7 w-full" />
          </div>
        ))}
      </div>
      <div className="glass rounded-2xl p-5 space-y-3">
        <Skeleton className="h-4 w-40" />
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="flex items-center gap-3">
            <Skeleton className="h-10 w-10 rounded-full" />
            <Skeleton className="h-4 flex-1" />
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-4 w-12" />
          </div>
        ))}
      </div>
    </div>
  );
}

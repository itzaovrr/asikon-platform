import { SectionHeader } from "@/components/ui/section-header";

/** Placeholder — full implementation in Part 3.3 */
export default function AdminRewards() {
  return (
    <div className="space-y-6">
      <SectionHeader
        eyebrow="Rewards"
        title="Manage rewards & redemptions"
        subtitle="Configure the coin store, stock and approve redemptions."
      />
      <div className="glass rounded-2xl p-10 text-center text-sm text-muted-foreground">
        Rewards management will appear here.
      </div>
    </div>
  );
}

import { SectionHeader } from "@/components/ui/section-header";

/** Placeholder — full implementation in Part 3.1 */
export default function AdminAnalytics() {
  return (
    <div className="space-y-6">
      <SectionHeader
        eyebrow="Analytics"
        title="Insights & trends"
        subtitle="Detailed analytics coming next — KPIs, growth charts and lesson heatmap."
      />
      <div className="glass rounded-2xl p-10 text-center text-sm text-muted-foreground">
        Analytics dashboard will appear here.
      </div>
    </div>
  );
}

import { SectionHeader } from "@/components/ui/section-header";

/** Placeholder — full implementation in Part 3.2 */
export default function AdminNotifications() {
  return (
    <div className="space-y-6">
      <SectionHeader
        eyebrow="Notifications"
        title="Broadcast & history"
        subtitle="Send announcements to all users or specific roles."
      />
      <div className="glass rounded-2xl p-10 text-center text-sm text-muted-foreground">
        Notification tools will appear here.
      </div>
    </div>
  );
}

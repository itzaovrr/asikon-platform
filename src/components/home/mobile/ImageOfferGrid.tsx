import { Link } from "react-router-dom";
import { Skeleton } from "@/components/ui/skeleton";
import { useHomeBanners } from "@/hooks/useHomeBanners";

export function ImageOfferGrid() {
  const { data: banners, isLoading } = useHomeBanners("offer");

  if (isLoading) {
    return (
      <section className="section-x">
        <div className="grid grid-cols-3 gap-3">
          {[0, 1, 2].map((i) => (
            <Skeleton key={i} className="aspect-square rounded-2xl" />
          ))}
        </div>
      </section>
    );
  }

  const items = banners ?? [];
  if (items.length === 0) return null;

  return (
    <section className="section-x">
      <div className="flex items-end justify-between mb-2">
        <h2 className="font-semibold text-base">Today's Offers</h2>
      </div>
      <div className="grid grid-cols-3 gap-3">
        {items.slice(0, 6).map((b) => {
          const inner = (
            <div className="aspect-square rounded-2xl overflow-hidden border border-border/40 shadow-sm">
              <img
                src={b.image_url}
                alt={b.alt_text ?? "Offer"}
                loading="lazy"
                className="w-full h-full object-cover"
              />
            </div>
          );
          return b.link_url ? (
            <Link key={b.id} to={b.link_url} className="pressable focus-ring rounded-2xl block">
              {inner}
            </Link>
          ) : (
            <div key={b.id}>{inner}</div>
          );
        })}
      </div>
    </section>
  );
}

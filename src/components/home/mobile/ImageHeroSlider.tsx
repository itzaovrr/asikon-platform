import { useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { Link } from "react-router-dom";
import { Skeleton } from "@/components/ui/skeleton";
import { useHomeBanners } from "@/hooks/useHomeBanners";
import { cn } from "@/lib/utils";

export function ImageHeroSlider() {
  const { data: banners, isLoading } = useHomeBanners("hero");
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, align: "center" },
    [Autoplay({ delay: 4500, stopOnInteraction: false })],
  );
  const [selected, setSelected] = useState(0);

  useEffect(() => {
    if (!emblaApi) return;
    const onSel = () => setSelected(emblaApi.selectedScrollSnap());
    emblaApi.on("select", onSel);
    onSel();
    return () => {
      emblaApi.off("select", onSel);
    };
  }, [emblaApi]);

  if (isLoading) {
    return (
      <div className="section-x">
        <Skeleton className="w-full aspect-[21/10] rounded-3xl" />
      </div>
    );
  }

  const items = banners ?? [];
  if (items.length === 0) return null;

  return (
    <section className="section-x">
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex gap-3">
          {items.map((b) => {
            const Inner = (
              <div className="relative w-full aspect-[21/10] rounded-3xl overflow-hidden shadow-xl shadow-primary/10 border border-border/40">
                <img
                  src={b.image_url}
                  alt={b.alt_text ?? "Promotional banner"}
                  loading="lazy"
                  className="w-full h-full object-cover"
                />
              </div>
            );
            return (
              <div
                key={b.id}
                className="shrink-0 grow-0 basis-[88%] sm:basis-[70%] md:basis-[55%] pressable"
              >
                {b.link_url ? (
                  <Link to={b.link_url} className="block focus-ring rounded-3xl">
                    {Inner}
                  </Link>
                ) : (
                  Inner
                )}
              </div>
            );
          })}
        </div>
      </div>

      {items.length > 1 && (
        <div className="flex justify-center gap-1.5 mt-3">
          {items.map((_, i) => (
            <button
              key={i}
              aria-label={`Go to slide ${i + 1}`}
              onClick={() => emblaApi?.scrollTo(i)}
              className={cn(
                "h-1.5 rounded-full transition-all",
                selected === i ? "w-5 bg-primary" : "w-1.5 bg-foreground/20",
              )}
            />
          ))}
        </div>
      )}
    </section>
  );
}

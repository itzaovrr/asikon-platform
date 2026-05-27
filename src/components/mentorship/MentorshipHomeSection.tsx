import { useRef } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { Button } from "@/components/ui/button";
import tutorSsc from "@/assets/tutor-ssc.jpg";
import tutorHsc from "@/assets/tutor-hsc.jpg";
import tutorBsc from "@/assets/tutor-bsc.jpg";

type Slide = {
  image: string;
  eyebrow: string;
  title: string;
  body: string;
};

const slides: Slide[] = [
  {
    image: tutorSsc,
    eyebrow: "For SSC parents",
    title: "Help your child ace SSC with a personal tutor.",
    body: "Verified university tutors come to your home. Book a free demo class today.",
  },
  {
    image: tutorHsc,
    eyebrow: "For HSC parents",
    title: "A focused HSC tutor, matched to your child.",
    body: "Top BUET and Dhaka University students teach one-on-one. Try the first class free.",
  },
  {
    image: tutorBsc,
    eyebrow: "For BSc students",
    title: "University-level tutoring, on your schedule.",
    body: "BSc subjects taught by senior students and graduates. Free intro session.",
  },
];

export function MentorshipHomeSection() {
  const autoplay = useRef(Autoplay({ delay: 5000, stopOnInteraction: false, stopOnMouseEnter: true }));
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: "start" }, [autoplay.current]);

  return (
    <section className="section-x">
      <div className="relative overflow-hidden rounded-3xl border border-primary/30">
        <div ref={emblaRef} className="overflow-hidden">
          <div className="flex">
            {slides.map((s, i) => (
              <div
                key={i}
                className="relative flex-[0_0_100%] min-w-0 aspect-[16/10] sm:aspect-[16/8] lg:aspect-[16/6]"
              >
                <img
                  src={s.image}
                  alt={s.title}
                  loading={i === 0 ? "eager" : "lazy"}
                  className="absolute inset-0 w-full h-full object-cover object-right"
                />
                <div
                  aria-hidden
                  className="absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(90deg, hsl(var(--primary)) 0%, hsl(var(--primary) / 0.92) 38%, hsl(var(--primary) / 0.55) 60%, transparent 85%)",
                  }}
                />
                <div className="relative h-full flex flex-col justify-center p-5 sm:p-7 lg:p-10 max-w-[68%] sm:max-w-[60%] lg:max-w-[55%]">
                  <span className="inline-flex w-fit items-center rounded-full bg-white/15 backdrop-blur-sm text-primary-foreground text-[10px] font-semibold uppercase tracking-[0.18em] px-2.5 py-1 border border-white/25 mb-3">
                    {s.eyebrow}
                  </span>
                  <h2 className="font-display font-bold text-primary-foreground leading-[1.1] tracking-tight text-[20px] sm:text-3xl lg:text-[40px]">
                    {s.title}
                  </h2>
                  <p className="text-primary-foreground/85 mt-2 sm:mt-3 leading-relaxed text-[12.5px] sm:text-sm lg:text-base max-w-md">
                    {s.body}
                  </p>
                  <div className="mt-4 lg:mt-6">
                    <Button asChild variant="secondary" size="lg" className="shadow-lg">
                      <Link to="/mentors" className="inline-flex items-center gap-1.5">
                        Book a free demo
                        <ArrowUpRight className="h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="absolute bottom-3 left-5 sm:left-7 lg:left-10 flex items-center gap-1.5 z-10">
          {slides.map((_, i) => (
            <button
              key={i}
              type="button"
              aria-label={`Go to slide ${i + 1}`}
              onClick={() => emblaApi?.scrollTo(i)}
              className="h-1.5 w-5 rounded-full bg-white/40 hover:bg-white/70 transition-colors"
            />
          ))}
        </div>
      </div>
    </section>
  );
}

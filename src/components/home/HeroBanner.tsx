import { Button } from "@/components/ui/button";
import heroImage from "@/assets/hero-fashion-1.jpg";

export function HeroBanner() {
  return (
    <div className="relative h-64 rounded-2xl overflow-hidden mx-4">
      <img
        src={heroImage}
        alt="Summer Collection"
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-background/90 via-background/50 to-transparent" />
      
      <div className="relative z-10 h-full flex flex-col justify-center p-6">
        <span className="text-xs font-semibold px-2 py-1 rounded-full gradient-primary w-fit mb-3">
          NEW DROP
        </span>
        <h2 className="text-2xl font-bold mb-2">Summer Collection</h2>
        <p className="text-sm text-muted-foreground mb-4 max-w-[200px]">
          Discover the hottest styles now with exclusive offers
        </p>
        <Button variant="secondary" size="sm" className="w-fit">
          Shop Now
        </Button>
      </div>
    </div>
  );
}

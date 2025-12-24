import { Search, Bell, ShoppingCart, ChevronRight, Gift } from "lucide-react";
import { Link } from "react-router-dom";
import { MobileLayout } from "@/components/layout/MobileLayout";
import { CoinBadge } from "@/components/ui/coin-badge";
import { HeroBanner } from "@/components/home/HeroBanner";
import { StoryCircle } from "@/components/home/StoryCircle";
import { CategoryPill } from "@/components/home/CategoryPill";
import { ProductCard } from "@/components/shop/ProductCard";
import { PostCard } from "@/components/community/PostCard";
import { mockProducts, mockStories, mockPosts, mockUser } from "@/lib/mock-data";
import { Button } from "@/components/ui/button";

const Index = () => {
  return (
    <MobileLayout>
      <div className="space-y-6">
        {/* Header */}
        <header className="sticky top-0 z-40 bg-background/95 backdrop-blur-sm border-b border-border">
          <div className="flex items-center justify-between px-4 py-3">
            <h1 className="text-xl font-bold text-gradient">StyleVerse</h1>
            <div className="flex items-center gap-3">
              <CoinBadge amount={mockUser.coins} />
              <button className="relative p-2 rounded-full hover:bg-secondary transition-colors">
                <Bell className="h-5 w-5" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-primary rounded-full" />
              </button>
              <Link to="/cart" className="p-2 rounded-full hover:bg-secondary transition-colors">
                <ShoppingCart className="h-5 w-5" />
              </Link>
            </div>
          </div>

          {/* Search Bar */}
          <div className="px-4 pb-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Find brands, items..."
                className="w-full h-10 pl-10 pr-4 rounded-full bg-secondary border border-border text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
            </div>
          </div>
        </header>

        {/* Hero Banner */}
        <HeroBanner />

        {/* Daily Check-in */}
        <div className="mx-4">
          <div className="flex items-center justify-between p-4 bg-gradient-to-r from-primary/10 to-accent/10 rounded-xl border border-primary/20">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full gradient-primary flex items-center justify-center">
                <Gift className="h-5 w-5 text-foreground" />
              </div>
              <div>
                <p className="font-semibold text-sm">Daily Check-in</p>
                <p className="text-xs text-muted-foreground">Claim +30 Coins today!</p>
              </div>
            </div>
            <Button size="sm" className="gradient-primary border-0">
              Claim
            </Button>
          </div>
        </div>

        {/* Shorts & Stories */}
        <section className="px-4">
          <div className="flex items-center justify-between mb-3">
            <h2 className="font-semibold">Shorts & Stories</h2>
            <button className="text-sm text-primary flex items-center gap-1">
              View All <ChevronRight className="h-4 w-4" />
            </button>
          </div>
          <div className="flex gap-3 overflow-x-auto hide-scrollbar pb-2">
            {mockStories.map((story, index) => (
              <StoryCircle key={story.id} story={story} isFirst={index === 0} />
            ))}
          </div>
        </section>

        {/* Trending in Community */}
        <section>
          <div className="flex items-center justify-between px-4 mb-3">
            <h2 className="font-semibold">Trending in Community</h2>
            <Link to="/community" className="text-sm text-primary flex items-center gap-1">
              View All <ChevronRight className="h-4 w-4" />
            </Link>
          </div>
          <PostCard post={mockPosts[0]} />
        </section>

        {/* Curated For You */}
        <section className="px-4">
          <div className="flex items-center justify-between mb-3">
            <h2 className="font-semibold">Curated for You</h2>
            <Link to="/shop" className="text-sm text-primary flex items-center gap-1">
              See All <ChevronRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {mockProducts.slice(0, 4).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>
      </div>
    </MobileLayout>
  );
};

export default Index;

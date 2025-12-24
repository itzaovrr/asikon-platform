import { Search, Bell, SlidersHorizontal, Sparkles } from "lucide-react";
import { useState } from "react";
import { MobileLayout } from "@/components/layout/MobileLayout";
import { CategoryPill } from "@/components/home/CategoryPill";
import { ProductCard } from "@/components/shop/ProductCard";
import { mockProducts, mockCategories } from "@/lib/mock-data";
import { Progress } from "@/components/ui/progress";

const brands = [
  { id: "featured", name: "Featured", icon: "✨" },
  { id: "nike", name: "Nike", icon: "👟" },
  { id: "adidas", name: "Adidas", icon: "🔥" },
  { id: "gucci", name: "Gucci", icon: "💎" },
  { id: "zara", name: "Zara", icon: "👗" },
];

const Shop = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [activeBrand, setActiveBrand] = useState("featured");

  return (
    <MobileLayout>
      <div className="space-y-4">
        {/* Header */}
        <header className="sticky top-0 z-40 bg-background/95 backdrop-blur-sm">
          <div className="flex items-center justify-between px-4 py-3">
            <h1 className="text-xl font-bold">Shop</h1>
            <div className="flex items-center gap-2">
              <button className="p-2 rounded-full hover:bg-secondary transition-colors">
                <Bell className="h-5 w-5" />
              </button>
              <button className="p-2 rounded-full hover:bg-secondary transition-colors">
                <SlidersHorizontal className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* Search */}
          <div className="px-4 pb-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search brands, products..."
                className="w-full h-10 pl-10 pr-4 rounded-full bg-secondary border border-border text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
            </div>
          </div>
        </header>

        {/* Points Progress */}
        <div className="mx-4 p-3 bg-gradient-to-r from-primary/10 to-accent/10 rounded-xl border border-primary/20">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium">2x Points Active</span>
            </div>
            <span className="text-xs text-muted-foreground">Level 5</span>
          </div>
          <Progress value={65} className="h-1.5" />
          <p className="text-xs text-muted-foreground mt-1">On Streetwear Fridays</p>
        </div>

        {/* Brands */}
        <div className="px-4">
          <div className="flex gap-4 overflow-x-auto hide-scrollbar pb-2">
            {brands.map((brand) => (
              <button
                key={brand.id}
                onClick={() => setActiveBrand(brand.id)}
                className={`flex flex-col items-center gap-1.5 flex-shrink-0 ${
                  activeBrand === brand.id ? "opacity-100" : "opacity-60"
                }`}
              >
                <div className={`w-14 h-14 rounded-full flex items-center justify-center text-2xl ${
                  activeBrand === brand.id
                    ? "gradient-primary"
                    : "bg-secondary border border-border"
                }`}>
                  {brand.icon}
                </div>
                <span className="text-xs">{brand.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Categories */}
        <div className="px-4">
          <div className="flex gap-2 overflow-x-auto hide-scrollbar pb-2">
            {mockCategories.map((category) => (
              <CategoryPill
                key={category.id}
                name={category.name}
                icon={category.icon}
                isActive={activeCategory === category.name}
                onClick={() => setActiveCategory(category.name)}
              />
            ))}
          </div>
        </div>

        {/* Products Grid */}
        <div className="px-4">
          <div className="grid grid-cols-2 gap-3">
            {mockProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
            {mockProducts.map((product) => (
              <ProductCard key={`${product.id}-2`} product={{ ...product, id: `${product.id}-2` }} />
            ))}
          </div>
        </div>
      </div>
    </MobileLayout>
  );
};

export default Shop;

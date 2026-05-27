import { Plus } from "lucide-react";
import { StoryCircle } from "@/components/home/StoryCircle";
import { PostCard } from "@/components/community/PostCard";
import { VideoCard } from "@/components/community/VideoCard";
import { ShortCard } from "@/components/community/ShortCard";
import { ReviewCard } from "@/components/community/ReviewCard";
import { LiveCard } from "@/components/community/LiveCard";
import { OfferCard } from "@/components/community/OfferCard";
import { mockStories, mockPosts } from "@/lib/mock-data";
import { mockVideos, mockShorts, mockReviews, mockLiveSessions, mockOffers } from "@/lib/community-mock-data";
import { useInfiniteScroll } from "@/hooks/use-infinite-scroll";
import { Loader2 } from "lucide-react";
import { useMemo } from "react";

type FeedItem = {
  type: "post" | "video" | "short" | "review" | "live" | "offer";
  data: any;
  id: string;
  _loopKey?: string;
};

export function MyFeedTab() {
  const allContent = useMemo<FeedItem[]>(() => {
    const items: FeedItem[] = [];

    const maxLength = Math.max(
      mockPosts.length,
      mockVideos.length,
      mockShorts.length,
      mockReviews.length,
      mockLiveSessions.length,
      mockOffers.length,
    );

    for (let i = 0; i < maxLength; i++) {
      if (mockPosts[i]) items.push({ type: "post", data: mockPosts[i], id: `post-${mockPosts[i].id}` });
      if (mockVideos[i]) items.push({ type: "video", data: mockVideos[i], id: `video-${mockVideos[i].id}` });
      if (mockShorts[i] && i % 3 === 0) items.push({ type: "short", data: mockShorts[i], id: `short-${mockShorts[i].id}` });
      if (mockReviews[i]) items.push({ type: "review", data: mockReviews[i], id: `review-${mockReviews[i].id}` });
      if (mockLiveSessions[i] && mockLiveSessions[i].isLive) items.push({ type: "live", data: mockLiveSessions[i], id: `live-${mockLiveSessions[i].id}` });
      if (mockOffers[i]) items.push({ type: "offer", data: mockOffers[i], id: `offer-${mockOffers[i].id}` });
    }

    return items;
  }, []);

  const { displayedItems, isLoading, loaderRef } = useInfiniteScroll({
    items: allContent,
    itemsPerPage: 4,
  });

  const renderFeedItem = (item: FeedItem, index: number) => {
    const key = item._loopKey || `${item.id}-${index}`;

    switch (item.type) {
      case "post":
        return <PostCard key={key} post={item.data} />;
      case "video":
        return <div key={key} className="px-4"><VideoCard video={item.data} /></div>;
      case "short":
        return (
          <div key={key} className="py-2">
            <div className="flex items-center justify-between px-4 mb-3">
              <h3 className="font-semibold text-[14px]">Trending Shorts</h3>
              <button className="text-[11px] uppercase tracking-[0.12em] text-muted-foreground hover:text-foreground transition-colors">
                See all
              </button>
            </div>
            <div className="flex gap-3 overflow-x-auto hide-scrollbar px-4">
              {mockShorts.slice(0, 4).map((short) => (
                <div key={short.id} className="w-36 flex-shrink-0">
                  <ShortCard short={short} />
                </div>
              ))}
            </div>
          </div>
        );
      case "review":
        return <div key={key} className="px-4"><ReviewCard review={item.data} /></div>;
      case "live":
        return <div key={key} className="px-4"><LiveCard session={item.data} /></div>;
      case "offer":
        return <div key={key} className="px-4"><OfferCard offer={item.data} /></div>;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-5">
      {/* Stories */}
      <div className="px-4 pt-3">
        <div className="flex gap-3 overflow-x-auto hide-scrollbar pb-1">
          {/* Add Story */}
          <button className="flex flex-col items-center gap-1.5 flex-shrink-0">
            <div className="relative w-16 h-16 rounded-full border border-dashed border-border bg-background flex items-center justify-center">
              <Plus className="h-5 w-5 text-muted-foreground" />
            </div>
            <span className="text-[10.5px] tracking-[0.04em] text-muted-foreground truncate max-w-[64px]">Add Story</span>
          </button>
          {mockStories.slice(1).map((story, index) => (
            <StoryCircle key={story.id} story={story} isFirst={index === 0} />
          ))}
        </div>
      </div>

      {/* Mixed Feed with Infinite Scroll */}
      <div className="space-y-5">
        {displayedItems.map((item, index) => renderFeedItem(item, index))}

        {/* Loader */}
        <div ref={loaderRef} className="flex justify-center py-4">
          {isLoading && (
            <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
          )}
        </div>
      </div>
    </div>
  );
}

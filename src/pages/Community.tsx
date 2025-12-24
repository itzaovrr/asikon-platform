import { Search, Plus, Bell } from "lucide-react";
import { useState } from "react";
import { MobileLayout } from "@/components/layout/MobileLayout";
import { StoryCircle } from "@/components/home/StoryCircle";
import { PostCard } from "@/components/community/PostCard";
import { mockStories, mockPosts } from "@/lib/mock-data";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const tabs = ["For You", "Following"];

const Community = () => {
  const [activeTab, setActiveTab] = useState("For You");

  return (
    <MobileLayout>
      <div className="space-y-4">
        {/* Header */}
        <header className="sticky top-0 z-40 bg-background/95 backdrop-blur-sm border-b border-border">
          <div className="flex items-center justify-between px-4 py-3">
            <h1 className="text-xl font-bold text-gradient">FashionFeed</h1>
            <div className="flex items-center gap-2">
              <button className="p-2 rounded-full hover:bg-secondary transition-colors">
                <Search className="h-5 w-5" />
              </button>
              <button className="relative p-2 rounded-full hover:bg-secondary transition-colors">
                <Bell className="h-5 w-5" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-primary rounded-full" />
              </button>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex items-center gap-6 px-4 pb-3">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={cn(
                  "text-sm font-medium transition-colors pb-2 border-b-2",
                  activeTab === tab
                    ? "text-foreground border-primary"
                    : "text-muted-foreground border-transparent hover:text-foreground"
                )}
              >
                {tab}
              </button>
            ))}
          </div>
        </header>

        {/* Stories */}
        <div className="px-4">
          <div className="flex gap-3 overflow-x-auto hide-scrollbar pb-2">
            {/* Add Story */}
            <button className="flex flex-col items-center gap-1.5 flex-shrink-0">
              <div className="relative w-16 h-16 rounded-full bg-secondary border-2 border-dashed border-border flex items-center justify-center">
                <Plus className="h-6 w-6 text-muted-foreground" />
              </div>
              <span className="text-xs text-muted-foreground">Add Story</span>
            </button>
            {mockStories.slice(1).map((story, index) => (
              <StoryCircle key={story.id} story={story} isFirst={index === 0} />
            ))}
          </div>
        </div>

        {/* Posts */}
        <div className="space-y-0">
          {mockPosts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
          {mockPosts.map((post) => (
            <PostCard key={`${post.id}-2`} post={{ ...post, id: `${post.id}-2` }} />
          ))}
        </div>

        {/* Create Post FAB */}
        <Button
          size="lg"
          className="fixed bottom-20 right-4 w-14 h-14 rounded-full gradient-primary shadow-lg glow-primary"
        >
          <Plus className="h-6 w-6" />
        </Button>
      </div>
    </MobileLayout>
  );
};

export default Community;

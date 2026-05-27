import {
  MessageCircle,
  Share2,
  UserPlus,
  UserCheck,
  Flag,
  Ban,
  Pencil,
  MoreHorizontal,
  Loader2,
  Settings,
} from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface ProfileActionsProps {
  isFollowing?: boolean;
  isOwnProfile?: boolean;
  isFollowLoading?: boolean;
  onFollow?: () => void;
  onMessage?: () => void;
  onShare?: () => void;
  onReport?: () => void;
  onBlock?: () => void;
  onEditProfile?: () => void;
}

export function ProfileActions({
  isFollowing = false,
  isOwnProfile = false,
  isFollowLoading = false,
  onFollow,
  onMessage,
  onShare,
  onReport,
  onBlock,
  onEditProfile,
}: ProfileActionsProps) {
  if (isOwnProfile) {
    return (
      <div className="px-4 pt-3">
        <div className="flex items-center gap-2">
          <Button
            onClick={onEditProfile}
            className="flex-1 gradient-primary border-0 shadow-md tap"
            aria-label="Edit profile"
          >
            <Pencil className="h-4 w-4 mr-2" />
            Edit Profile
          </Button>
          <Button
            asChild
            variant="secondary"
            size="icon"
            aria-label="Settings"
            className="tap"
          >
            <Link to="/settings">
              <Settings className="h-4 w-4" />
            </Link>
          </Button>
          <Button
            variant="secondary"
            size="icon"
            onClick={onShare}
            aria-label="Share profile"
            className="tap"
          >
            <Share2 className="h-4 w-4" />
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="px-4 pt-3">
      <div className="flex items-center gap-2">
        <Button
          onClick={onFollow}
          disabled={isFollowLoading}
          aria-pressed={isFollowing}
          aria-label={isFollowing ? "Unfollow" : "Follow"}
          className={
            isFollowing
              ? "flex-[2] bg-secondary hover:bg-secondary/80 text-foreground tap"
              : "flex-[2] gradient-primary border-0 shadow-md tap"
          }
        >
          {isFollowLoading ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : isFollowing ? (
            <>
              <UserCheck className="h-4 w-4 mr-2" />
              Following
            </>
          ) : (
            <>
              <UserPlus className="h-4 w-4 mr-2" />
              Follow
            </>
          )}
        </Button>
        <Button
          variant="secondary"
          className="flex-1 tap"
          onClick={onMessage}
          aria-label="Send message"
        >
          <MessageCircle className="h-4 w-4 mr-2" />
          Message
        </Button>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="secondary" size="icon" aria-label="More options" className="tap">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="glass-strong">
            <DropdownMenuItem onClick={onShare}>
              <Share2 className="h-4 w-4 mr-2" />
              Share Profile
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={onReport} className="text-amber-400">
              <Flag className="h-4 w-4 mr-2" />
              Report User
            </DropdownMenuItem>
            <DropdownMenuItem onClick={onBlock} className="text-destructive">
              <Ban className="h-4 w-4 mr-2" />
              Block User
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}

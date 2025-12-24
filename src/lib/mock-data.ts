import { Product, User, Post, Story, Challenge, Category } from "@/types";
import productBag from "@/assets/product-bag.jpg";
import productSneakers from "@/assets/product-sneakers.jpg";
import productJacket from "@/assets/product-jacket.jpg";
import productHoodie from "@/assets/product-hoodie.jpg";
import heroFashion from "@/assets/hero-fashion-1.jpg";

export const mockProducts: Product[] = [
  {
    id: "1",
    name: "Premium Leather Crossbody",
    price: 120,
    originalPrice: 160,
    image: productBag,
    brand: "LUXE",
    rating: 4.8,
    reviews: 342,
    isAuthentic: true,
    isTrending: true,
  },
  {
    id: "2",
    name: "Classic White Sneakers",
    price: 185,
    image: productSneakers,
    brand: "MINIMAL",
    rating: 4.9,
    reviews: 512,
    isAuthentic: true,
  },
  {
    id: "3",
    name: "Vintage Denim Jacket",
    price: 89,
    originalPrice: 120,
    image: productJacket,
    brand: "HERITAGE",
    rating: 4.7,
    reviews: 189,
    isAuthentic: true,
  },
  {
    id: "4",
    name: "Oversized Streetwear Hoodie",
    price: 65,
    image: productHoodie,
    brand: "URBAN",
    rating: 4.6,
    reviews: 267,
    isTrending: true,
  },
];

export const mockUser: User = {
  id: "1",
  name: "Sophia Vance",
  username: "sophia_v",
  avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop",
  isVerified: true,
  followers: 12500,
  following: 210,
  sales: 156,
  trustScore: 98,
  coins: 2450,
  level: "Gold",
  bio: "Vintage curator & streetwear enthusiast 🔥 Fashion is art",
};

export const mockStories: Story[] = [
  {
    id: "1",
    user: { ...mockUser, name: "Your Story" },
    thumbnail: mockUser.avatar,
    type: "image",
  },
  {
    id: "2",
    user: { ...mockUser, id: "2", name: "Zara Official", username: "zara" },
    thumbnail: "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=150&h=150&fit=crop",
    type: "image",
  },
  {
    id: "3",
    user: { ...mockUser, id: "3", name: "Street Daily", username: "streetdaily" },
    thumbnail: "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=150&h=150&fit=crop",
    type: "video",
  },
  {
    id: "4",
    user: { ...mockUser, id: "4", name: "LuxeFinds", username: "luxefinds" },
    thumbnail: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=150&h=150&fit=crop",
    type: "image",
  },
  {
    id: "5",
    user: { ...mockUser, id: "5", name: "OOTD", username: "ootd" },
    thumbnail: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=150&h=150&fit=crop",
    type: "video",
  },
];

export const mockPosts: Post[] = [
  {
    id: "1",
    user: {
      ...mockUser,
      name: "Sarah Styles",
      username: "sarah_styles",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop",
    },
    content: "Exploring the streets of Tokyo in my favorite trench coat for the fall season! 🍂 #autumnvibes #ootd",
    image: heroFashion,
    likes: 2400,
    comments: 45,
    shares: 12,
    timestamp: "2 hours ago",
    product: mockProducts[0],
  },
  {
    id: "2",
    user: mockUser,
    content: "Just dropped my vintage collection! Limited pieces only. DM for details 💫",
    image: productJacket,
    likes: 1850,
    comments: 89,
    shares: 34,
    timestamp: "5 hours ago",
    product: mockProducts[2],
  },
];

export const mockCategories: Category[] = [
  { id: "1", name: "All", icon: "✨" },
  { id: "2", name: "Sneakers", icon: "👟" },
  { id: "3", name: "Hoodies", icon: "🧥" },
  { id: "4", name: "Bags", icon: "👜" },
  { id: "5", name: "Jackets", icon: "🧥" },
  { id: "6", name: "Accessories", icon: "💎" },
];

export const mockChallenges: Challenge[] = [
  {
    id: "1",
    title: "Upload your first OOTD",
    description: "Share your outfit of the day",
    progress: 0,
    total: 1,
    reward: 50,
    icon: "📸",
  },
  {
    id: "2",
    title: "Like 5 Items",
    description: "Discover and like 5 products",
    progress: 3,
    total: 5,
    reward: 10,
    icon: "❤️",
  },
  {
    id: "3",
    title: "First Purchase",
    description: "Complete your first order",
    progress: 0,
    total: 1,
    reward: 100,
    icon: "🛍️",
  },
];

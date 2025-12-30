import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export interface PodDesign {
  id: string;
  user_id: string;
  title: string;
  description: string | null;
  image_url: string;
  thumbnail_url: string | null;
  status: 'pending' | 'approved' | 'rejected';
  is_public: boolean;
  sales_count: number;
  category: string;
  tags: string[];
  price_modifier: number;
  rejection_reason: string | null;
  approved_at: string | null;
  created_at: string;
  updated_at: string;
  profiles?: {
    username: string | null;
    avatar_url: string | null;
    is_verified: boolean | null;
  };
}

// Helper function to generate signed URL for a design
async function getSignedImageUrl(imagePath: string): Promise<string> {
  // If it's already a full URL with signature, return as-is
  if (imagePath.includes('token=')) {
    return imagePath;
  }
  
  // If it's a full public URL, extract the path
  let path = imagePath;
  if (imagePath.includes('/storage/v1/object/')) {
    const match = imagePath.match(/pod-designs\/(.+)$/);
    if (match) {
      path = match[1];
    }
  }
  
  // Generate signed URL (1 hour expiry for viewing)
  const { data } = await supabase.storage
    .from("pod-designs")
    .createSignedUrl(path, 3600);
  
  return data?.signedUrl || imagePath;
}

export function usePublicDesigns(category?: string) {
  return useQuery({
    queryKey: ["pod-designs", "public", category],
    queryFn: async () => {
      let query = supabase
        .from("pod_designs")
        .select(`
          *,
          profiles:user_id (
            username,
            avatar_url,
            is_verified
          )
        `)
        .eq("is_public", true)
        .order("sales_count", { ascending: false });
      
      if (category && category !== "all") {
        query = query.eq("category", category);
      }
      
      const { data, error } = await query;
      if (error) throw error;
      
      // Generate signed URLs for all images
      const designsWithSignedUrls = await Promise.all(
        (data || []).map(async (design) => ({
          ...design,
          image_url: await getSignedImageUrl(design.image_url),
          thumbnail_url: design.thumbnail_url ? await getSignedImageUrl(design.thumbnail_url) : null,
        }))
      );
      
      return designsWithSignedUrls as unknown as PodDesign[];
    },
  });
}

export function useMyDesigns() {
  return useQuery({
    queryKey: ["pod-designs", "my"],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Not authenticated");
      
      const { data, error } = await supabase
        .from("pod_designs")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });
      
      if (error) throw error;
      
      // Generate signed URLs for all images
      const designsWithSignedUrls = await Promise.all(
        (data || []).map(async (design) => ({
          ...design,
          image_url: await getSignedImageUrl(design.image_url),
          thumbnail_url: design.thumbnail_url ? await getSignedImageUrl(design.thumbnail_url) : null,
        }))
      );
      
      return designsWithSignedUrls as PodDesign[];
    },
  });
}

export function useFeaturedDesigns(limit = 6) {
  return useQuery({
    queryKey: ["pod-designs", "featured", limit],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("pod_designs")
        .select("*")
        .eq("status", "approved")
        .eq("is_public", true)
        .order("sales_count", { ascending: false })
        .limit(limit);
      
      if (error) throw error;
      
      // Generate signed URLs for all images
      const designsWithSignedUrls = await Promise.all(
        (data || []).map(async (design) => ({
          ...design,
          image_url: await getSignedImageUrl(design.image_url),
          thumbnail_url: design.thumbnail_url ? await getSignedImageUrl(design.thumbnail_url) : null,
        }))
      );
      
      return designsWithSignedUrls as unknown as PodDesign[];
    },
  });
}

export function useUploadDesign() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({
      file,
      title,
      description,
      category,
      tags,
      isPublic,
    }: {
      file: File;
      title: string;
      description?: string;
      category: string;
      tags: string[];
      isPublic: boolean;
    }) => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Not authenticated");
      
      // Upload file to storage with random UUID instead of timestamp for security
      const fileExt = file.name.split('.').pop();
      const fileName = `${user.id}/${crypto.randomUUID()}.${fileExt}`;
      
      const { error: uploadError } = await supabase.storage
        .from("pod-designs")
        .upload(fileName, file);
      
      if (uploadError) throw uploadError;
      
      // Store the file path (not URL) - signed URLs will be generated on fetch
      // This prevents predictable URL patterns and enables proper access control
      const { data, error } = await supabase
        .from("pod_designs")
        .insert({
          user_id: user.id,
          title,
          description,
          image_url: fileName, // Store path, not URL
          category,
          tags,
          is_public: isPublic,
        })
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["pod-designs"] });
      toast.success("Design uploaded successfully!");
    },
    onError: (error) => {
      toast.error("Failed to upload design: " + error.message);
    },
  });
}

export function useDesignFavorites() {
  const queryClient = useQueryClient();
  
  const toggleFavorite = useMutation({
    mutationFn: async (designId: string) => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Not authenticated");
      
      // Check if already favorited
      const { data: existing } = await supabase
        .from("pod_design_favorites")
        .select("id")
        .eq("user_id", user.id)
        .eq("design_id", designId)
        .single();
      
      if (existing) {
        // Remove favorite
        const { error } = await supabase
          .from("pod_design_favorites")
          .delete()
          .eq("id", existing.id);
        if (error) throw error;
        return { action: "removed" };
      } else {
        // Add favorite
        const { error } = await supabase
          .from("pod_design_favorites")
          .insert({ user_id: user.id, design_id: designId });
        if (error) throw error;
        return { action: "added" };
      }
    },
    onSuccess: (result) => {
      queryClient.invalidateQueries({ queryKey: ["pod-design-favorites"] });
      toast.success(result.action === "added" ? "Added to favorites!" : "Removed from favorites");
    },
  });
  
  return { toggleFavorite };
}

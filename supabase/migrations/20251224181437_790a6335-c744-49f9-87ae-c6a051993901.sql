-- Fix 1: Make pod-designs bucket private
UPDATE storage.buckets 
SET public = false 
WHERE id = 'pod-designs';

-- Fix 2: Drop the overly permissive SELECT policy and replace with proper access control
DROP POLICY IF EXISTS "Anyone can view POD designs" ON storage.objects;

CREATE POLICY "Users can view approved public designs or own designs" 
ON storage.objects FOR SELECT 
USING (
  bucket_id = 'pod-designs' AND (
    -- User is the owner (file path starts with their user_id)
    auth.uid()::text = (storage.foldername(name))[1]
    -- Or user is admin
    OR has_role(auth.uid(), 'admin')
    -- Or design is approved and public (check via file name pattern matching design id)
    OR EXISTS (
      SELECT 1 FROM pod_designs
      WHERE pod_designs.status = 'approved'
      AND pod_designs.is_public = true
      AND (pod_designs.image_url LIKE '%' || storage.objects.name || '%' OR pod_designs.thumbnail_url LIKE '%' || storage.objects.name || '%')
    )
  )
);

-- Fix 3: Drop conflicting ALL policy on coins table
DROP POLICY IF EXISTS "System can manage coins" ON public.coins;
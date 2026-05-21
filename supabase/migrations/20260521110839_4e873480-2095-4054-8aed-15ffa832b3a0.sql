-- Migration 1 — Extend profiles table
ALTER TABLE public.profiles
  ADD COLUMN IF NOT EXISTS website TEXT
    CHECK (website IS NULL OR website ~ '^https?://'),
  ADD COLUMN IF NOT EXISTS location TEXT,
  ADD COLUMN IF NOT EXISTS cover_gradient TEXT DEFAULT 'gradient-1',
  ADD COLUMN IF NOT EXISTS last_seen_at TIMESTAMPTZ DEFAULT now(),
  ADD COLUMN IF NOT EXISTS joined_at TIMESTAMPTZ DEFAULT now();

-- Migration 2 — rating column on posts (no-op if already there from prior migration)
ALTER TABLE public.posts
  ADD COLUMN IF NOT EXISTS rating SMALLINT
    CHECK (rating IS NULL OR (rating >= 1 AND rating <= 5));

COMMENT ON COLUMN public.posts.rating IS
  'Star rating 1-5. Only set when type = review';

-- Migration 3 — user_activity_log table
CREATE TABLE IF NOT EXISTS public.user_activity_log (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  event_type TEXT NOT NULL,
  meta JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.user_activity_log ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users view own activity" ON public.user_activity_log;
CREATE POLICY "Users view own activity"
  ON public.user_activity_log FOR SELECT
  USING (auth.uid() = user_id);

CREATE INDEX IF NOT EXISTS idx_activity_log_user
  ON public.user_activity_log(user_id, created_at DESC);

-- Migration 4 — touch_last_seen helper
CREATE OR REPLACE FUNCTION public.touch_last_seen()
RETURNS TRIGGER LANGUAGE plpgsql
SECURITY DEFINER SET search_path = public AS $$
BEGIN
  UPDATE public.profiles
    SET last_seen_at = now()
    WHERE id = auth.uid();
  RETURN NEW;
END;
$$;
REVOKE EXECUTE ON FUNCTION public.touch_last_seen() FROM PUBLIC, anon;

-- Migration 5 — log lesson completion
CREATE OR REPLACE FUNCTION public.log_lesson_completion()
RETURNS TRIGGER LANGUAGE plpgsql
SECURITY DEFINER SET search_path = public AS $$
BEGIN
  INSERT INTO public.user_activity_log(user_id, event_type, meta)
  VALUES (NEW.user_id, 'lesson_completed',
          jsonb_build_object('lesson_id', NEW.lesson_id));
  RETURN NEW;
END;
$$;
REVOKE EXECUTE ON FUNCTION public.log_lesson_completion() FROM PUBLIC, anon;

DROP TRIGGER IF EXISTS trg_log_lesson ON public.lesson_completions;
CREATE TRIGGER trg_log_lesson
  AFTER INSERT ON public.lesson_completions
  FOR EACH ROW EXECUTE FUNCTION public.log_lesson_completion();

-- Migration 6 — log order placed
CREATE OR REPLACE FUNCTION public.log_order_placed()
RETURNS TRIGGER LANGUAGE plpgsql
SECURITY DEFINER SET search_path = public AS $$
BEGIN
  INSERT INTO public.user_activity_log(user_id, event_type, meta)
  VALUES (NEW.user_id, 'order_placed',
          jsonb_build_object('order_id', NEW.id));
  RETURN NEW;
END;
$$;
REVOKE EXECUTE ON FUNCTION public.log_order_placed() FROM PUBLIC, anon;

DROP TRIGGER IF EXISTS trg_log_order ON public.orders;
CREATE TRIGGER trg_log_order
  AFTER INSERT ON public.orders
  FOR EACH ROW EXECUTE FUNCTION public.log_order_placed();

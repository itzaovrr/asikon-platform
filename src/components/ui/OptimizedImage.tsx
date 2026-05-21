import { useState } from "react";
import { cn } from "@/lib/utils";

interface OptimizedImageProps
  extends Omit<React.ImgHTMLAttributes<HTMLImageElement>, "loading"> {
  src: string;
  alt: string;
  width?: number | string;
  height?: number | string;
  /** Eager-load and high-fetchpriority for above-the-fold imagery. */
  priority?: boolean;
  /** Optional wrapper className — controls aspect ratio / rounded corners. */
  wrapperClassName?: string;
  /** Skip the skeleton shimmer (e.g. for tiny icons). */
  noSkeleton?: boolean;
}

/**
 * Drop-in <img> replacement with:
 *  - lazy/eager loading based on `priority`
 *  - decoding="async"
 *  - fetchpriority hint
 *  - skeleton shimmer placeholder that fades when the image loads
 *
 * Works with absolute URLs, asset imports, and Supabase Storage paths.
 */
export function OptimizedImage({
  src,
  alt,
  width,
  height,
  priority = false,
  className,
  wrapperClassName,
  noSkeleton = false,
  onLoad,
  ...rest
}: OptimizedImageProps) {
  const [loaded, setLoaded] = useState(false);

  return (
    <div
      className={cn(
        "relative overflow-hidden",
        !noSkeleton && !loaded && "bg-muted animate-pulse",
        wrapperClassName,
      )}
      style={width || height ? { width, height } : undefined}
    >
      <img
        src={src}
        alt={alt}
        width={width}
        height={height}
        loading={priority ? "eager" : "lazy"}
        decoding="async"
        // @ts-expect-error fetchpriority is a valid HTML attribute
        fetchpriority={priority ? "high" : "auto"}
        onLoad={(e) => {
          setLoaded(true);
          onLoad?.(e);
        }}
        className={cn(
          "transition-opacity duration-300",
          loaded ? "opacity-100" : "opacity-0",
          className,
        )}
        {...rest}
      />
    </div>
  );
}

export default OptimizedImage;

import { cn } from "@/lib/utils";
import { forwardRef, HTMLAttributes } from "react";

/** Liquid-glass panel matching the user app surfaces used across Home / Shop. */
export const GlassPanel = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, ...rest }, ref) => (
    <div
      ref={ref}
      className={cn("glass rounded-2xl overflow-hidden", className)}
      {...rest}
    />
  ),
);
GlassPanel.displayName = "GlassPanel";

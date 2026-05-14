import { memo } from "react";

interface SparklineProps {
  data: number[];
  width?: number;
  height?: number;
  className?: string;
  stroke?: string;
}

/** Tiny dependency-free SVG sparkline (~1 KB). Used in admin KPI cards. */
function SparklineImpl({ data, width = 80, height = 28, className, stroke = "currentColor" }: SparklineProps) {
  if (!data?.length) return <svg width={width} height={height} className={className} />;
  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;
  const step = data.length > 1 ? width / (data.length - 1) : 0;
  const points = data
    .map((v, i) => `${(i * step).toFixed(1)},${(height - ((v - min) / range) * height).toFixed(1)}`)
    .join(" ");
  const last = data[data.length - 1];
  const lastY = height - ((last - min) / range) * height;
  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} className={className} aria-hidden>
      <polyline
        fill="none"
        stroke={stroke}
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
        points={points}
        opacity={0.85}
      />
      <circle cx={(data.length - 1) * step} cy={lastY} r={2} fill={stroke} />
    </svg>
  );
}

export const Sparkline = memo(SparklineImpl);

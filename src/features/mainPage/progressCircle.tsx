// components/ProgressCircle.tsx
import React from "react";

interface ProgressCircleProps {
  progress: number;
  className?: string;
}

export function ProgressCircle({ progress, className }: ProgressCircleProps) {
  const dashOffset = 100 - progress;
  return (
    <svg
      className={className}
      width="50"
      height="50"
      viewBox="0 0 36 36"
      fill="none"
    >
      <circle
        className="stroke-[var(--accent-dark)]"
        strokeWidth="2"
        fill="none"
        r="16"
        cx="18"
        cy="18"
        opacity="0.3"
      />
      <circle
        className="stroke-white transition-all duration-100"
        strokeWidth="2"
        fill="none"
        r="16"
        cx="18"
        cy="18"
        strokeDasharray="100"
        strokeDashoffset={dashOffset}
        transform="rotate(-90 18 18)"
      />
    </svg>
  );
}

"use client";
import React from "react";

interface ProgressCircleProps {
  progress: number;
  className?: string;
}

export function ProgressCircle({ progress, className }: ProgressCircleProps) {
  const R = 16;
  const C = 2 * Math.PI * R;
  const pct = Math.max(0, Math.min(progress, 100));
  const dashOffset = C - (C * pct) / 100;

  return (
    <svg
      className={className}
      width="50"
      height="50"
      viewBox="0 0 36 36"
      fill="none"
    >
      <circle
        stroke="var(--accent-dark)"
        strokeWidth="2"
        fill="none"
        r={R}
        cx="18"
        cy="18"
        opacity="0.3"
      />
      <circle
        stroke="white"
        strokeWidth="2"
        fill="none"
        r={R}
        cx="18"
        cy="18"
        strokeDasharray={C}
        strokeDashoffset={dashOffset}
        transform="rotate(-90 18 18)"
        style={{ willChange: "stroke-dashoffset" }}
      />
    </svg>
  );
}

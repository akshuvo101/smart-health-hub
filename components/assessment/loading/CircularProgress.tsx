"use client";

interface CircularProgressProps {
  progress: number;
}

export default function CircularProgress({
  progress,
}: CircularProgressProps) {
  const radius = 145;
  const stroke = 8;

  const normalizedRadius = radius - stroke / 2;

  const circumference =
    normalizedRadius * 2 * Math.PI;

  const offset =
    circumference -
    (progress / 100) * circumference;

  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
      <svg
        className="h-full w-full -rotate-90"
        viewBox={`0 0 ${radius * 2} ${radius * 2}`}
      >
        {/* Background */}

        <circle
          stroke="rgba(255,255,255,.08)"
          fill="transparent"
          strokeWidth={stroke}
          r={normalizedRadius}
          cx={radius}
          cy={radius}
        />

        {/* Progress */}

        <circle
          stroke="#00E5FF"
          fill="transparent"
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          r={normalizedRadius}
          cx={radius}
          cy={radius}
          style={{
            transition:
              "stroke-dashoffset .25s ease",
            filter:
              "drop-shadow(0 0 10px #00E5FF)",
          }}
        />
      </svg>
    </div>
  );
}
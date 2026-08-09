"use client";

import {
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  Radar,
} from "recharts";

const data = [
  {
    subject: "Sleep",
    score: 85,
  },
  {
    subject: "Mood",
    score: 90,
  },
  {
    subject: "Stress",
    score: 70,
  },
  {
    subject: "Habits",
    score: 88,
  },
  {
    subject: "Fitness",
    score: 80,
  },
];

export default function WellnessChart() {
  return (
    <div className="h-80 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart data={data}>
          <PolarGrid />

          <PolarAngleAxis dataKey="subject" />

          <Radar
            dataKey="score"
            fill="#10b981"
            fillOpacity={0.5}
          />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
}
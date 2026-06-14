"use client";

import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  Tooltip,
} from "recharts";

const data = [
  { day: "Mon", mood: 60 },
  { day: "Tue", mood: 75 },
  { day: "Wed", mood: 68 },
  { day: "Thu", mood: 82 },
  { day: "Fri", mood: 90 },
  { day: "Sat", mood: 84 },
  { day: "Sun", mood: 88 },
];

export default function MoodChart() {
  return (
    <div className="h-72 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <XAxis dataKey="day" />

          <Tooltip />

          <Line
            type="monotone"
            dataKey="mood"
            stroke="#10b981"
            strokeWidth={3}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
"use client";

import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  Tooltip,
} from "recharts";

const data = [
  { day: "Mon", sleep: 6.5 },
  { day: "Tue", sleep: 7.2 },
  { day: "Wed", sleep: 8.1 },
  { day: "Thu", sleep: 7.4 },
  { day: "Fri", sleep: 7.8 },
  { day: "Sat", sleep: 8.5 },
  { day: "Sun", sleep: 7.9 },
];

export default function SleepChart() {
  return (
    <div className="h-72 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data}>
          <XAxis dataKey="day" />

          <Tooltip />

          <Area
            type="monotone"
            dataKey="sleep"
            stroke="#06b6d4"
            fill="#06b6d4"
            fillOpacity={0.2}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
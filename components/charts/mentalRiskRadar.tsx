"use client";

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  Tooltip,
} from "recharts";

const data = [
  { day: "Mon", stress: 70 },
  { day: "Tue", stress: 60 },
  { day: "Wed", stress: 75 },
  { day: "Thu", stress: 50 },
  { day: "Fri", stress: 45 },
  { day: "Sat", stress: 40 },
  { day: "Sun", stress: 35 },
];

export default function StressChart() {
  return (
    <div className="h-72 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <XAxis dataKey="day" />

          <Tooltip />

          <Bar
            dataKey="stress"
            radius={[8, 8, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}